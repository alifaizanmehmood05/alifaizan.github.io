/* ============================================
   MAIN.JS — Entry point, wires everything up
   ============================================ */

import {
  buildShowcases,
  buildSkills,
  buildProjects,
  buildExperience,
  buildStats,
  buildProcess,
  buildServices,
  buildWhyMe
} from './projects.js';

import {
  initScrollReveal,
  initTypewriter,
  initCounters,
  initScrollProgress,
  initParallax,
  initCursor,
  initMagneticBtns,
  initGridFx
} from './animations.js';

import {
  initSmoothScroll,
  initNavbarScroll,
  initActiveLink,
  initMobileMenu,
  initHireMe
} from './navigation.js';

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  // Render dynamic content first
  buildShowcases();
  buildSkills();
  buildProjects();
  buildExperience();
  buildStats();
  buildProcess();
  buildServices();
  buildWhyMe();

  // Wire navigation
  initSmoothScroll();
  initNavbarScroll();
  initActiveLink();
  initMobileMenu();
  initHireMe();

  // Animations / effects
  initScrollProgress();
  initScrollReveal();
  initTypewriter();
  initCounters();
  initParallax();
  initCursor();
  initMagneticBtns();
  initGridFx();

  // Set current year in footer (if footer exists)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hide the page loader on the next frame so the user sees content immediately.
  // Use rAF + a small delay so the first paint of real content lands first.
  const loader = document.getElementById('pageLoader');
  if (loader) {
    requestAnimationFrame(() => {
      setTimeout(() => loader.classList.add('is-hidden'), 200);
    });
  }
});
