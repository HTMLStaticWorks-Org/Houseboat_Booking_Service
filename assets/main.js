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

  // Password visibility toggle
  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.togglePassword);
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? '◉' : '◎';
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

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
