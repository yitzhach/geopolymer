// Browser entry for interactive tools. Each area loads only the modules it uses,
// so a page no longer downloads the whole catalog. app.js stays the renderer for the build.
const areaTools = {
  calculator: () => import('./gp-calculator.js').then(m => m.attachCalculator()),
  library: () => import('./research-library.js').then(m => m.attachLibrary()),
  knowledge: () => import('./knowledge-ui.js').then(m => m.attachKnowledge()),
  studies: () => import('./knowledge-ui.js').then(m => m.attachKnowledge()),
  journal: () => import('./journal.js').then(m => m.attachJournal()),
  formulations: () => import('./literature-ui.js').then(m => m.attachMix()),
  'deep-dives': () => import('./deep-dive-explorer.js').then(m => m.attachDeepDiveExplorer()),
  mixes: () => import('./mix-explorer-ui.js').then(m => m.attachMixExplorer()),
  discover: () => import('./platform.js').then(m => m.attachPlatform('discover')),
  workspace: () => import('./platform.js').then(m => m.attachPlatform('workspace')),
};

export async function enhancePage() {
  const main = document.querySelector("main");
  const area = location.pathname.split("/").filter(Boolean)[0];
  // The build marks the not-found page; it has no tools to start.
  if (document.querySelector('meta[name="gp-page"][content="not-found"]')) return;
  if (["shop", "search", "tools"].includes(area)) {
    const app = await import('./app.js');
    // Query-dependent views are progressive enhancements of complete base pages.
    if (location.search && area !== "tools")
      main.innerHTML = app.renderPage(location.pathname + location.search).html;
    app.attach();
  }
  await areaTools[area]?.();
  document.querySelectorAll('nav a').forEach(a => {
    if (a.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, ''))
      a.setAttribute('aria-current', 'page');
  });
  const { setupMotion } = await import('./motion.js');
  setupMotion(main);
  main.dataset.enhanced = "true";
}
