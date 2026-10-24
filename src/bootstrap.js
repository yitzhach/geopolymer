// Old links preserve query strings and stay on this origin, even for malformed paths.
export function legacyDestination(hash) {
  if (!hash.startsWith('#/')) return null;
  const url = new URL(hash.slice(1), location.origin);
  if (url.origin !== location.origin) return null;
  return url.pathname + url.search + url.hash;
}
// Startup and hashchange can both run before navigation commits.
let legacyRedirectStarted = false;
function redirectLegacy() {
  const target = legacyDestination(location.hash);
  if (!target) return false;
  if (!legacyRedirectStarted) {
    legacyRedirectStarted = true;
    location.replace(target);
  }
  return true;
}
window.addEventListener("hashchange", redirectLegacy);
if (redirectLegacy()) {
  // Let the destination document initialize its own tools.
} else {
  // Native details remains a usable menu when JavaScript is unavailable.
  const menu = document.querySelector('#site-menu');
  const toggle = menu.querySelector('summary');
  const sync = () => toggle.setAttribute('aria-expanded', String(menu.open));
  sync();
  menu.addEventListener('toggle', sync);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      sync();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) { menu.open = false; sync(); }
  });
  menu.addEventListener('focusout', event => {
    // activeElement can temporarily be body during focusout; use the destination.
    if (event.relatedTarget && !menu.contains(event.relatedTarget)) { menu.open = false; sync(); }
  });
  import('./enhance.js').then(({ enhancePage }) => enhancePage()).catch(error => {
    console.error('Interactive tools could not start', error);
    const status = document.createElement('p');
    status.className = 'callout';
    status.setAttribute('role', 'status');
    status.textContent = 'Interactive tools could not start. Reload to try again; the page content is still available.';
    document.querySelector('main').prepend(status);
  });
  import('./research-assistant.js').then(({ mountAssistant }) => mountAssistant()).catch(error => {
    console.error('Research assistant could not start', error);
  });
}
