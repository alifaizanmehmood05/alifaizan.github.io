/* ============================================
   PROJECTS.JS — Renders projects, screenshots, skills
   ============================================ */

import {
  screenshotData,
  sudokuScreenshots,
  aiTutorScreenshots,
  dualSpaceScreenshots,
  warCardScreenshots,
  nacelleScreenshots,
  arvoaScreenshots,
  videoDownloaderScreenshots,
  laundryCartScreenshots,
  pdfEditorScreenshots,
  smartPrinterScreenshots,
  subscriptionScreenshots,
  showcases,
  showcaseCategories,
  skills,
  skillGroups,
  projects,
  experience,
  stats,
  process,
  services,
  whyMe,
  brands,
  education
} from './data.js';

const screenshotMap = {
  screenshotData,
  sudokuScreenshots,
  aiTutorScreenshots,
  dualSpaceScreenshots,
  warCardScreenshots,
  nacelleScreenshots,
  arvoaScreenshots,
  videoDownloaderScreenshots,
  laundryCartScreenshots,
  pdfEditorScreenshots,
  smartPrinterScreenshots,
  subscriptionScreenshots
};

/* ----- App showcases — grouped by tech category (Flutter / Compose / Native) ----- */
export function buildShowcases() {
  const wrap = document.getElementById('showcasesWrap');
  if (!wrap) return;

  const originMeta = {
    company: { icon: 'fas fa-building', label: 'Company Project' },
    client:  { icon: 'fas fa-handshake', label: 'Client Project' },
    personal:{ icon: 'fas fa-user', label: 'Personal Project' }
  };

  const cardHtml = (s) => {
    const o = originMeta[s.origin];
    const originBadge = o
      ? `<span class="origin-badge origin-badge--${s.origin}"><i class="${o.icon}"></i>${o.label}</span>`
      : '';
    return `
    <div class="screenshot-showcase reveal" data-app="${s.app}" data-accent="${s.accent}">
      ${originBadge}
      <div class="showcase-glow" aria-hidden="true"></div>
      <div class="showcase-title">
        <i class="${s.icon}"></i>
        <span class="gradient-text">${s.title}</span>
        <i class="${s.iconRight}"></i>
      </div>
      <div class="showcase-subtitle">
        ${s.appStore || s.playStore
          ? ''
          : s.pill.url
            ? `<a href="${s.pill.url}" target="_blank" rel="noopener noreferrer" class="live-pill pill-${s.pill.color} live-pill--link">
                <span class="dot"></span>${s.pill.text}
                <i class="fas fa-arrow-up-right-from-square"></i>
              </a>`
            : `<span class="live-pill pill-${s.pill.color}">
                <span class="dot"></span>${s.pill.text}
              </span>`}
        ${s.subtitle}
      </div>
      ${s.description ? `<p class="showcase-description">${s.description}</p>` : ''}
      ${(s.appStore || s.playStore) ? `
        <div class="store-badges">
          ${s.appStore ? `
            <a href="${s.appStore}" target="_blank" rel="noopener noreferrer" class="store-badge store-badge--apple" aria-label="Download on the App Store">
              <i class="fab fa-apple"></i>
              <span class="store-badge-text">
                <span class="store-badge-small">Download on the</span>
                <span class="store-badge-big">App Store</span>
              </span>
            </a>` : ''}
          ${s.playStore ? `
            <a href="${s.playStore}" target="_blank" rel="noopener noreferrer" class="store-badge store-badge--google" aria-label="Get it on Google Play">
              <i class="fab fa-google-play"></i>
              <span class="store-badge-text">
                <span class="store-badge-small">Get it on</span>
                <span class="store-badge-big">Google Play</span>
              </span>
            </a>` : ''}
        </div>` : ''}
      ${s.tech && s.tech.length ? `
        <div class="showcase-tech">
          ${s.tech.map((t) => `<span class="tech">${t}</span>`).join('')}
        </div>` : ''}
      <div class="phone-gallery" id="${s.id}" data-accent="${s.accent}"></div>
    </div>`;
  };

  wrap.innerHTML = showcaseCategories
    .map((cat) => {
      const apps = showcases.filter((s) => s.category === cat.id);
      if (!apps.length) return '';
      return `
        <div class="showcase-category" data-cat="${cat.id}">
          <div class="showcase-category-head reveal">
            <span class="category-eyebrow">${cat.eyebrow}</span>
            <h3 class="category-title">
              <i class="${cat.icon}"></i>
              <span class="gradient-text">${cat.label}</span>
              <span class="category-count">${apps.length} ${apps.length === 1 ? 'app' : 'apps'}</span>
            </h3>
          </div>
          ${apps.map(cardHtml).join('')}
        </div>`;
    })
    .join('');

  // Defer phone gallery population — only build the DOM (and trigger image loads)
  // when each gallery scrolls within 600px of the viewport. Cuts initial render
  // time dramatically when there are many showcases.
  const supportsIO = 'IntersectionObserver' in window;

  const buildOne = (s) => {
    const list = screenshotMap[s.screenshots] || [];
    const gallery = document.getElementById(s.id);
    if (!gallery || gallery.dataset.populated === '1') return;
    const cat = showcaseCategories.find((c) => c.id === s.category);
    const phoneStyle = cat ? cat.phoneStyle : 'ios';
    populatePhoneGallery(gallery, list, s.accent, phoneStyle);
    gallery.dataset.populated = '1';
  };

  if (!supportsIO) {
    showcases.forEach(buildOne);
    return;
  }

  // Eagerly build the first showcase per category so the page never feels empty.
  const eagerIds = new Set();
  showcaseCategories.forEach((cat) => {
    const first = showcases.find((s) => s.category === cat.id);
    if (first) eagerIds.add(first.id);
  });

  showcases.forEach((s) => {
    if (eagerIds.has(s.id)) {
      buildOne(s);
      return;
    }
    const gallery = document.getElementById(s.id);
    if (!gallery) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          buildOne(s);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '600px 0px' }
    );
    io.observe(gallery);
  });
}

/* ----- Build a single phone gallery ----- */
function populatePhoneGallery(gallery, items, accent, phoneStyle = 'ios') {
  const styleClass = phoneStyle === 'android' ? 'phone--android' : 'phone--ios';
  gallery.innerHTML = items
    .map(
      (item, i) => `
    <article class="phone ${styleClass} stagger-child" style="--i:${i}" data-index="${i}">
      <div class="phone-frame">
        <div class="phone-aura" aria-hidden="true"></div>
        <div class="phone-shine" aria-hidden="true"></div>
        <div class="phone-notch" aria-hidden="true"></div>
        <div class="phone-screen">
          <img
            src="./assets/images/${item.file}?v=2"
            alt="${item.caption}"
            decoding="async"
            loading="lazy"
            onerror="this.onerror=null; this.style.display='none'; this.parentElement.querySelector('.phone-screen-fallback').style.display='flex'; console.warn('Image failed:', this.getAttribute('src'));"
          />
          <div class="phone-screen-fallback" aria-hidden="true">
            <i class="fas fa-image"></i>
            <span>${item.file}</span>
          </div>
          <div class="phone-screen-glare" aria-hidden="true"></div>
          <div class="phone-screen-overlay" aria-hidden="true"></div>
        </div>
        <div class="phone-side phone-side--volume" aria-hidden="true"></div>
        <div class="phone-side phone-side--power" aria-hidden="true"></div>
      </div>
    </article>`
    )
    .join('');

  attachPhoneTilt(gallery);
}

/* ----- 3D tilt + cursor parallax for each phone ----- */
function attachPhoneTilt(gallery) {
  const phones = gallery.querySelectorAll('.phone');
  phones.forEach((phone) => {
    const frame = phone.querySelector('.phone-frame');
    const screen = phone.querySelector('.phone-screen img');
    const glare = phone.querySelector('.phone-screen-glare');

    let raf = null;

    phone.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = phone.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotY = (px - 0.5) * 22;
        const rotX = (0.5 - py) * 22;

        frame.style.transform =
          `translateZ(0) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
        if (screen) {
          screen.style.transform = `translate(${(px - 0.5) * -10}px, ${(py - 0.5) * -10}px) scale(1.08)`;
        }
        if (glare) {
          glare.style.background =
            `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), transparent 55%)`;
          glare.style.opacity = '1';
        }
      });
    });

    phone.addEventListener('mouseleave', () => {
      if (raf) cancelAnimationFrame(raf);
      frame.style.transform = '';
      if (screen) screen.style.transform = '';
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  });
}

/* ----- Skills — grouped cards with animated proficiency bars ----- */

// Inline SVGs for icons that aren't in free Font Awesome (Flutter, Dart, etc.)
const SKILL_SVGS = {
  flutter: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.014 11.072L7.857 17.53l6.457 6.47H21.684L15.214 17.53z"/></svg>`
};

const renderSkillIcon = (icon) => {
  if (icon && icon.startsWith('svg:')) {
    const key = icon.slice(4);
    return SKILL_SVGS[key] || '';
  }
  return `<i class="${icon}" aria-hidden="true"></i>`;
};

export function buildSkills() {
  const wrap = document.getElementById('skillsGroups');
  if (!wrap) return;

  wrap.innerHTML = skillGroups
    .map(
      (group, gi) => `
      <div class="skill-group stagger-child" style="--i:${gi}">
        <h3 class="skill-group-title">${group.label}</h3>
        <div class="skill-list">
          ${group.items
            .map(
              (s) => `
            <div class="skill-row">
              <div class="skill-row-head">
                <span class="skill-name">${renderSkillIcon(s.icon)}${s.name}</span>
                <span class="skill-pct">${s.level}%</span>
              </div>
              <div class="skill-bar"><span class="skill-bar-fill" data-level="${s.level}"></span></div>
            </div>`
            )
            .join('')}
        </div>
      </div>`
    )
    .join('');

  // Animate bars when the skills section enters the viewport
  const bars = wrap.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  if (!('IntersectionObserver' in window)) {
    bars.forEach((b) => (b.style.width = `${b.dataset.level}%`));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = `${entry.target.dataset.level}%`;
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach((b) => io.observe(b));
}

/* ----- Projects grid (only shows apps that don't have a screenshot showcase) ----- */
export function buildProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const showcaseTitles = new Set(showcases.map((s) => s.title));
  const otherProjects = projects.filter((p) => !showcaseTitles.has(p.title));

  if (!otherProjects.length) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = otherProjects
    .map(
      (p, i) => `
    <div class="project-card stagger-child" style="--i:${i}">
      ${p.live ? `<span class="project-live"><span class="dot"></span>Live</span>` : ''}
      <span class="spotlight"></span>
      <div class="project-icon"><i class="${p.icon}"></i></div>
      <h3 class="project-title">${p.title}</h3>
      <p>${p.description}</p>
      <div class="tech-stack">
        ${p.tech.map((t) => `<span class="tech">${t}</span>`).join('')}
      </div>
    </div>`
    )
    .join('');

  // Spotlight + magnetic tilt follows cursor
  grid.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      const rotY = ((x / rect.width) - 0.5) * 8;
      const rotX = (0.5 - (y / rect.height)) * 8;
      card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ----- Experience timeline ----- */
export function buildExperience() {
  const timeline = document.getElementById('expTimeline');
  if (!timeline) return;

  timeline.innerHTML = experience
    .map(
      (e, i) => `
    <div class="exp-card stagger-child" style="--i:${i}">
      <div class="exp-header">
        <h3><i class="${e.icon}"></i> ${e.title}</h3>
        <span class="exp-tag">${e.tag}</span>
      </div>
      <p>${e.description}</p>
    </div>`
    )
    .join('');
}

/* ----- Education timeline (newest first) ----- */
export function buildEducation() {
  const timeline = document.getElementById('eduTimeline');
  if (!timeline) return;

  timeline.innerHTML = education
    .map(
      (e, i) => `
    <div class="exp-card stagger-child" style="--i:${i}">
      <div class="exp-header">
        <h3><i class="${e.icon}"></i> ${e.degree}</h3>
        <span class="exp-tag">${e.period}</span>
      </div>
      <p class="edu-school">${e.school}</p>
      ${e.note ? `<p class="edu-note">${e.note}</p>` : ''}
    </div>`
    )
    .join('');
}

/* ----- Brands marquee — auto-scrolling logo row, each card jumps to its showcase ----- */
export function buildBrands() {
  const track = document.getElementById('brandsTrack');
  if (!track) return;

  // Render each brand as an anchor; duplicate the full set for a seamless loop.
  // Encode the filename so spaces / parens / special chars in logo names work.
  const cardHtml = (b) => `
    <a class="brand-card" href="#projects" data-target="${b.app || ''}" title="Open ${b.name}" aria-label="Open ${b.name}">
      <img
        src="./assets/images/${encodeURIComponent(b.logo)}?v=1"
        alt="${b.name}"
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <span class="brand-fallback" aria-hidden="true">${b.name}</span>
    </a>`;

  track.innerHTML = [...brands, ...brands].map(cardHtml).join('');

  // Click → smooth-scroll to that app's showcase card and pulse-highlight it.
  track.addEventListener('click', (e) => {
    const card = e.target.closest('.brand-card[data-target]');
    if (!card) return;
    const slug = card.dataset.target;
    if (!slug) return;
    const target = document.querySelector(`.screenshot-showcase[data-app="${slug}"]`);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Brief highlight pulse so the user can spot which app they jumped to.
    target.classList.remove('is-pulsing');
    void target.offsetWidth; // restart animation
    target.classList.add('is-pulsing');
    setTimeout(() => target.classList.remove('is-pulsing'), 1600);
  });
}

/* ----- Why Me grid ----- */
export function buildWhyMe() {
  const grid = document.getElementById('whyMeGrid');
  if (!grid) return;

  grid.innerHTML = whyMe
    .map(
      (w, i) => `
    <div class="why-card stagger-child" style="--i:${i}">
      <div class="why-icon"><i class="${w.icon}"></i></div>
      <h3 class="why-title">${w.title}</h3>
      <p class="why-desc">${w.description}</p>
    </div>`
    )
    .join('');
}

/* ----- Services grid ----- */
export function buildServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  grid.innerHTML = services
    .map(
      (s, i) => `
    <div class="service-card stagger-child" style="--i:${i}">
      <span class="spotlight"></span>
      <div class="service-icon">${renderSkillIcon(s.icon)}</div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.description}</p>
    </div>`
    )
    .join('');

  grid.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });
}

/* ----- Work process steps ----- */
export function buildProcess() {
  const wrap = document.getElementById('processList');
  if (!wrap) return;

  wrap.innerHTML = process
    .map(
      (p, i) => `
    <div class="process-step stagger-child" style="--i:${i}">
      <span class="process-num">${String(i + 1).padStart(2, '0')}</span>
      <div class="process-icon"><i class="${p.icon}"></i></div>
      <h3 class="process-title">${p.title}</h3>
      <p class="process-desc">${p.description}</p>
    </div>`
    )
    .join('');
}

/* ----- Hero stats ----- */
export function buildStats() {
  const wrap = document.getElementById('heroStats');
  if (!wrap) return;

  wrap.innerHTML = stats
    .map(
      (s) => `
    <div class="stat">
      <div class="stat-num" data-target="${s.num}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="stat-label">${s.label}</div>
    </div>`
    )
    .join('');
}
