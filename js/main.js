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
  buildWhyMe,
  buildBrands,
  buildEducation
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
  buildEducation();
  buildStats();
  buildProcess();
  buildServices();
  buildWhyMe();
  buildBrands();

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
  // initParallax(); // disabled — hero background is now static
  // initCursor(); // disabled — using native browser cursor
  // initMagneticBtns(); // disabled — buttons no longer follow the cursor
  // initGridFx(); // disabled — no constant sparkle spawning in the background

  // Set current year in footer (if footer exists)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
