/* ============================================
   MAIN.JS — Entry point, wires everything up
   ============================================ */

import {
  buildScreenshotRow,
  buildSkills,
  buildProjects,
  buildExperience,
  buildStats
} from './projects.js';

import {
  initScrollReveal,
  initTypewriter,
  initCounters,
  initScrollProgress,
  initParallax
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
  buildScreenshotRow();
  buildSkills();
  buildProjects();
  buildExperience();
  buildStats();

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

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
