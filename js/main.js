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
  buildServices
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

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
