#!/usr/bin/env python3
import json
import re
import shutil
import unicodedata
from pathlib import Path


ROOT = Path("downloads/738000 - Jura_kisel-738000")
OUT = Path("gallery-data.js")
ASSET_ROOT = Path("gallery-assets")


LABELS = {
    "Главный архив": {"lv": "Galvenā galerija", "ru": "Главный архив"},
    "Запуск шаров и фотосессии": {"lv": "Balonu palaišana un fotosesijas", "ru": "Запуск шаров и фотосессии"},
    "Украшение свадебных помещений": {"lv": "Kāzu telpu dekori", "ru": "Украшение свадебных помещений"},
    "Фигуры - композиции": {"lv": "Figūras un kompozīcijas", "ru": "Фигуры - композиции"},
    "Шар-сюрприз (взрыв)": {"lv": "Pārsteiguma baloni", "ru": "Шар-сюрприз (взрыв)"},
    "Шарики-идеи интернета": {"lv": "Ideju galerija", "ru": "Шарики-идеи интернета"},
    "Животные": {"lv": "Dzīvnieki", "ru": "Животные"},
    "Разное": {"lv": "Dažādas idejas", "ru": "Разное"},
    "Техника": {"lv": "Tehnika", "ru": "Техника"},
    "Украшение свадеб - идеи инт": {"lv": "Kāzu idejas", "ru": "Украшение свадеб - идеи инт"},
    "Цветы": {"lv": "Ziedi", "ru": "Цветы"},
    "Человечки": {"lv": "Tēli", "ru": "Человечки"},
    "Арки": {"lv": "Arkas", "ru": "Арки"},
    "Декор": {"lv": "Dekors", "ru": "Декор"},
    "Жених и невеста": {"lv": "Līgavainis un līgava", "ru": "Жених и невеста"},
    "Лебеди": {"lv": "Gulbji", "ru": "Лебеди"},
    "Общие идеи": {"lv": "Kopējās idejas", "ru": "Общие идеи"},
    "Сердца": {"lv": "Sirdis", "ru": "Сердца"},
    "Украшение улицы": {"lv": "Āra dekors", "ru": "Украшение улицы"},
    "Цепочки на потолок": {"lv": "Griestu virtenes", "ru": "Цепочки на потолок"},
    "Шар-сюрприз": {"lv": "Pārsteiguma balons", "ru": "Шар-сюрприз"},
    "украшение машин": {"lv": "Auto dekori", "ru": "украшение машин"},
}


GROUPS = {
    "launches": {
        "title": {"lv": "Palaišanas un fotosesijas", "ru": "Запуски и фотосессии"},
        "blurb": {
            "lv": "Gaisīgas kompozīcijas atklāšanām, svētkiem un fotografēšanai.",
            "ru": "Воздушные композиции для запусков, открытий, праздников и фотосъёмок.",
        },
    },
    "weddings": {
        "title": {"lv": "Kāzas", "ru": "Свадьбы"},
        "blurb": {
            "lv": "Eleganti balonu dekori ceremonijām, svinību telpām un ieejām.",
            "ru": "Элегантное оформление шарами для церемоний, залов и входных зон.",
        },
    },
    "figures": {
        "title": {"lv": "Figūras un tēli", "ru": "Фигуры и персонажи"},
        "blurb": {
            "lv": "Dzīvnieki, ziedi, tēli un tematiskas balonu kompozīcijas.",
            "ru": "Животные, цветы, персонажи и тематические композиции из шаров.",
        },
    },
    "surprises": {
        "title": {"lv": "Pārsteiguma baloni", "ru": "Шары-сюрпризы"},
        "blurb": {
            "lv": "Lieli pārsteiguma baloni atklāšanām, ballītēm un īpašiem brīžiem.",
            "ru": "Большие шары-сюрпризы для вечеринок, открытий и особых моментов.",
        },
    },
    "ideas": {
        "title": {"lv": "Ideju galerija", "ru": "Галерея идей"},
        "blurb": {
            "lv": "Albumi ar dažādiem stiliem, formām un noformējuma virzieniem.",
            "ru": "Альбомы с идеями, стилями, формами и направлениями оформления.",
        },
    },
}


BUSINESS = {
    "name": {"lv": "Jurijs Kisels", "ru": "Юрий Кисель"},
    "brand": {"lv": "Balonu dekori", "ru": "Оформление шарами"},
    "phoneDisplay": "+371 29536652",
    "phoneLink": "tel:+37129536652",
    "intro": {
        "lv": "Balonu dekori kāzām, jubilejām, bērnu svētkiem, atklāšanām, fotosesijām un tematiskām instalācijām.",
        "ru": "Оформление шарами для свадеб, юбилеев, детских праздников, открытий, фотосессий и тематических инсталляций.",
    },
    "metaDescription": {
        "lv": "Balonu dekori kāzām, svētkiem, fotosesijām un tematiskiem pasākumiem no Jurija Kiseļa.",
        "ru": "Оформление шарами для свадеб, праздников, фотосессий и тематических мероприятий от Юрия Киселя.",
    },
}


def label(part: str, lang: str) -> str:
    return LABELS.get(part, {}).get(lang, part)


def localize_path(parts: tuple[str, ...], lang: str) -> str:
    return " / ".join(label(part, lang) for part in parts)


def classify(parts: tuple[str, ...]) -> str:
    joined = " / ".join(parts)
    if "Запуск шаров" in joined:
        return "launches"
    if "Шар-сюрприз" in joined:
        return "surprises"
    if "свад" in joined.lower():
        return "weddings"
    if any(token in joined for token in ("Фигуры", "Животные", "Цветы", "Человечки", "Техника")):
        return "figures"
    return "ideas"


def slugify(parts: tuple[str, ...]) -> str:
    tokens = []
    for part in parts:
        localized = label(part, "lv").lower()
        normalized = unicodedata.normalize("NFKD", localized)
        ascii_only = normalized.encode("ascii", "ignore").decode("ascii")
        cleaned = re.sub(r"[^a-z0-9]+", "-", ascii_only).strip("-")
        tokens.append(cleaned or "album")
    return "-".join(tokens)


def is_valid_image(path: Path) -> bool:
    if path.stat().st_size <= 64:
        header = path.read_bytes()[:10]
        if header.startswith(b"GIF89a") or header.startswith(b"GIF87a"):
            return False
    return True


def build_album(album: Path) -> dict:
    rel = album.relative_to(ROOT)
    parts = rel.parts or ("Главный архив",)
    raw_images = [path for path in sorted(album.glob("*.jpg")) if is_valid_image(path)]
    album_slug = slugify(parts)
    images = []
    if raw_images:
        target_dir = ASSET_ROOT / album_slug
        target_dir.mkdir(parents=True, exist_ok=True)
        for index, source_path in enumerate(raw_images, start=1):
            target_path = target_dir / f"{index:03d}.jpg"
            shutil.copy2(source_path, target_path)
            images.append(target_path.as_posix())
    group = classify(parts)
    return {
        "id": album_slug,
        "title": {"lv": label(parts[-1], "lv"), "ru": label(parts[-1], "ru")},
        "nativeTitle": parts[-1],
        "pathLabel": {
            "lv": localize_path(parts, "lv"),
            "ru": localize_path(parts, "ru"),
        },
        "group": group,
        "imageCount": len(images),
        "cover": images[0] if images else None,
        "images": images,
    }


def main() -> None:
    if ASSET_ROOT.exists():
        shutil.rmtree(ASSET_ROOT)
    albums = []
    for album in [ROOT, *sorted(path for path in ROOT.rglob("*") if path.is_dir())]:
        if list(album.glob("*.jpg")):
            payload = build_album(album)
            if payload["images"]:
                albums.append(payload)

    payload = {
        "business": BUSINESS,
        "groups": GROUPS,
        "albums": albums,
        "stats": {
            "albumCount": len(albums),
            "photoCount": sum(album["imageCount"] for album in albums),
            "sectionCount": len(GROUPS),
        },
    }
    OUT.write_text(
        "window.GALLERY_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
