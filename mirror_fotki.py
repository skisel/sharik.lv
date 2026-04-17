#!/usr/bin/env python3
import argparse
import html
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import deque
from pathlib import Path


USER_AGENT = "Mozilla/5.0 (compatible; fotki-mirror/1.0)"
PHOTO_RE = re.compile(
    r'<a[^>]+href="(?P<href>https://fotki\.lv/[^"]+/photo-\d+/)"[^>]*>'
    r'<img[^>]+src="(?P<src>https://pic\.fotki\.lv/[^"]+_%23_2_%23_[^"]+)"',
    re.IGNORECASE,
)
FOLDER_RE = re.compile(
    r'<a href="(?P<href>https://fotki\.lv/[^"]+/\d+/)"[^>]*style=" text-decoration: none;">\s*'
    r'<div[^>]*>(?P<name>.*?)</div>\s*</a>',
    re.IGNORECASE | re.DOTALL,
)
PAGE_RE = re.compile(r'href="(?P<href>https://fotki\.lv/[^"]+/\d+/page-\d+/)"', re.IGNORECASE)
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
USER_RE = re.compile(r"https://fotki\.lv/[^/]+/(?P<user>[^/]+)/(?P<album>\d+)/")


def fetch(url: str, attempts: int = 4) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                charset = response.headers.get_content_charset() or "utf-8"
                return response.read().decode(charset, errors="replace")
        except urllib.error.URLError:
            if attempt == attempts:
                raise
            time.sleep(1.5 * attempt)
    raise RuntimeError(f"unreachable: {url}")


def download(url: str, target: Path, attempts: int = 4) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    target.parent.mkdir(parents=True, exist_ok=True)
    tmp = target.with_suffix(target.suffix + ".part")
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(req, timeout=60) as response, tmp.open("wb") as out:
                while True:
                    chunk = response.read(1024 * 128)
                    if not chunk:
                        break
                    out.write(chunk)
            tmp.replace(target)
            return
        except Exception:
            if tmp.exists():
                tmp.unlink()
            if attempt == attempts:
                raise
            time.sleep(2 * attempt)


def strip_tags(value: str) -> str:
    no_wbr = re.sub(r"</?wbr\s*/?>", "", value, flags=re.IGNORECASE)
    no_tags = re.sub(r"<[^>]+>", "", no_wbr)
    unescaped = html.unescape(no_tags)
    return " ".join(unescaped.replace("\xad", "").split()).strip()


def safe_name(value: str) -> str:
    cleaned = strip_tags(value)
    cleaned = re.sub(r'[<>:"/\\|?*]', "_", cleaned)
    cleaned = cleaned.rstrip(". ")
    return cleaned or "untitled"


def album_root_name(page_html: str, url: str) -> str:
    title_match = TITLE_RE.search(page_html)
    title = strip_tags(title_match.group(1)) if title_match else ""
    parts = [part.strip() for part in title.split("/") if part.strip()]
    match = USER_RE.match(url)
    user = match.group("user") if match else "unknown-user"
    album = match.group("album") if match else "unknown-album"
    label = parts[-2] if len(parts) >= 2 else f"{user}-{album}"
    return safe_name(f"{album} - {label}")


def normalize_album_url(url: str) -> str:
    return re.sub(r"/page-\d+/?$", "/", url)


def page_urls(html_text: str, base_album_url: str) -> list[str]:
    urls = {base_album_url}
    for match in PAGE_RE.finditer(html_text):
        urls.add(match.group("href"))
    return sorted(urls, key=lambda value: (0 if value == base_album_url else int(re.search(r"page-(\d+)", value).group(1))))


def photo_candidates(src: str) -> list[str]:
    candidates = [src.replace("_%23_2_%23_", "_%23_3_%23_")]
    if candidates[0] != src:
        candidates.append(src)
    return candidates


def filename_from_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    name = Path(urllib.parse.unquote(parsed.path)).name
    return safe_name(name)


def collect_album(base_album_url: str) -> tuple[list[dict], list[dict], str]:
    first_html = fetch(base_album_url)
    root_name = album_root_name(first_html, base_album_url)
    folders: dict[str, dict] = {}
    photos: dict[str, dict] = {}
    for page_url in page_urls(first_html, base_album_url):
        page_html = first_html if page_url == base_album_url else fetch(page_url)
        for match in FOLDER_RE.finditer(page_html):
            href = normalize_album_url(match.group("href"))
            folders[href] = {"url": href, "name": safe_name(match.group("name"))}
        for match in PHOTO_RE.finditer(page_html):
            href = match.group("href")
            src = match.group("src")
            candidates = photo_candidates(src)
            photos[href] = {
                "page_url": href,
                "filename": filename_from_url(candidates[0]),
                "candidates": candidates,
            }
    return sorted(folders.values(), key=lambda item: item["name"].lower()), sorted(photos.values(), key=lambda item: item["filename"].lower()), root_name


def mirror(root_url: str, dest_root: Path, list_only: bool = False) -> tuple[int, int]:
    visited: set[str] = set()
    downloaded = 0
    skipped = 0
    queue = deque([(normalize_album_url(root_url), None)])
    root_dir_name = None

    while queue:
        album_url, parent_dir = queue.popleft()
        if album_url in visited:
            continue
        visited.add(album_url)

        folders, photos, inferred_root_name = collect_album(album_url)
        current_dir = dest_root / (root_dir_name or inferred_root_name) if parent_dir is None else parent_dir
        if root_dir_name is None:
            root_dir_name = inferred_root_name
            current_dir = dest_root / root_dir_name
        print(f"[album] {album_url} -> {current_dir}")
        if not list_only:
            current_dir.mkdir(parents=True, exist_ok=True)

        for photo in photos:
            target = current_dir / photo["filename"]
            if list_only:
                print(f"[photo] {target}")
                continue
            if target.exists() and target.stat().st_size > 0:
                skipped += 1
                continue
            last_error = None
            for candidate in photo["candidates"]:
                try:
                    download(candidate, target)
                    downloaded += 1
                    print(f"[photo] {target}")
                    last_error = None
                    break
                except Exception as exc:
                    last_error = exc
            if last_error is not None:
                raise last_error

        for folder in folders:
            queue.append((folder["url"], current_dir / folder["name"]))

    return downloaded, skipped


def main() -> int:
    parser = argparse.ArgumentParser(description="Mirror a public fotki.lv album tree.")
    parser.add_argument("url", help="Album URL, for example https://fotki.lv/ru/Jura_kisel/738000/")
    parser.add_argument(
        "--output",
        default="downloads",
        help="Destination root directory. Default: ./downloads",
    )
    parser.add_argument(
        "--list-only",
        action="store_true",
        help="Only print the discovered structure and files without downloading.",
    )
    args = parser.parse_args()

    out_dir = Path(args.output).resolve()
    try:
        downloaded, skipped = mirror(args.url, out_dir, list_only=args.list_only)
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    print(f"completed: downloaded={downloaded} skipped={skipped} root={out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
