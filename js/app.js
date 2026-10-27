/* =====================================================
   app.js — renders the playful portfolio from data.js
   and wires up sticky notes, nav, filters, reveals.
   ===================================================== */

import {
  showcases, showcaseCategories, services, process, education,
  screenshotData, sudokuScreenshots, pdfEditorScreenshots, aiTutorScreenshots,
  dualSpaceScreenshots, warCardScreenshots, nacelleScreenshots, arvoaScreenshots,
  videoDownloaderScreenshots, laundryCartScreenshots, smartPrinterScreenshots,
  subscriptionScreenshots
} from './data.js';

/* map each showcase's screenshot-array name to the actual array */
const shotMap = {
  screenshotData, sudokuScreenshots, pdfEditorScreenshots, aiTutorScreenshots,
  dualSpaceScreenshots, warCardScreenshots, nacelleScreenshots, arvoaScreenshots,
  videoDownloaderScreenshots, laundryCartScreenshots, smartPrinterScreenshots,
  subscriptionScreenshots
};

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

/* ---------- Flutter inline SVG (no icon font for it) ---------- */
const flutterSvg =
  '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/></svg>';
const iconMarkup = (icon) =>
  icon === 'svg:flutter' || icon === 'fab fa-flutter'
    ? flutterSvg
    : `<i class="${icon}"></i>`;

/* ---------- Hero stats ---------- */
const heroStats = [
  { n: '4+', l: 'Years shipping', icon: 'fas fa-calendar-check' },
  { n: '12+', l: 'Apps built', icon: 'fas fa-layer-group' },
  { n: '3', l: 'Live on App Store', icon: 'fab fa-apple' },
  { n: '70+', l: 'WPM typing', icon: 'fas fa-keyboard' }
];
function buildHeroStats() {
  const wrap = $('#heroStats');
  if (!wrap) return;                     // projects.html has no stats band
  heroStats.forEach((s, i) => {
    const box = el('div', 'hero-stat',
      `<div class="si"><i class="${s.icon}"></i></div>
       <div class="n" data-n="${s.n}">0</div>
       <div class="l">${s.l}</div>`);
    box.style.animation = `rise .6s ${0.1 + i * 0.09}s cubic-bezier(.2,.8,.2,1) both`;
    wrap.appendChild(box);
  });
  countUpAll();
}

/* Animate every [data-n] number from 0 to its target once visible */
function countUpAll() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const raw = e.target.dataset.n;              // e.g. "12+", "3", "70+"
      const target = parseInt(raw, 10) || 0;
      const suffix = raw.replace(/[0-9]/g, '');
      const dur = 1100;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        e.target.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-n]').forEach((n) => io.observe(n));
}

/* ---------- Stalk Me Here (social icons) ---------- */
const socials = [
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/ali-faizan-mehmood-132671282', label: 'LinkedIn' },
  { icon: 'fab fa-github', href: 'https://github.com/alifaizanmehmood05', label: 'GitHub' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/923280930424', label: 'WhatsApp' },
  { icon: 'fas fa-envelope', href: 'mailto:alifaizanmehmood05@gmail.com', label: 'Email' }
];
function buildSocials() {
  const wrap = $('#socials');
  if (!wrap) return;
  socials.forEach((s) => {
    const a = el('a', 'social', `<i class="${s.icon}"></i>`);
    a.href = s.href;
    a.setAttribute('aria-label', s.label);
    a.title = s.label;
    if (s.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
    wrap.appendChild(a);
  });
}

/* ---------- Tool Kit (grid of logo cards) ---------- */
const toolKit = [
  { name: 'Flutter', icon: 'svg:flutter' },
  { name: 'Dart', icon: 'fas fa-code' },
  { name: 'Kotlin', icon: 'fab fa-android' },
  { name: 'Compose', icon: 'fas fa-cubes' },
  { name: 'Firebase', icon: 'fas fa-fire' },
  { name: 'Riverpod', icon: 'fas fa-water' },
  { name: 'GetX', icon: 'fas fa-bolt' },
  { name: 'Stripe', icon: 'fas fa-credit-card' },
  { name: 'REST APIs', icon: 'fas fa-cloud' },
  { name: 'ML Kit / AI', icon: 'fas fa-brain' },
  { name: 'Android Studio', icon: 'fab fa-android' },
  { name: 'Git', icon: 'fab fa-git-alt' }
];
function buildToolGrid() {
  const wrap = $('#toolGrid');
  if (!wrap) return;
  toolKit.forEach((t) => {
    const card = el('div', 'toolcard', `<div class="ti">${iconMarkup(t.icon)}</div><span>${t.name}</span>`);
    wrap.appendChild(card);
  });
}

/* ---------- Experience (company cards with metric bullets) ---------- */
const jobs = [
  {
    badge: 'Ozeito 📱',
    role: 'Mobile App Developer',
    period: "Jul 22' – Present",
    accent: 'y',
    bullets: [
      '<b>Shipped 3 apps LIVE on the Apple App Store</b> — FutureBaby AI, Sudoku & Killer and PDF Editor — full submission, review & post-launch loop.',
      '<b>Built 12+ production apps</b> across Flutter, native Android (Kotlin + XML) and Jetpack Compose.',
      '<b>Owned products end-to-end</b>: requirements → architecture → build → store launch → updates.'
    ]
  },
  {
    badge: 'Client & Freelance 🤝',
    role: 'Mobile Developer',
    period: "2023 – Present",
    accent: 'b',
    bullets: [
      '<b>LaundryCart</b> — 3-role app (user · admin · driver) with AI bag-scan, Stripe checkout & realtime order tracking.',
      '<b>Nacelle</b> — QR event check-in/out with live attendance stats and analytics reports.',
      '<b>ARVOA</b> — full social app: posts, likes, comments, realtime chat & Firebase push notifications.'
    ]
  },
  {
    badge: 'Native Android 🤖',
    role: 'Android Developer',
    period: "Jul 22' – 2024",
    accent: 'g',
    bullets: [
      '<b>Tutor AI</b> — math-solver chatbot with camera equation scan, ML Kit, IAP & localization.',
      '<b>Video Downloader</b> — Jetpack Compose Chrome-style WebView, tab manager & downloads.',
      '<b>Smart Printer & Subscribify</b> — filters, scanning, Retrofit APIs & renewal reminders.'
    ]
  }
];
function buildJobs() {
  const wrap = $('#jobs');
  if (!wrap) return;
  jobs.forEach((j, i) => {
    const card = el('div', 'jobcard reveal');
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <h3 class="job-company">${j.badge}</h3>
      <p class="job-meta"><b>${j.role}</b> <span class="job-period">${j.period}</span></p>
      <ul class="job-bullets">
        ${j.bullets.map((b) => `<li>${b}</li>`).join('')}
      </ul>`;
    wrap.appendChild(card);
    observeReveal(card);
  });
}

/* ---------- Featured projects (big highlight cards) ---------- */
const featured = [
  {
    icon: 'fas fa-baby',
    accent: 'coral',
    title: 'FutureBaby AI',
    tagline: 'Parents upload their photos and the AI predicts their future baby’s face — plus an aging feature and a similarity score. Built in Flutter, monetised with RevenueCat.',
    result: 'Live on the App Store 🍎',
    tech: ['Flutter', 'AI', 'RevenueCat', 'iOS'],
    badge: 'LIVE ON APP',
    link: 'https://apps.apple.com/us/app/future-baby-ai-baby-generator/id6756097644'
  },
  {
    icon: 'fas fa-tshirt',
    accent: 'blue',
    title: 'LaundryCart',
    tagline: 'End-to-end laundry app: AI camera bag-scan + weight estimation, Stripe checkout, and a 3-role flow (user · admin · driver) with realtime status from pickup → wash → delivered.',
    result: 'Full realtime 3-role platform',
    tech: ['Flutter', 'Riverpod', 'Firebase', 'Stripe', 'FCM'],
    badge: 'CLIENT BUILD',
    link: ''
  },
  {
    icon: 'fas fa-file-pdf',
    accent: 'green',
    title: 'PDF Editor',
    tagline: 'All-in-one document toolkit — convert Word ⇄ PDF / PowerPoint, PNG ⇄ JPG, add watermarks & signatures, and a freehand canvas to draw on PDFs.',
    result: 'Live on the App Store 🍎',
    tech: ['Flutter', 'Provider', 'REST APIs'],
    badge: 'LIVE ON APP',
    link: 'https://apps.apple.com/us/app/pdf-photo-pdf-to-word-maker/id6761983074'
  }
];
function buildFeatured() {
  const wrap = $('#featuredWrap');
  featured.forEach((f, i) => {
    const card = el('article', `featcard reveal feat-${f.accent}`);
    card.style.transitionDelay = `${i * 0.08}s`;
    const chips = f.tech.map((t) => `<span class="chip">${t}</span>`).join('');
    const cta = f.link
      ? `<a href="${f.link}" target="_blank" rel="noopener" class="card-link">View on App Store <i class="fas fa-arrow-right"></i></a>`
      : `<a href="#work" class="card-link">See more in projects <i class="fas fa-arrow-right"></i></a>`;
    card.innerHTML = `
      <div class="feat-media"><i class="${f.icon}"></i></div>
      <div class="feat-body">
        <span class="feat-badge">${f.badge}</span>
        <h3>${f.title}</h3>
        <p class="feat-tag">${f.tagline}</p>
        <p class="feat-result"><i class="fas fa-bolt"></i> ${f.result}</p>
        <div class="card-tech">${chips}</div>
        ${cta}
      </div>`;
    wrap.appendChild(card);
    observeReveal(card);
  });
}

/* ---------- Projects (from showcases) ---------- */
const catLabels = {
  all: 'Everything',
  flutter: 'Flutter',
  compose: 'Compose',
  native: 'Native Android'
};
function buildFilters() {
  const wrap = $('#filters');
  const cats = ['all', 'flutter', 'compose', 'native'];
  cats.forEach((c, i) => {
    const b = el('button', 'filter' + (i === 0 ? ' active' : ''), catLabels[c]);
    b.dataset.cat = c;
    b.addEventListener('click', () => {
      $('#filters .filter.active')?.classList.remove('active');
      b.classList.add('active');
      renderProjects(c);
    });
    wrap.appendChild(b);
  });
}

function projectCard(s, i = 0) {
  const card = el('article', 'pcard reveal');
  card.style.transitionDelay = `${Math.min(i, 6) * 0.05}s`;
  card.dataset.cat = s.category;

  const shots = shotMap[s.screenshots] || [];
  const media = shots[0]
    ? `<img src="assets/images/${shots[0].file}" alt="${s.title} screenshot" loading="lazy" />`
    : iconMarkup(s.icon);

  const badgeText = s.appStore ? 'LIVE ON APP' : (s.pill?.text || s.category).toUpperCase();
  const chips = (s.tech || []).map((t) => `<span class="chip">${t}</span>`).join('');
  const link = s.appStore
    ? `<a href="${s.appStore}" target="_blank" rel="noopener" class="card-link">View on App Store <i class="fas fa-arrow-right"></i></a>`
    : '';

  card.innerHTML = `
    <div class="pcard-media accent-${s.accent || 'white'}">${media}</div>
    <div class="pcard-body">
      <span class="pbadge">${badgeText}</span>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <div class="card-tech">${chips}</div>
      <div class="pcard-foot">
        <span class="pcard-open">See all ${shots.length} screens <i class="fas fa-arrow-right"></i></span>
        ${link}
      </div>
    </div>`;

  /* whole card opens the detail sheet — except the App Store link */
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${s.title} — view details and all ${shots.length} screenshots`);
  card.querySelector('.card-link')?.addEventListener('click', (ev) => ev.stopPropagation());
  card.addEventListener('click', () => openProject(s.app, card));
  card.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      openProject(s.app, card);
    }
  });
  return card;
}

function renderProjects() {
  const grid = $('#projGrid');
  if (!grid) return;
  // home shows only the 3 App Store apps; the projects page shows all
  const featuredOnly = grid.hasAttribute('data-featured');
  const list = featuredOnly ? showcases.filter((s) => s.appStore) : showcases;
  grid.innerHTML = '';
  list.forEach((s, i) => {
    const card = projectCard(s, i);
    grid.appendChild(card);
    observeReveal(card); // animate in when it scrolls into view
  });
}

/* ---------- Project detail sheet (all screenshots + full details) ---------- */
const originMeta = {
  company: 'Company product',
  client: 'Client project',
  personal: 'Personal project'
};

let sheetEl = null;        // the overlay
let sheetOpener = null;    // element to restore focus to on close

/* <html> is the scrolling element here, so lock both it and <body>.
   Pad by the scrollbar width so the page doesn't jump sideways. */
function lockScroll(on) {
  if (on) {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--sbw', `${sbw}px`);
  }
  document.documentElement.classList.toggle('sheet-lock', on);
  document.body.classList.toggle('sheet-lock', on);
}

/* reveal a screenshot only once it can paint — no half-drawn pop-in */
function fadeInWhenLoaded(img) {
  const done = () => {
    img.classList.add('ready');
    img.closest('.shot-frame')?.classList.add('loaded');
  };
  if (img.complete && img.naturalWidth) done();
  else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
}

/* keep Tab inside whichever layer is on top */
function trapFocus(ev) {
  const box = lbEl?.classList.contains('open') ? lbEl : $('.sheet-panel', sheetEl);
  if (!box) return;
  const items = [...box.querySelectorAll('a[href], button:not([disabled])')]
    .filter((n) => n.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
  else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  else if (!box.contains(document.activeElement)) { ev.preventDefault(); first.focus(); }
}

function buildSheet() {
  sheetEl = el('div', 'sheet');
  sheetEl.id = 'projSheet';
  sheetEl.setAttribute('role', 'dialog');
  sheetEl.setAttribute('aria-modal', 'true');
  sheetEl.setAttribute('aria-label', 'Project details');
  sheetEl.innerHTML = `
    <div class="sheet-back" data-close></div>
    <div class="sheet-panel">
      <button class="sheet-close" type="button" data-close aria-label="Close project details">
        <i class="fas fa-xmark"></i>
      </button>
      <div class="sheet-body"></div>
    </div>`;
  document.body.appendChild(sheetEl);

  sheetEl.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-close]')) closeProject();
  });
}

function sheetMarkup(s) {
  const cat = showcaseCategories.find((c) => c.id === s.category);
  const shots = shotMap[s.screenshots] || [];
  const android = cat?.phoneStyle === 'android';

  const eyebrow = [
    s.appStore ? '<span class="live">Live on the App Store</span>' : '',
    cat ? cat.label : '',
    originMeta[s.origin] || ''
  ].filter(Boolean).join('<span class="sep">/</span>');

  const chips = (s.tech || []).map((t) => `<span class="chip">${t}</span>`).join('');

  const cta = [
    s.appStore
      ? `<a href="${s.appStore}" target="_blank" rel="noopener" class="btn btn--primary">
           <i class="fab fa-apple"></i> View on the App Store</a>`
      : '',
    s.pill?.url && s.pill.url !== s.appStore
      ? `<a href="${s.pill.url}" target="_blank" rel="noopener" class="btn">
           <i class="fas fa-arrow-up-right-from-square"></i> ${s.pill.text}</a>`
      : ''
  ].filter(Boolean).join('');

  const grid = shots.map((sh, i) => `
    <button class="shot" type="button" data-i="${i}" style="--i:${i}" aria-label="Enlarge screenshot: ${sh.caption}">
      <span class="shot-frame${android ? ' shot-frame--android' : ''}">
        <img src="assets/images/${sh.file}" alt="${s.title} — ${sh.caption}"
             loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async" />
      </span>
      <span class="shot-cap">${sh.caption}</span>
    </button>`).join('');

  return `
    <div class="sheet-head">
      <p class="sheet-eyebrow">${eyebrow}</p>
      <h2>${s.title}</h2>
      <p class="sheet-sub">${s.subtitle}</p>
      <p class="sheet-desc">${s.description}</p>
      <div class="sheet-tech">${chips}</div>
      ${cta ? `<div class="sheet-cta">${cta}</div>` : ''}
    </div>
    <hr class="sheet-rule" />
    <div class="sheet-shots-head">
      <h3>Screens</h3>
      <span class="count">${shots.length} screenshot${shots.length === 1 ? '' : 's'}</span>
      <span class="hint">tap one to zoom 🔍</span>
    </div>
    <div class="shots">${grid}</div>`;
}

function openProject(appId, opener) {
  const s = showcases.find((x) => x.app === appId);
  if (!s) return;
  if (!sheetEl) buildSheet();

  sheetOpener = opener || null;
  const body = $('.sheet-body', sheetEl);
  body.innerHTML = sheetMarkup(s);

  const shots = shotMap[s.screenshots] || [];
  body.querySelectorAll('.shot').forEach((b) => {
    b.addEventListener('click', () => openLightbox(shots, Number(b.dataset.i), s.title));
  });
  body.querySelectorAll('.shot img').forEach(fadeInWhenLoaded);

  lockScroll(true);
  sheetEl.classList.add('open');
  $('.sheet-panel', sheetEl).scrollTop = 0;
  sheetEl.scrollTop = 0;
  $('.sheet-close', sheetEl).focus();

  // deep link, so the sheet is shareable and Back closes it
  if (decodeURIComponent(location.hash) !== `#p=${appId}`) {
    history.pushState({ project: appId }, '', `#p=${appId}`);
  }
}

function closeProject({ fromHistory = false } = {}) {
  if (!sheetEl || !sheetEl.classList.contains('open')) return;
  closeLightbox();
  sheetEl.classList.remove('open');
  lockScroll(false);
  if (!fromHistory && location.hash.startsWith('#p=')) history.back();
  sheetOpener?.focus();
  sheetOpener = null;
}

/* ---------- Fullscreen screenshot viewer ---------- */
let lbEl = null;
let lbShots = [];
let lbIndex = 0;

function buildLightbox() {
  lbEl = el('div', 'lb');
  lbEl.setAttribute('role', 'dialog');
  lbEl.setAttribute('aria-modal', 'true');
  lbEl.setAttribute('aria-label', 'Screenshot viewer');
  lbEl.innerHTML = `
    <button class="lb-btn lb-close" type="button" data-lb-close aria-label="Close viewer">
      <i class="fas fa-xmark"></i>
    </button>
    <img class="lb-img" alt="" />
    <div class="lb-bar">
      <button class="lb-btn" type="button" data-lb-prev aria-label="Previous screenshot">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="lb-meta">
        <p class="lb-cap"></p>
        <p class="lb-num"></p>
      </div>
      <button class="lb-btn" type="button" data-lb-next aria-label="Next screenshot">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>`;
  document.body.appendChild(lbEl);

  // swipe left/right on touch
  let tx = 0, ty = 0;
  lbEl.addEventListener('touchstart', (ev) => {
    tx = ev.changedTouches[0].clientX;
    ty = ev.changedTouches[0].clientY;
  }, { passive: true });
  lbEl.addEventListener('touchend', (ev) => {
    const dx = ev.changedTouches[0].clientX - tx;
    const dy = ev.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) stepLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });

  lbEl.addEventListener('click', (ev) => {
    if (ev.target.closest('[data-lb-prev]')) return stepLightbox(-1);
    if (ev.target.closest('[data-lb-next]')) return stepLightbox(1);
    // close on the backdrop or the X, but not on the image itself
    if (ev.target.closest('[data-lb-close]') || !ev.target.closest('.lb-img, .lb-bar')) closeLightbox();
  });
}

const shotSrc = (sh) => `assets/images/${sh.file}`;

/* warm the next/previous shot so arrowing through never shows a blank frame */
function preloadNeighbours() {
  if (lbShots.length < 2) return;
  [1, -1].forEach((d) => {
    const n = lbShots[(lbIndex + d + lbShots.length) % lbShots.length];
    if (n) new Image().src = shotSrc(n);
  });
}

let paintToken = 0;
function paintLightbox(title) {
  const sh = lbShots[lbIndex];
  const img = $('.lb-img', lbEl);
  const src = shotSrc(sh);
  const token = ++paintToken;          // ignore a slow load the user already arrowed past

  $('.lb-cap', lbEl).textContent = sh.caption;
  $('.lb-num', lbEl).textContent = `${lbIndex + 1} / ${lbShots.length}`;

  const swap = () => {
    if (token !== paintToken) return;
    img.src = src;
    img.alt = `${title} — ${sh.caption}`;
    requestAnimationFrame(() => token === paintToken && img.classList.add('ready'));
    preloadNeighbours();
  };

  img.classList.remove('ready');       // fade the old one out
  const pre = new Image();
  pre.src = src;
  if (pre.complete && pre.naturalWidth) swap();
  else { pre.onload = swap; pre.onerror = swap; }
}

function openLightbox(shots, i, title) {
  if (!shots.length) return;
  if (!lbEl) buildLightbox();
  lbShots = shots;
  lbIndex = i;
  lbEl.dataset.title = title;
  paintLightbox(title);
  lbEl.classList.add('open');
  $('[data-lb-next]', lbEl).focus();
}

function stepLightbox(dir) {
  if (!lbShots.length) return;
  lbIndex = (lbIndex + dir + lbShots.length) % lbShots.length;
  paintLightbox(lbEl.dataset.title || '');
}

function closeLightbox() {
  if (!lbEl || !lbEl.classList.contains('open')) return;
  lbEl.classList.remove('open');
  $('.sheet-close', sheetEl)?.focus();
}

function initProjectSheet() {
  document.addEventListener('keydown', (ev) => {
    const lbOpen = lbEl?.classList.contains('open');
    const sheetOpen = sheetEl?.classList.contains('open');
    if (!sheetOpen && !lbOpen) return;
    if (ev.key === 'Escape') return lbOpen ? closeLightbox() : closeProject();
    if (ev.key === 'Tab') return trapFocus(ev);
    if (!lbOpen) return;
    if (ev.key === 'ArrowLeft') stepLightbox(-1);
    if (ev.key === 'ArrowRight') stepLightbox(1);
  });

  // Back / Forward buttons drive the sheet
  window.addEventListener('popstate', () => {
    const appId = decodeURIComponent(location.hash).startsWith('#p=')
      ? decodeURIComponent(location.hash).slice(3)
      : null;
    if (appId) openProject(appId);
    else closeProject({ fromHistory: true });
  });

  // open straight from a shared link (#p=futurebaby)
  const hash = decodeURIComponent(location.hash);
  if (hash.startsWith('#p=')) openProject(hash.slice(3));
}

/* ---------- Services: what I can build ---------- */
const svcAccents = ['coral', 'blue', 'green', 'yellow', 'pink', 'lilac'];
function buildServices() {
  const wrap = $('#svcGrid');
  if (!wrap) return;
  services.forEach((sv, i) => {
    const card = el('article', `svc reveal svc--${svcAccents[i % svcAccents.length]}`);
    card.style.transitionDelay = `${Math.min(i, 6) * 0.06}s`;
    card.innerHTML = `
      <div class="svc-ico">${iconMarkup(sv.icon)}</div>
      <h3>${sv.title}</h3>
      <p>${sv.description}</p>`;
    wrap.appendChild(card);
    observeReveal(card);
  });
}

/* ---------- Process: how I work ---------- */
function buildProcess() {
  const wrap = $('#stepList');
  if (!wrap) return;
  process.forEach((st, i) => {
    const li = el('li', 'step reveal');
    li.style.transitionDelay = `${Math.min(i, 6) * 0.07}s`;
    li.innerHTML = `
      <span class="step-n">${String(i + 1).padStart(2, '0')}</span>
      <div class="step-body">
        <h3><span class="step-ico">${iconMarkup(st.icon)}</span>${st.title}</h3>
        <p>${st.description}</p>
      </div>`;
    wrap.appendChild(li);
    observeReveal(li);
  });
}

/* ---------- Education ---------- */
function buildEducation() {
  const wrap = $('#eduList');
  if (!wrap) return;
  education.forEach((e, i) => {
    const row = el('div', 'edu-row reveal');
    row.style.transitionDelay = `${Math.min(i, 6) * 0.06}s`;
    row.innerHTML = `
      <span class="edu-ico">${iconMarkup(e.icon)}</span>
      <div>
        <h4>${e.degree}</h4>
        <p class="edu-school">${e.school}</p>
        <p class="edu-period">${e.period}${e.note ? ` · ${e.note}` : ''}</p>
      </div>`;
    wrap.appendChild(row);
    observeReveal(row);
  });
}

/* ---------- Contact links ---------- */
const contactLinks = [
  { icon: 'fas fa-envelope', text: 'alifaizanmehmood05@gmail.com', href: 'mailto:alifaizanmehmood05@gmail.com', copy: true },
  { icon: 'fas fa-phone-alt', text: '+92 328 0930424', href: 'tel:+923280930424' },
  { icon: 'fab fa-whatsapp', text: 'WhatsApp', href: 'https://wa.me/923280930424' },
  { icon: 'fab fa-linkedin', text: 'LinkedIn', href: 'https://www.linkedin.com/in/ali-faizan-mehmood-132671282' },
  { icon: 'fab fa-github', text: 'GitHub', href: 'https://github.com/alifaizanmehmood05' }
];
function buildContact() {
  const wrap = $('#contactLinks');
  if (!wrap) return;
  contactLinks.forEach((c) => {
    const a = el('a', null, `<i class="${c.icon}"></i> ${c.text}`);
    a.href = c.href;
    if (!c.href.startsWith('mailto') && !c.href.startsWith('tel')) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    if (c.copy) {
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        navigator.clipboard?.writeText('alifaizanmehmood05@gmail.com')
          .then(() => toast('Email copied to clipboard!'))
          .catch(() => (window.location.href = c.href));
      });
    }
    wrap.appendChild(a);
  });
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  $('#toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Navbar + scroll progress + scrollspy ---------- */
function initNav() {
  const bar = $('#progress');
  if (!bar) return;
  // dock is the only nav — highlight the active button while scrolling
  const spyLinks = [...document.querySelectorAll('.dock a[href^="#"]')];
  const uniqueTargets = [...new Set(spyLinks.map((a) => a.getAttribute('href')))];
  const sections = uniqueTargets
    .map((h) => document.querySelector(h))
    .filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY;
    // progress bar
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${h > 0 ? (y / h) * 100 : 0}%`;
    // scrollspy on the dock
    let current = sections[0]?.id;
    sections.forEach((sec) => {
      if (y >= sec.offsetTop - window.innerHeight * 0.4) current = sec.id;
    });
    spyLinks.forEach((a) =>
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`)
    );
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Reveal on scroll (shared observer) ---------- */
let revealObserver = null;
function initReveal() {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((n) => revealObserver.observe(n));
}
function observeReveal(node) {
  if (revealObserver) revealObserver.observe(node);
}

/* ---------- Draggable sticky notes ---------- */
function initStickies() {
  setupStickyLayer($('#stickyLayer'), { entrance: true });    // hero: pop-in entrance
  setupStickyLayer($('#aboutNotes'), { hangOnScroll: true }); // about: swing in from the left
}

function setupStickyLayer(layer, opts = {}) {
  if (!layer) return;
  const notes = layer.querySelectorAll('.sticky');

  if (opts.entrance) {
    // play the entrance once, then drop the class so hover never replays it
    notes.forEach((n) => n.classList.add('enter'));
    setTimeout(() => notes.forEach((n) => n.classList.remove('enter')), 2800);
  }

  if (opts.hangOnScroll) {
    // swing each note in from the left (pendulum) when the cluster scrolls into view
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        notes.forEach((n, i) => {
          n.style.animationDelay = `${i * 0.15}s`;
          n.classList.add('in');
        });
      });
    }, { threshold: 0.12 });
    io.observe(layer);
  }

  notes.forEach((note) => {
    let sx, sy, ox, oy, dragging = false;
    if (opts.entrance) {
      note.addEventListener('pointerenter', () => note.classList.remove('enter'), { once: true });
    }

    const down = (e) => {
      dragging = true;
      note.classList.add('drag');
      const p = e.touches ? e.touches[0] : e;
      const r = note.getBoundingClientRect();
      const lr = layer.getBoundingClientRect();
      // convert to absolute left/top inside layer, drop the rotate-based right anchor
      note.style.left = `${r.left - lr.left}px`;
      note.style.top = `${r.top - lr.top}px`;
      note.style.right = 'auto';
      ox = r.left - lr.left;
      oy = r.top - lr.top;
      sx = p.clientX;
      sy = p.clientY;
      e.preventDefault();
    };
    const move = (e) => {
      if (!dragging) return;
      const p = e.touches ? e.touches[0] : e;
      note.style.left = `${ox + (p.clientX - sx)}px`;
      note.style.top = `${oy + (p.clientY - sy)}px`;
    };
    const up = () => {
      dragging = false;
      note.classList.remove('drag');
    };

    note.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    note.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();          // create the observer first
  buildHeroStats();
  buildSocials();
  buildToolGrid();
  buildEducation();
  buildJobs();
  buildServices();
  buildProcess();
  renderProjects();      // cards register with the observer as they render
  initProjectSheet();    // click a card -> full details + every screenshot
  buildContact();
  initNav();
  initStickies();
});
