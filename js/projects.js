/* ============================================
   PROJECTS.JS — Renders projects, screenshots, skills
   ============================================ */

import { screenshotData, skills, projects, experience, stats } from './data.js';

/* ----- FutureBaby screenshot row ----- */
export function buildScreenshotRow() {
  const row = document.getElementById('screenshotRow');
  if (!row) return;

  row.innerHTML = '';
  screenshotData.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'screenshot-card';

    const img = document.createElement('img');
    img.src = `assets/images/${item.file}`;
    img.alt = `FutureBaby ${item.caption}`;
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      img.src = `https://placehold.co/300x500/131d23/34d399?text=${item.file}`;
    });

    const caption = document.createElement('div');
    caption.className = 'screenshot-card-caption';
    caption.textContent = item.caption;

    card.append(img, caption);
    row.appendChild(card);
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

  // Spotlight follows cursor
  grid.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
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
