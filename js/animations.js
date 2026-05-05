/* ============================================
   ANIMATIONS.JS — Scroll reveals, typewriter,
   counters, scroll progress
   ============================================ */

import { typewriterPhrases } from './data.js';

/* ----- Scroll-reveal via IntersectionObserver ----- */
export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
  if (!targets.length) return;

  // Fallback for browsers without IO (or if it never fires) — show everything.
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    // threshold 0 = trigger as soon as any pixel enters viewport.
    // rootMargin 80px = pre-load slightly before scroll reaches it.
    { threshold: 0, rootMargin: '0px 0px 80px 0px' }
  );

  targets.forEach((el) => observer.observe(el));

  // Safety net: if anything is still hidden after 1.2s (slow phones, large images
  // pushing layout), force-reveal it so content never gets stuck invisible.
  setTimeout(() => {
    targets.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  }, 1200);
}

/* ----- Typewriter rotating text ----- */
export function initTypewriter() {
  const target = document.querySelector('.typewriter-text');
  if (!target) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPING_SPEED = 75;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER_TYPED = 1600;
  const PAUSE_AFTER_DELETED = 300;

  function tick() {
    const phrase = typewriterPhrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        deleting = true;
        return setTimeout(tick, PAUSE_AFTER_TYPED);
      }
      return setTimeout(tick, TYPING_SPEED);
    }

    charIndex--;
    target.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
      return setTimeout(tick, PAUSE_AFTER_DELETED);
    }
    setTimeout(tick, DELETING_SPEED);
  }

  tick();
}

/* ----- Animated number counters ----- */
export function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ----- Scroll progress bar ----- */
export function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ----- Animated grid: spawn glowing nodes at random intersections ----- */
export function initGridFx() {
  const fx = document.getElementById('gridFx');
  if (!fx) return;

  // Skip on touch / small screens / reduced motion — constant DOM mutations are
  // the biggest CPU cost here, and there's no cursor to play off of anyway.
  const fine = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || window.innerWidth < 900 || reducedMotion) return;

  const SPACING = 50; // matches body::after grid spacing

  function spawnNode() {
    // pick a random grid intersection
    const cols = Math.floor(window.innerWidth / SPACING);
    const rows = Math.floor(window.innerHeight / SPACING);
    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);

    const node = document.createElement('span');
    node.className = 'grid-node';
    node.style.left = `${col * SPACING}px`;
    node.style.top = `${row * SPACING}px`;
    // Slight per-node tint variation between orange and white
    if (Math.random() > 0.7) {
      node.style.background = '#ffffff';
      node.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.85), 0 0 16px rgba(255, 122, 24, 0.5)';
    }
    node.style.animationDuration = `${2.4 + Math.random() * 2.4}s`;
    fx.appendChild(node);
    setTimeout(() => node.remove(), 4000);
  }

  // Pre-seed a few then keep spawning
  for (let i = 0; i < 6; i++) setTimeout(spawnNode, i * 200);
  setInterval(spawnNode, 380);
}

/* ----- Custom cursor: magnetic comet (compact) ----- */
export function initCursor() {
  const aura = document.querySelector('.cursor-aura');
  const comet = document.querySelector('.cursor-comet');
  const trail = document.getElementById('cursorTrail');
  if (!aura || !comet || !trail) return;

  const fine = window.matchMedia('(pointer: fine)').matches;
  if (!fine) {
    aura.style.display = 'none';
    return;
  }

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let prevX = mx, prevY = my;
  let lastDrop = 0;

  document.body.classList.add('has-custom-cursor');

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    const dx = mx - prevX;
    const dy = my - prevY;
    const speed = Math.hypot(dx, dy);
    const now = performance.now();

    // Drop a small ink trail when the cursor moves fast enough
    if (speed > 3 && now - lastDrop > 36) {
      lastDrop = now;
      const d = document.createElement('span');
      d.className = 'cursor-drop';
      d.style.left = `${mx - dx * 0.3}px`;
      d.style.top = `${my - dy * 0.3}px`;
      trail.appendChild(d);
      setTimeout(() => d.remove(), 560);
    }

    prevX = mx;
    prevY = my;
  }, { passive: true });

  // Snap comet to cursor (no lag — feels precise)
  function loop() {
    comet.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    requestAnimationFrame(loop);
  }
  loop();

  // Hover state on interactive elements
  const hoverSelector = 'a, button, .project-card, .phone, .skill-tag, .stat, input, textarea, .btn, .contact-cta, .badge';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) comet.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) comet.classList.remove('is-hover');
  });

  // Press → shockwave
  document.addEventListener('mousedown', (e) => {
    comet.classList.add('is-press');
    const shock = document.createElement('div');
    shock.className = 'cursor-shock';
    shock.style.left = `${e.clientX}px`;
    shock.style.top = `${e.clientY}px`;
    aura.appendChild(shock);
    setTimeout(() => shock.remove(), 560);
  });
  document.addEventListener('mouseup', () => comet.classList.remove('is-press'));

  // Hide cursor when leaving the window
  document.addEventListener('mouseleave', () => aura.classList.add('is-hidden'));
  document.addEventListener('mouseenter', () => aura.classList.remove('is-hidden'));
}

/* ----- Magnetic effect for buttons (cursor pulls them slightly) ----- */
export function initMagneticBtns() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const els = document.querySelectorAll('.btn, .contact-cta');
  els.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

/* ----- Subtle parallax on hero orbs ----- */
export function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  // Mouse-driven — meaningless on touch devices. Bail early to skip the listener.
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let ticking = false;

  function onMove(e) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 8;
        orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
      ticking = false;
    });
  }

  window.addEventListener('mousemove', onMove, { passive: true });
}
