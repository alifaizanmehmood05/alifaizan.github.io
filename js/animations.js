/* ============================================
   ANIMATIONS.JS — Scroll reveals, typewriter,
   counters, scroll progress
   ============================================ */

import { typewriterPhrases } from './data.js';

/* ----- Scroll-reveal via IntersectionObserver ----- */
export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
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

/* ----- Subtle parallax on hero orbs ----- */
export function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

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
