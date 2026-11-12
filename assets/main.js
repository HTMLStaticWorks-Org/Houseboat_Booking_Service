// Theme management
(function initThemeAndDirection() {
  const savedTheme = localStorage.getItem('lagoon_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  const savedDir = localStorage.getItem('lagoon_dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
  }
})();

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function updateThemeUI(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lagoon_theme', theme);
  const isDark = theme === 'dark';
  document.querySelectorAll('#theme-toggle, .nav-btn-theme').forEach(btn => {
    const icon = btn.querySelector('.theme-icon') || btn;
    icon.textContent = isDark ? '☀️' : '🌙';
    const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    btn.setAttribute('aria-label', label);
    btn.title = label;
  });
}

function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  updateThemeUI(next);
}

function getCurrentDirection() {
  return document.documentElement.getAttribute('dir') || 'ltr';
}

function updateDirectionUI(dir) {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('lagoon_dir', dir);
  const isRtl = dir === 'rtl';
  document.querySelectorAll('#rtl-toggle, .nav-btn-rtl').forEach(btn => {
    const textEl = btn.querySelector('.rtl-text') || btn.querySelector('.rtl-badge') || btn;
    textEl.textContent = isRtl ? 'LTR' : 'RTL';
    const label = isRtl ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout';
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.classList.toggle('active', isRtl);
  });
}

function toggleDirection() {
  const current = getCurrentDirection();
  const next = current === 'rtl' ? 'ltr' : 'rtl';
  updateDirectionUI(next);
}

// Mobile navigation menu toggle
function initNavToggle() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('navlinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// FAQ Accordion Dropdown
function initFaqDropdown() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    
    const toggle = () => {
      const isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    q.addEventListener('click', toggle);
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

// Back to Top Button
function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.title = 'Back to top';
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M18 15l-6-6-6 6"/></svg>`;
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 320) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Category Tabs for Packages Page
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.cat-tab-btn');
  const cards = document.querySelectorAll('.boat-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-cat') || 'all';

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-cat') || 'all';
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Password toggle with clean SVG icon
function initPasswordToggle() {
  const eyeOpenSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const eyeClosedSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    const input = document.getElementById(btn.dataset.togglePassword);
    if (!input) return;
    btn.innerHTML = eyeOpenSvg;
    btn.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.innerHTML = show ? eyeClosedSvg : eyeOpenSvg;
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });
}

// Fallback for any broken images
function initImageFallbacks() {
  const fallbackUrl = 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80';
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if (img.src !== fallbackUrl) {
        img.src = fallbackUrl;
      }
    });
  });
}

// Document ready initialization
document.addEventListener('DOMContentLoaded', () => {
  // Sync UI state for theme & direction buttons
  const theme = getCurrentTheme();
  updateThemeUI(theme);

  const dir = getCurrentDirection();
  updateDirectionUI(dir);

  // Bind theme toggles
  document.querySelectorAll('#theme-toggle, .nav-btn-theme').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Bind RTL toggles
  document.querySelectorAll('#rtl-toggle, .nav-btn-rtl').forEach(btn => {
    btn.addEventListener('click', toggleDirection);
  });

  // Init mobile nav toggle
  initNavToggle();

  // Init FAQ Accordion Dropdown
  initFaqDropdown();

  // Init Back to Top
  initBackToTop();

  // Init Category Tabs
  initCategoryTabs();

  // Init Password Toggles
  initPasswordToggle();

  // Init Image Fallbacks
  initImageFallbacks();

  // Demo form handlers
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const note = form.querySelector('.notice');
      if (note) {
        note.style.display = 'block';
        note.textContent = 'Thanks! This demo form is ready to connect to your booking backend.';
      }
    });
  });

  // Dynamic copyright year
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
