// Old links preserve query strings and stay on this origin, even for malformed paths.
export function legacyDestination(hash) {
  if (!hash.startsWith('#/')) return null;
  const url = new URL(hash.slice(1), location.origin);
  if (url.origin !== location.origin) return null;
  return url.pathname + url.search + url.hash;
}
window.addEventListener("hashchange", () => {
  const target = legacyDestination(location.hash);
  if (target) location.replace(target);
});
const destination = legacyDestination(location.hash);
if (destination) {
  location.replace(destination);
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
  menu.addEventListener('focusout', () => {
    queueMicrotask(() => {
      if (!menu.contains(document.activeElement)) { menu.open = false; sync(); }
    });
  });
  import('./app.js').then(({ enhancePage }) => enhancePage()).catch(error => {
    console.error('Interactive tools could not start', error);
    const status = document.createElement('p');
    status.className = 'callout';
    status.setAttribute('role', 'status');
    status.textContent = 'Interactive tools could not start. Reload to try again; the page content is still available.';
    document.querySelector('main').prepend(status);
  });
}
