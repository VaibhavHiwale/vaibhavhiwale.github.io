/* ================================================================
   VAIBHAV HIWALE — Personal Website
   assets/js/main.js
   ================================================================

   What this file does:
   1. Navbar  — shrinks + adds shadow after the user scrolls 60 px
   2. Scroll-to-top button — appears after 300 px of scrolling

   Bootstrap 5 (loaded from CDN) handles:
   - Navbar collapse / hamburger toggle
   - Dropdown menus (Blog submenu)

   To add new behaviour, write a new clearly labelled section below.
   ================================================================ */


/* ── 1. NAVBAR SCROLL EFFECT ──────────────────────────────────
   Adds the CSS class "scrolled" to the navbar element.
   The visual style for .scrolled is defined in assets/css/style.css
   under section 3 (Navigation Bar).
   ──────────────────────────────────────────────────────────── */
const navbar = document.getElementById('main-navbar');

if (navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}


/* ── 2. SCROLL-TO-TOP BUTTON ──────────────────────────────────
   The button element lives at the bottom of every HTML page.
   Its style is defined in assets/css/style.css under section 17.
   The class "visible" makes it appear (opacity + visibility).
   ──────────────────────────────────────────────────────────── */
const scrollBtn = document.getElementById('scroll-to-top');

if (scrollBtn) {
  /* Show or hide the button depending on scroll position */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  /* Scroll back to the top when clicked */
  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ── 3. DARK / LIGHT MODE TOGGLE ──────────────────────────────
   Default theme is dark. Preference is saved to localStorage.
   An inline script in each page's <head> applies the saved theme
   before first paint, preventing any flash of unstyled content.
   ──────────────────────────────────────────────────────────── */
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* Sync toggle icon with the theme applied by the inline <head> script */
(function () {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = current === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  }
}());


/* ── 4. AOS (ANIMATE ON SCROLL) ──────────────────────────────────
   AOS library is loaded via CDN on pages that use it.
   init() is called only when the library is present.
   ──────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 650, once: true, offset: 60, easing: 'ease-out-cubic' });
  }
});


/* ── 5. READING TIME & SCROLL PROGRESS BAR ────────────────────────
   Runs on article pages that include .article-body,
   #reading-time, and #reading-progress elements.
   ──────────────────────────────────────────────────────────────── */
(function () {
  const articleBody = document.querySelector('.article-body');
  const readingTimeEl = document.getElementById('reading-time');
  const progressBar  = document.getElementById('reading-progress');

  if (articleBody && readingTimeEl) {
    const words   = (articleBody.innerText || '').trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    readingTimeEl.textContent = minutes + ' min read';
  }

  if (progressBar && articleBody) {
    window.addEventListener('scroll', function () {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = Math.min(pct, 100) + '%';
    });
  }
}());


/* ── 6. BIBTEX COPY BUTTONS ───────────────────────────────────────
   Each .pub-copy-btn button carries a data-bibtex attribute.
   Clicking copies the citation to the clipboard.
   ──────────────────────────────────────────────────────────────── */
document.querySelectorAll('.pub-copy-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const text = btn.getAttribute('data-bibtex');
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      btn.classList.add('copied');
      const icon  = btn.querySelector('i');
      const label = btn.querySelector('span');
      if (icon)  icon.className    = 'bi bi-check2';
      if (label) label.textContent = 'Copied!';
      setTimeout(function () {
        btn.classList.remove('copied');
        if (icon)  icon.className    = 'bi bi-clipboard';
        if (label) label.textContent = 'Copy BibTeX';
      }, 2200);
    });
  });
});


/* ── 7. TYPED.JS HERO ANIMATION ──────────────────────────────────
   Typed.js CDN is added only on index.html.
   Cycles through professional role titles in the hero label.
   ──────────────────────────────────────────────────────────────── */
if (typeof Typed !== 'undefined' && document.getElementById('typed-roles')) {
  new Typed('#typed-roles', {
    strings: [
      'CFD Engineer',
      'Solver Developer',
      'ML‑CFD Specialist',
      'Independent Consultant',
    ],
    typeSpeed:  55,
    backSpeed:  30,
    backDelay:  1800,
    loop:       true,
    smartBackspace: true,
  });
}


/* ── 8. MOBILE NAVBAR AUTO-CLOSE ──────────────────────────────────
   Bootstrap 5 does not close the collapsed navbar when a nav link
   or the theme toggle is tapped on mobile. This fixes both.
   ──────────────────────────────────────────────────────────────── */
function closeNavbarIfOpen() {
  var navbarNav = document.getElementById('navbarNav');
  if (navbarNav && navbarNav.classList.contains('show')) {
    bootstrap.Collapse.getOrCreateInstance(navbarNav).hide();
  }
}

/* Close on any nav link tap */
document.querySelectorAll('#navbarNav .nav-link').forEach(function (link) {
  link.addEventListener('click', closeNavbarIfOpen);
});

/* Close when theme toggle is tapped */
var themeToggleEl = document.getElementById('theme-toggle');
if (themeToggleEl) {
  themeToggleEl.addEventListener('click', closeNavbarIfOpen);
}
