const data = window.GALLERY_DATA;

const copy = {
  lv: {
    pageTitle: "Jurijs Kisels Balonu Dekori",
    navGallery: "Skatīt piemērus",
    callNow: "Zvaniet tagad",
    mainContact: "Galvenais kontakts",
    heroEyebrow: "Balonu dekori kāzām, svētkiem, atklāšanām un fotosesijām",
    heroTitle: "Noformējums, ko cilvēki fotografē jau pie ieejas.",
    heroPrimary: "Atvērt galeriju",
    heroSecondary: "Sazināties",
    popularLabel: "Populārākie virzieni",
    popularLink: "Skatīt visus albumus",
    servicesEyebrow: "Ko piedāvā Jurijs Kisels",
    servicesTitle: "Ātrs veids, kā atrast vajadzīgos piemērus",
    galleryEyebrow: "Piemēru arhīvs",
    galleryTitle: "Izvēlieties pasākuma veidu un atveriet pilnu albumu",
    searchLabel: "Meklēt albumos",
    searchPlaceholder: "Kāzas, figūras, arkas...",
    filtersTitle: "Filtri",
    howToTitle: "Kā lietot galeriju",
    howToItems: [
      "Izvēlieties kategoriju, lai sašaurinātu piemērus.",
      "Atveriet albumu, lai redzētu pilnu foto kopu.",
      "Noklikšķiniet uz attēla, lai atvērtu to pilnā izmērā.",
    ],
    chooseAlbum: "Izvēlieties albumu",
    chooseAlbumSubtitle: "Atveriet albuma kartīti, lai apskatītu pilnu piemēru kopu.",
    showMore: "Rādīt vēl",
    contactEyebrow: "Sazināties ar Juriju Kiselu",
    contactTitle: "Vajag ideju vai noformējumu jūsu pasākumam?",
    contactGallery: "Vispirms apskatīt piemērus",
    allAlbums: "Visi albumi",
    noMatchesTitle: "Nekas netika atrasts",
    noMatchesSubtitle: "Pamēģiniet citu atslēgvārdu vai izvēlieties citu sadaļu.",
    openAlbum: "Atvērt albumu",
    albums: "albumi",
    photos: "foto",
    examples: "piemēri",
    statAlbums: "Albumi",
    statPhotos: "Foto piemēri",
    statSections: "Galerijas sadaļas",
    lightboxClose: "Aizvērt attēlu",
    lightboxPrev: "Iepriekšējais attēls",
    lightboxNext: "Nākamais attēls",
  },
  ru: {
    pageTitle: "Юрий Кисель Оформление шарами",
    navGallery: "Смотреть примеры",
    callNow: "Позвонить сейчас",
    mainContact: "Главный контакт",
    heroEyebrow: "Оформление шарами для свадеб, праздников, открытий и фотосессий",
    heroTitle: "Декор, который фотографируют ещё до начала праздника.",
    heroPrimary: "Открыть галерею",
    heroSecondary: "Связаться",
    popularLabel: "Популярные направления",
    popularLink: "Смотреть все альбомы",
    servicesEyebrow: "Что предлагает Юрий Кисель",
    servicesTitle: "Быстрый способ найти нужные примеры",
    galleryEyebrow: "Архив примеров",
    galleryTitle: "Выберите тип события и откройте полный альбом",
    searchLabel: "Поиск по альбомам",
    searchPlaceholder: "Свадьба, фигуры, арки...",
    filtersTitle: "Фильтры",
    howToTitle: "Как пользоваться галереей",
    howToItems: [
      "Выберите категорию, чтобы сузить подборку.",
      "Откройте альбом, чтобы посмотреть весь набор фотографий.",
      "Нажмите на изображение, чтобы открыть его крупнее.",
    ],
    chooseAlbum: "Выберите альбом",
    chooseAlbumSubtitle: "Откройте карточку альбома, чтобы посмотреть полный набор примеров.",
    showMore: "Показать ещё",
    contactEyebrow: "Связаться с Юрием Киселем",
    contactTitle: "Нужна идея или оформление шарами для вашего события?",
    contactGallery: "Сначала выбрать примеры",
    allAlbums: "Все альбомы",
    noMatchesTitle: "Ничего не найдено",
    noMatchesSubtitle: "Попробуйте другой запрос или переключите раздел галереи.",
    openAlbum: "Открыть альбом",
    albums: "альбомы",
    photos: "фото",
    examples: "примеры",
    statAlbums: "Альбомы",
    statPhotos: "Фото примеры",
    statSections: "Разделы галереи",
    lightboxClose: "Закрыть изображение",
    lightboxPrev: "Предыдущее изображение",
    lightboxNext: "Следующее изображение",
  },
};

const state = {
  language: "lv",
  activeGroup: "all",
  query: "",
  selectedAlbumId: null,
  viewerLimit: 18,
  lightboxImages: [],
  lightboxIndex: 0,
};

const groupOrder = ["all", "weddings", "figures", "launches", "surprises", "ideas"];

const els = {
  topbar: document.querySelector(".topbar"),
  metaDescription: document.getElementById("metaDescription"),
  brandName: document.getElementById("brandName"),
  brandTagline: document.getElementById("brandTagline"),
  navGalleryLink: document.getElementById("navGalleryLink"),
  phoneLink: document.getElementById("phoneLink"),
  phoneCtaLabel: document.getElementById("phoneCtaLabel"),
  phoneCtaNumber: document.getElementById("phoneCtaNumber"),
  heroEyebrow: document.getElementById("heroEyebrow"),
  heroTitle: document.getElementById("heroTitle"),
  heroIntro: document.getElementById("heroIntro"),
  heroPhoneLink: document.getElementById("heroPhoneLink"),
  heroPhoneLabel: document.getElementById("heroPhoneLabel"),
  heroPhoneNumber: document.getElementById("heroPhoneNumber"),
  heroPrimaryLink: document.getElementById("heroPrimaryLink"),
  heroSecondaryLink: document.getElementById("heroSecondaryLink"),
  heroStats: document.getElementById("heroStats"),
  popularLabel: document.getElementById("popularLabel"),
  popularLink: document.getElementById("popularLink"),
  spotlightGrid: document.getElementById("spotlightGrid"),
  servicesEyebrow: document.getElementById("servicesEyebrow"),
  servicesTitle: document.getElementById("servicesTitle"),
  groupCards: document.getElementById("groupCards"),
  galleryEyebrow: document.getElementById("galleryEyebrow"),
  galleryTitle: document.getElementById("galleryTitle"),
  searchLabel: document.getElementById("searchLabel"),
  searchInput: document.getElementById("searchInput"),
  filtersTitle: document.getElementById("filtersTitle"),
  howToTitle: document.getElementById("howToTitle"),
  howToList: document.getElementById("howToList"),
  filterList: document.getElementById("filterList"),
  albumGrid: document.getElementById("albumGrid"),
  albumViewer: document.getElementById("albumViewer"),
  viewerGroup: document.getElementById("viewerGroup"),
  viewerTitle: document.getElementById("viewerTitle"),
  viewerSubtitle: document.getElementById("viewerSubtitle"),
  viewerGrid: document.getElementById("viewerGrid"),
  viewerMoreButton: document.getElementById("viewerMoreButton"),
  contactEyebrow: document.getElementById("contactEyebrow"),
  contactTitle: document.getElementById("contactTitle"),
  contactIntro: document.getElementById("contactIntro"),
  contactPhoneLink: document.getElementById("contactPhoneLink"),
  contactGalleryLink: document.getElementById("contactGalleryLink"),
  lightbox: document.getElementById("lightbox"),
  lightboxImage: document.getElementById("lightboxImage"),
  lightboxCaption: document.getElementById("lightboxCaption"),
  lightboxClose: document.getElementById("lightboxClose"),
  lightboxPrev: document.getElementById("lightboxPrev"),
  lightboxNext: document.getElementById("lightboxNext"),
};

function t(key) {
  return copy[state.language][key];
}

function albumTitle(album) {
  return album.title[state.language];
}

function albumPath(album) {
  return album.pathLabel[state.language];
}

function groupTitle(group) {
  return data.groups[group].title[state.language];
}

function groupBlurb(group) {
  return data.groups[group].blurb[state.language];
}

function groupAlbums(group) {
  return data.albums.filter((album) => album.group === group);
}

function groupLabel(group) {
  return group === "all" ? t("allAlbums") : groupTitle(group);
}

function groupCount(group) {
  return group === "all" ? data.albums.length : groupAlbums(group).length;
}

function filteredAlbums() {
  return data.albums.filter((album) => {
    const matchGroup = state.activeGroup === "all" || album.group === state.activeGroup;
    const haystack = [
      album.title.lv,
      album.title.ru,
      album.nativeTitle,
      album.pathLabel.lv,
      album.pathLabel.ru,
      groupTitle(album.group),
    ]
      .join(" ")
      .toLowerCase();
    const matchQuery = !state.query || haystack.includes(state.query);
    return matchGroup && matchQuery;
  });
}

function selectedAlbum() {
  const albums = filteredAlbums();
  const found = albums.find((album) => album.id === state.selectedAlbumId);
  return found || albums[0] || null;
}

function applyStaticCopy() {
  document.documentElement.lang = state.language;
  document.title = t("pageTitle");
  els.metaDescription.content = data.business.metaDescription[state.language];
  els.brandName.textContent = data.business.name[state.language];
  els.brandTagline.textContent = data.business.brand[state.language];
  els.navGalleryLink.textContent = t("navGallery");
  els.phoneLink.href = data.business.phoneLink;
  els.phoneCtaLabel.textContent = t("callNow");
  els.phoneCtaNumber.textContent = data.business.phoneDisplay;
  els.heroEyebrow.textContent = t("heroEyebrow");
  els.heroTitle.textContent = t("heroTitle");
  els.heroIntro.textContent = data.business.intro[state.language];
  els.heroPhoneLink.href = data.business.phoneLink;
  els.heroPhoneLabel.textContent = t("mainContact");
  els.heroPhoneNumber.textContent = data.business.phoneDisplay;
  els.heroPrimaryLink.textContent = t("heroPrimary");
  els.heroSecondaryLink.textContent = t("heroSecondary");
  els.popularLabel.textContent = t("popularLabel");
  els.popularLink.textContent = t("popularLink");
  els.servicesEyebrow.textContent = t("servicesEyebrow");
  els.servicesTitle.textContent = t("servicesTitle");
  els.galleryEyebrow.textContent = t("galleryEyebrow");
  els.galleryTitle.textContent = t("galleryTitle");
  els.searchLabel.textContent = t("searchLabel");
  els.searchInput.placeholder = t("searchPlaceholder");
  els.filtersTitle.textContent = t("filtersTitle");
  els.howToTitle.textContent = t("howToTitle");
  els.howToList.innerHTML = t("howToItems").map((item) => `<li>${item}</li>`).join("");
  els.viewerMoreButton.textContent = t("showMore");
  els.contactEyebrow.textContent = t("contactEyebrow");
  els.contactTitle.textContent = t("contactTitle");
  els.contactIntro.textContent = `${data.business.intro[state.language]} ${state.language === "lv" ? "Izvēlieties piemērus galerijā un sazinieties ar Juru, lai apspriestu datumu, vietu un vēlamo stilu." : "Выберите примеры в галерее и свяжитесь с Юрой, чтобы обсудить дату, место и нужный стиль."}`;
  els.contactPhoneLink.href = data.business.phoneLink;
  els.contactPhoneLink.textContent = data.business.phoneDisplay;
  els.contactGalleryLink.textContent = t("contactGallery");
  els.lightboxClose.setAttribute("aria-label", t("lightboxClose"));
  els.lightboxPrev.setAttribute("aria-label", t("lightboxPrev"));
  els.lightboxNext.setAttribute("aria-label", t("lightboxNext"));

  const statItems = [
    { label: t("statAlbums"), value: data.stats.albumCount },
    { label: t("statPhotos"), value: data.stats.photoCount },
    { label: t("statSections"), value: data.stats.sectionCount },
  ];

  els.heroStats.innerHTML = statItems
    .map(
      (item) => `
        <div>
          <dt>${item.label}</dt>
          <dd>${item.value}</dd>
        </div>
      `,
    )
    .join("");

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.language);
  });
}

function renderSpotlight() {
  els.spotlightGrid.innerHTML = groupOrder
    .filter((group) => group !== "all")
    .map((group) => {
      const album = groupAlbums(group)[0];
      return `
        <button class="spotlight-card" type="button" data-group-target="${group}">
          <div class="spotlight-thumb">
            <img src="${album.cover}" alt="${albumTitle(album)}" loading="lazy" />
          </div>
          <div class="spotlight-copy">
            <h3>${groupTitle(group)}</h3>
            <p>${groupBlurb(group)}</p>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderGroupCards() {
  els.groupCards.innerHTML = groupOrder
    .filter((group) => group !== "all")
    .map((group) => {
      const albumCount = groupCount(group);
      const photoCount = groupAlbums(group).reduce((total, album) => total + album.imageCount, 0);
      return `
        <button class="service-card" type="button" data-group-target="${group}">
          <div>
            <strong>${groupTitle(group)}</strong>
            <p>${groupBlurb(group)}</p>
          </div>
          <div class="service-meta">
            <span>${albumCount} ${t("albums")}</span>
            <span>${photoCount} ${t("photos")}</span>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderFilters() {
  els.filterList.innerHTML = groupOrder
    .map((group) => {
      const active = state.activeGroup === group ? "active" : "";
      return `
        <button class="filter-button ${active}" type="button" data-filter="${group}">
          <span>${groupLabel(group)}</span>
          <strong>${groupCount(group)}</strong>
        </button>
      `;
    })
    .join("");
}

function ensureSelection() {
  const current = selectedAlbum();
  state.selectedAlbumId = current ? current.id : null;
}

function renderAlbumGrid() {
  ensureSelection();
  const albums = filteredAlbums();
  if (!albums.length) {
    els.albumGrid.innerHTML = `
      <div class="sidebar-card">
        <p class="sidebar-title">${t("noMatchesTitle")}</p>
        <p class="viewer-subtitle">${t("noMatchesSubtitle")}</p>
      </div>
    `;
    return;
  }

  els.albumGrid.innerHTML = albums
    .map((album) => {
      const selected = album.id === state.selectedAlbumId ? "selected" : "";
      return `
        <button class="album-card ${selected}" type="button" data-album="${album.id}">
          <div class="album-card-cover">
            <img src="${album.cover}" alt="${albumTitle(album)}" loading="lazy" />
          </div>
          <div class="album-card-body">
            <p class="album-path">${groupLabel(album.group)}</p>
            <h3>${albumTitle(album)}</h3>
            <p class="viewer-subtitle">${albumPath(album)}</p>
            <div class="album-meta">
              <span>${album.imageCount} ${t("photos")}</span>
              <span>${t("openAlbum")}</span>
            </div>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderViewer() {
  const album = selectedAlbum();
  if (!album) {
    els.viewerGroup.textContent = "";
    els.viewerTitle.textContent = t("chooseAlbum");
    els.viewerSubtitle.textContent = t("chooseAlbumSubtitle");
    els.viewerGrid.innerHTML = "";
    els.viewerMoreButton.hidden = true;
    return;
  }

  els.viewerGroup.textContent = groupLabel(album.group);
  els.viewerTitle.textContent = albumTitle(album);
  els.viewerSubtitle.textContent = `${albumPath(album)} • ${album.imageCount} ${t("photos")}`;

  const visibleImages = album.images.slice(0, state.viewerLimit);
  els.viewerGrid.innerHTML = visibleImages
    .map(
      (image, index) => `
        <button class="viewer-image" type="button" data-image-index="${index}">
          <img src="${image}" alt="${albumTitle(album)} ${t("examples")} ${index + 1}" loading="lazy" />
          <span class="viewer-badge">${index + 1}</span>
        </button>
      `,
    )
    .join("");

  els.viewerMoreButton.hidden = state.viewerLimit >= album.images.length;
  state.lightboxImages = album.images;
  history.replaceState(null, "", `#${album.id}`);
}

function renderAll() {
  applyStaticCopy();
  renderSpotlight();
  renderGroupCards();
  renderFilters();
  renderAlbumGrid();
  renderViewer();
}

function scrollToSection(element) {
  if (!element) {
    return;
  }
  const top = element.getBoundingClientRect().top + window.scrollY - 110;
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
}

function selectGroup(group) {
  state.activeGroup = group;
  state.viewerLimit = 18;
  state.selectedAlbumId = null;
  renderAll();
}

function selectAlbum(albumId) {
  state.selectedAlbumId = albumId;
  state.viewerLimit = 18;
  renderAll();
}

function setLanguage(language) {
  state.language = language;
  renderAll();
}

function openLightbox(index) {
  state.lightboxIndex = index;
  updateLightbox();
  if (!els.lightbox.open) {
    els.lightbox.showModal();
  }
}

function updateLightbox() {
  const image = state.lightboxImages[state.lightboxIndex];
  const album = selectedAlbum();
  if (!image || !album) {
    return;
  }
  els.lightboxImage.src = image;
  els.lightboxImage.alt = `${albumTitle(album)} ${t("examples")} ${state.lightboxIndex + 1}`;
  els.lightboxCaption.textContent = `${albumTitle(album)} • ${state.lightboxIndex + 1} / ${state.lightboxImages.length}`;
}

function moveLightbox(direction) {
  const count = state.lightboxImages.length;
  if (!count) {
    return;
  }
  state.lightboxIndex = (state.lightboxIndex + direction + count) % count;
  updateLightbox();
}

function applyHashSelection() {
  const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (!hash) {
    state.selectedAlbumId = data.albums[0]?.id ?? null;
    return;
  }
  const album = data.albums.find((entry) => entry.id === hash);
  state.selectedAlbumId = album ? album.id : data.albums[0]?.id ?? null;
}

function attachEvents() {
  document.addEventListener("click", (event) => {
    const langButton = event.target.closest("[data-lang]");
    if (langButton) {
      setLanguage(langButton.dataset.lang);
      return;
    }

    const filter = event.target.closest("[data-filter]");
    if (filter) {
      selectGroup(filter.dataset.filter);
      return;
    }

    const groupTarget = event.target.closest("[data-group-target]");
    if (groupTarget) {
      selectGroup(groupTarget.dataset.groupTarget);
      requestAnimationFrame(() => scrollToSection(els.albumGrid));
      return;
    }

    const albumCard = event.target.closest("[data-album]");
    if (albumCard) {
      selectAlbum(albumCard.dataset.album);
      requestAnimationFrame(() => scrollToSection(els.albumViewer));
      return;
    }

    const imageButton = event.target.closest("[data-image-index]");
    if (imageButton) {
      openLightbox(Number(imageButton.dataset.imageIndex));
    }
  });

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    state.viewerLimit = 18;
    state.selectedAlbumId = null;
    renderAll();
  });

  els.viewerMoreButton.addEventListener("click", () => {
    state.viewerLimit += 18;
    renderViewer();
  });

  els.lightbox.addEventListener("click", (event) => {
    if (event.target === els.lightbox) {
      els.lightbox.close();
    }
  });

  els.lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    els.lightbox.close();
  });

  els.lightboxClose.addEventListener("click", () => els.lightbox.close());
  els.lightboxPrev.addEventListener("click", () => moveLightbox(-1));
  els.lightboxNext.addEventListener("click", () => moveLightbox(1));

  window.addEventListener("keydown", (event) => {
    if (!els.lightbox.open) {
      return;
    }
    if (event.key === "ArrowLeft") {
      moveLightbox(-1);
    }
    if (event.key === "ArrowRight") {
      moveLightbox(1);
    }
    if (event.key === "Escape") {
      els.lightbox.close();
    }
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function init() {
  applyHashSelection();
  renderAll();
  attachEvents();
  setupReveal();
}

init();
