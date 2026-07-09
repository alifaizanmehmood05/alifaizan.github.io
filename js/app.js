/* =====================================================
   app.js — renders the playful portfolio from data.js
   and wires up sticky notes, nav, filters, reveals.
   ===================================================== */

import {
  showcases,
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

  const shot = shotMap[s.screenshots] && shotMap[s.screenshots][0]?.file;
  const media = shot
    ? `<img src="assets/images/${shot}" alt="${s.title} screenshot" loading="lazy" />`
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
      ${link}
    </div>`;
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
  buildSocials();
  buildToolGrid();
  buildJobs();
  renderProjects();      // cards register with the observer as they render
  buildContact();
  initNav();
  initStickies();
});
