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
