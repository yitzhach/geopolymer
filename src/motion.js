// Progressive enhancement: content remains readable without motion or browser APIs.
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer;
let activeTransition;
let currentMain;
let frame = 0;
const header = document.querySelector('header');

function updateScroll() {
  frame = 0;
  const hero = currentMain?.querySelector('.visual-hero');
  // A fixed threshold avoids feedback as the header itself becomes smaller.
  header.classList.toggle('is-compact', window.scrollY > 96);
  if (hero && !preference.matches) {
    hero.style.setProperty('--hero-drift', `${Math.min(window.scrollY * 0.045, 24)}px`);
  }
}
window.addEventListener('scroll', () => {
  if (!frame) frame = requestAnimationFrame(updateScroll);
}, { passive: true });

export function setupMotion(main) {
  observer?.disconnect();
  currentMain = main;
  updateScroll();
  if (preference.matches) return;
  main.querySelector('.visual-hero')?.classList.add('hero-enter');
  if (!('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  main.querySelectorAll('.section-title, .page-intro > *, .grid > *, .entry-grid > a, .research-row, .classroom-feature, .artist-feature').forEach(element => {
    const siblings = [...element.parentElement.children];
    const stagger = element.matches('.grid > *, .entry-grid > a, .page-intro > *');
    element.style.setProperty('--reveal-delay', `${stagger ? Math.min(siblings.indexOf(element), 3) * 70 : 0}ms`);
    element.classList.add('reveal');
    observer.observe(element);
  });
}

// Keyboard navigation never leaves a focused link hidden behind a reveal.
document.addEventListener('focusin', event => {
  event.target.closest?.('.reveal')?.classList.add('is-visible');
});
preference.addEventListener('change', () => {
  observer?.disconnect();
  activeTransition?.skipTransition();
  currentMain?.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  currentMain?.querySelector('.hero-enter')?.classList.remove('hero-enter');
  currentMain?.querySelector('.visual-hero')?.style.removeProperty('--hero-drift');
});

export function changePage(render) {
  activeTransition?.skipTransition();
  if (preference.matches || !document.startViewTransition) {
    render();
    return;
  }
  // The old snapshot must contain visible content, even during rapid navigation.
  const transition = document.startViewTransition(render);
  activeTransition = transition;
  transition.finished.catch(() => {}).finally(() => {
    if (activeTransition === transition) activeTransition = null;
  });
}
