import test from 'node:test';
import assert from 'node:assert/strict';

test('motion resets observers between pages and respects preference changes and fallbacks', async () => {
  const listeners = {};
  const preference = { matches: false, addEventListener: (_, cb) => { listeners.preference = cb; } };
  const classes = new Set();
  const element = { classList: { add: x => classes.add(x), remove: x => classes.delete(x) }, style: { setProperty() {}, removeProperty() {} }, matches: () => true };
  element.parentElement = { children: [element] };
  const main = { querySelector: () => element, querySelectorAll: () => [element] };
  const observers = [];
  globalThis.window = { matchMedia: () => preference, scrollY: 0, addEventListener() {}, IntersectionObserver: true };
  globalThis.document = { querySelector: () => ({ classList: { toggle() {} } }), addEventListener() {} };
  globalThis.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    unobserve() {}
    disconnect() { this.disconnected = true; }
  };
  const { setupMotion, changePage } = await import('../src/motion.js');
  setupMotion(main);
  assert.ok(classes.has('reveal'));
  setupMotion(main);
  assert.equal(observers[0].disconnected, true);
  observers[1].callback([{ isIntersecting: true, target: element }]);
  assert.ok(classes.has('is-visible'));
  let renders = 0;
  changePage(() => renders++);
  assert.equal(renders, 1, 'unsupported View Transitions render immediately');
  let skips = 0;
  document.startViewTransition = callback => {
    callback();
    return { skipTransition() { skips++; }, finished: Promise.resolve() };
  };
  changePage(() => renders++);
  changePage(() => renders++);
  assert.equal(skips, 1, 'rapid navigation skips prior animation');
  preference.matches = true;
  listeners.preference();
  assert.equal(observers[1].disconnected, true);
  assert.ok(!classes.has('hero-enter'));
  setupMotion(main);
  assert.equal(observers.length, 2, 'reduced motion does not hide or observe content');
  changePage(() => renders++);
  assert.equal(renders, 4);
});
