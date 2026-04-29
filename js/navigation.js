/* ============================================
   NAVIGATION.JS — Smooth scroll, navbar shadow,
   active link highlight, mobile menu
   ============================================ */

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Close mobile nav if open
      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });
}

export function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

export function initActiveLink() {
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(links)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`)
          );
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ----- Toast helper ----- */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const msg = toast.querySelector('.toast-msg');
  if (msg) msg.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ----- Hire Me / mailto fallback -----
   Triggers the mailto link, AND copies the email to the
   clipboard so users without a default mail client can
   still grab the address. */
export function initHireMe() {
  const buttons = document.querySelectorAll('a[data-email], a[href^="mailto:"]');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const email =
        btn.dataset.email ||
        (btn.getAttribute('href') || '').replace(/^mailto:/, '').split('?')[0];
      if (!email) return;

      // Let the browser try to open the user's mail client (don't preventDefault)
      // Then, in the background, copy the address as a fallback.
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
          showToast(`Email copied: ${email}`);
        }
      } catch {
        /* clipboard blocked — that's fine, mailto still fires */
      }
    });
  });
}

export function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!links.classList.contains('open')) return;
    if (links.contains(e.target) || toggle.contains(e.target)) return;
    links.classList.remove('open');
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    toggle.setAttribute('aria-expanded', 'false');
  });
}
