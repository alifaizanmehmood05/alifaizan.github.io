/* ============================================
   PROJECTS.JS — Renders projects, screenshots, skills
   ============================================ */

import {
  screenshotData,
  sudokuScreenshots,
  aiTutorScreenshots,
  dualSpaceScreenshots,
  showcases,
  skills,
  projects,
  experience,
  stats
} from './data.js';

const screenshotMap = {
  screenshotData,
  sudokuScreenshots,
  aiTutorScreenshots,
  dualSpaceScreenshots
};

/* ----- App showcases (FutureBaby + Sudoku + AI Tutor) ----- */
export function buildShowcases() {
  const wrap = document.getElementById('showcasesWrap');
  if (!wrap) return;

  wrap.innerHTML = showcases
    .map(
      (s) => `
    <div class="screenshot-showcase reveal" data-app="${s.app}" data-accent="${s.accent}">
      <div class="showcase-glow" aria-hidden="true"></div>
      <div class="showcase-title">
        <i class="${s.icon}"></i>
        <span class="gradient-text">${s.title}</span>
        <i class="${s.iconRight}"></i>
      </div>
      <div class="showcase-subtitle">
        <span class="live-pill pill-${s.pill.color}">
          <span class="dot"></span>${s.pill.text}
        </span>
        ${s.subtitle}
      </div>
      <div class="phone-gallery" id="${s.id}" data-accent="${s.accent}"></div>
      <div class="scroll-hint">
        <i class="fas fa-arrow-left"></i>
        Hover &amp; scroll horizontally
        <i class="fas fa-arrow-right"></i>
      </div>
    </div>`
    )
    .join('');

  showcases.forEach((s) => {
    const list = screenshotMap[s.screenshots] || [];
    const gallery = document.getElementById(s.id);
    if (!gallery) return;
    populatePhoneGallery(gallery, list, s.accent);
  });
}

/* ----- Build a single phone gallery ----- */
function populatePhoneGallery(gallery, items, accent) {
  gallery.innerHTML = items
    .map(
      (item, i) => `
    <article class="phone stagger-child" style="--i:${i}" data-index="${i}">
      <div class="phone-frame">
        <div class="phone-aura" aria-hidden="true"></div>
        <div class="phone-shine" aria-hidden="true"></div>
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <img
            src="./assets/images/${item.file}?v=2"
            alt="${item.caption}"
            decoding="async"
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
      <div class="phone-caption">
        <span class="phone-caption-num">0${i + 1}</span>
        <span class="phone-caption-text">${item.caption}</span>
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

/* ----- Skills marquee ----- */
export function buildSkills() {
  const track = document.getElementById('skillsTrack');
  if (!track) return;

  // Duplicate for seamless infinite loop
  const html = [...skills, ...skills]
    .map(
      (s) => `
      <span class="skill-tag">
        <i class="${s.icon}"></i>
        ${s.name}
      </span>`
    )
    .join('');
  track.innerHTML = html;
}

/* ----- Projects grid ----- */
export function buildProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = projects
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
