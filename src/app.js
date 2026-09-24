import {
  materials,
  papers,
  grades,
  formulations,
  products,
  evidenceLabels,
  demoIngredients,
  search,
} from "./data.js";
import { scaleBatch } from "./scaler.js";
const main = document.querySelector("main");
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const link = (href, label, cls = "text-link") =>
  `<a class="${cls}" href="${href}">${label} <span aria-hidden="true">↗</span></a>`;
const badge = (label, cls = "") => `<span class="badge ${cls}">${label}</span>`;
const crumb = (area, path) =>
  `<div class="breadcrumb"><a href="#/">Home</a> / <a href="${path}">${area}</a></div>`;
const intro = (kicker, title, body) =>
  `<section class="page-intro"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p class="lede">${body}</p></section>`;
const table = (rows) =>
  `<dl class="facts">${rows.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>`;
const list = (items) =>
  `<ul class="plain-list">${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
const materialCard = (m) =>
  `<a class="material-card" href="#/materials/${m.id}"><div class="card-top"><span class="eyebrow">${m.category}</span><span aria-hidden="true">↗</span></div><div class="material-symbol" aria-hidden="true">${m.id === "metakaolin" ? "MK" : "Si"}<span>${m.role}</span></div><h3>${m.title}</h3><p>${m.summary}</p><span class="card-bottom">${m.gradeIds.length} grade records · ${m.paperIds.length} research connection</span></a>`;
const productCard = (p) =>
  `<a class="product-card" href="#/shop/${p.id}"><div class="card-top">${badge("Proposed · not available", "amber")}<span aria-hidden="true">↗</span></div><p class="eyebrow">${p.category}</p><h3>${p.title}</h3><p>${p.summary}</p><div class="product-bottom"><span>${p.targetPrice ? `<strong>$${p.targetPrice}</strong> target price` : "Price undecided"}</span><span>${p.id === "classroom-kit" ? "12 students" : "Concept preview"}</span></div></a>`;
const researchRow = (p) =>
  `<a class="research-row" href="#/research/${p.id}"><span class="year">${p.year}</span><div><p class="eyebrow">Technical paper · publisher summary</p><h3>${p.title}</h3><p>${p.authors}</p></div><span aria-hidden="true">↗</span></a>`;
function home() {
  return `<section class="home-hero"><div><p class="eyebrow">THE GEOPOLYMER KNOWLEDGE & MATERIALS PLATFORM</p><h1>From material<br>to possibility.</h1><p class="lede">Understand the science. Explore formulations.<br class="desktop"> Find the materials for your next experiment.</p><div class="actions">${link("#/materials", "Explore materials", "button")}${link("#/shop", "Discover kit concepts", "button secondary")}</div><p class="hero-note">For curious makers, classrooms and material innovators.</p></div><aside class="journey-panel"><div class="panel-heading"><span class="eyebrow">FOLLOW A MATERIAL</span><span>01 / MK</span></div><h2>Metakaolin</h2><p>One material. Connected knowledge.</p><a href="#/materials/metakaolin"><span>01</span><div><strong>Understand the material</strong><small>Families, grades and specifications</small></div><span>↗</span></a><a href="#/research/mk-testing-2019"><span>02</span><div><strong>Follow the evidence</strong><small>A published grade comparison</small></div><span>↗</span></a><a href="#/formulations/metakaolin-comparison"><span>03</span><div><strong>Explore the method</strong><small>Reported conditions and open questions</small></div><span>↗</span></a><a href="#/shop/starter-kit"><span>04</span><div><strong>Preview a kit concept</strong><small>Qualification comes before availability</small></div><span>↗</span></a></aside></section><section class="entry-grid" aria-label="Choose your starting point"><a href="#/learn/beginners"><span class="eyebrow">START CURIOUS</span><h3>Your first experiment <span>↗</span></h3><p>A clear path through materials, methods and evidence.</p></a><a href="#/learn/educators"><span class="eyebrow">BRING IT TO CLASS</span><h3>For educators <span>↗</span></h3><p>Explore the proposed six-workstation classroom kit.</p></a><a href="#/research"><span class="eyebrow">GO DEEPER</span><h3>Research & development <span>↗</span></h3><p>Trace a method back to its source and exact grade.</p></a></section><section class="section"><div class="section-title"><div><p class="eyebrow">THE MATERIAL LIBRARY</p><h2>Start with the building blocks.</h2></div>${link("#/materials", "All materials")}</div><div class="grid two">${materials.map(materialCard).join("")}</div></section><section class="section"><div class="section-title"><div><p class="eyebrow">LEARNING THROUGH MAKING</p><h2>Small experiments. Better questions.</h2></div>${link("#/shop", "Explore proposed kits")}</div><div class="grid three">${products.slice(0, 3).map(productCard).join("")}</div></section><section class="evidence-band"><div><p class="eyebrow">EVIDENCE BEFORE CLAIMS</p><h2>Know what has actually been tested.</h2><p>A published result, an internal reproduction and an independent test tell different stories. We keep them separate.</p></div>${link("#/evidence", "Our evidence standards", "button secondary")}</section>`;
}
function materialIndex() {
  return (
    intro(
      "MATERIAL LIBRARY",
      "Know your starting point.",
      "Explore material families, then follow their grades, source references and proposed products.",
    ) +
    `<div class="grid two">${materials.map(materialCard).join("")}</div><div class="callout">A material family is not a supplier specification. Exact grades, lots and compatibility need to be established for each experiment.</div>`
  );
}
function materialDetail(m) {
  const gs = grades.filter((g) => m.gradeIds.includes(g.id));
  return (
    crumb("Materials", "#/materials") +
    intro(`${m.category} / material record`, m.title, m.summary) +
    `<div class="detail-grid"><div><h2>Grade records</h2><p>Published examples and proposed sourcing records are kept separate.</p>${gs
      .map(
        (g) =>
          `<article class="record"><h3>${g.title}</h3>${badge(g.sourceId ? "Literature reference" : "Proposed grade", g.sourceId ? "" : "amber")}<p>${g.status}</p>${table(
            [
              ["Supplier qualification", "Not completed"],
              ["Lot / COA", "Not available"],
              [
                "Source",
                g.sourceId
                  ? link("#/research/" + g.sourceId, "Published comparison")
                  : "Awaiting selection",
              ],
            ],
          )}</article>`,
      )
      .join("")}<h2>Related research</h2>${papers
      .filter((p) => m.paperIds.includes(p.id))
      .map(researchRow)
      .join(
        "",
      )}<h2>Connected method</h2>${link("#/formulations/metakaolin-comparison", "Compare metakaolin grades")}<h2>Specification checklist</h2>${list(m.id === "metakaolin" ? ["Composition, particle size and variability need a grade-specific source.", "Record supplier, grade and lot for every trial.", "Generic material similarity does not establish interchangeability."] : ["Record cation, concentration, density and modulus with their definitions.", "Track solution solids and water separately when a reviewed formulation requires it.", "No concentration or compatibility is specified for the proposed activator."])}</div><aside class="side-panel"><p class="eyebrow">CONNECTED CATALOG</p><h2>Explore product concepts</h2>${products
      .filter((p) => m.productIds.includes(p.id))
      .map(
        (p) =>
          `<a class="side-link" href="#/shop/${p.id}"><strong>${p.title}</strong><span>Proposed · not available ↗</span></a>`,
      )
      .join(
        "",
      )}<p class="small">No supplier grade is qualified for sale. SDS, TDS and lot documents will be linked when established.</p></aside></div>`
  );
}
function researchIndex() {
  return (
    intro(
      "RESEARCH LIBRARY",
      "Go back to the source.",
      "Read the evidence, understand its limits and trace the connection to materials and methods.",
    ) +
    papers.map(researchRow).join("") +
    `<div class="callout">This first prototype contains one source record. Published findings do not validate the platform’s proposed products.</div>`
  );
}
function researchDetail(p) {
  return (
    crumb("Research", "#/research") +
    intro("TECHNICAL PAPER / 2019", p.title, p.authors) +
    `<div class="detail-grid"><article>${badge("Literature-reported")}<h2>What the source covers</h2><p>${p.summary}</p><h2>Reported method</h2><p>The publisher describes sodium and potassium silicate solutions with MR = 1.7 and hardening at 80 °C. Time to peak temperature is used to compare the eleven commercial samples. The modulus definition and complete method must be checked in the full paper before use.</p><h2>Editorial interpretation</h2><p>This is a useful entry point for asking whether a proposed precursor grade has been characterized for the intended system. It is not a purchasing recommendation or a substitute for a reviewed experiment.</p><h2>Limits of this record</h2><p>${p.limitation}</p>${table(
      [
        ["Exact ingredient masses", "Not extracted"],
        ["Specimen geometry / test procedure", "Not extracted"],
        ["Platform reproduction", "None"],
        ["Independent platform testing", "None"],
        ["Record checked", p.reviewedAt],
      ],
    )}${link(p.url, "Read publisher source", "button")}</article><aside class="side-panel"><p class="eyebrow">SOURCE RECORD</p><h3>Standardized Method in Testing Commercial Metakaolins for Geopolymer Formulations</h3>${table(
      [
        ["Publication", p.publication],
        ["Access", p.access],
        ["DOI", `<a href="https://doi.org/${p.doi}">${p.doi}</a>`],
      ],
    )}<h3>Continue exploring</h3>${link("#/materials/metakaolin", "Metakaolin material record")}${link("#/formulations/metakaolin-comparison", "Connected method record")}</aside></div>`
  );
}
function formulationIndex() {
  return (
    intro(
      "FORMULATIONS & METHODS",
      "Connect the paper to the experiment.",
      "Source-linked method records make missing information visible before work begins.",
    ) +
    `<a class="record block-link" href="#/formulations/metakaolin-comparison">${badge("Literature-reported")}<h2>Compare metakaolin grades ↗</h2><p>Published method overview · full recipe extraction pending</p></a><div class="callout">No executable chemical recipe is released in this prototype. Use the batch scaler to explore mass arithmetic with a separate illustrative example.</div>${link("#/tools", "Open batch scaler", "button")}`
  );
}
function formulationDetail(f) {
  return (
    crumb("Formulations", "#/formulations") +
    intro("METHOD RECORD / VERSION " + f.version, f.title, f.summary) +
    `<div class="detail-grid"><article>${badge(evidenceLabels[f.evidence])}<h2>Method basis</h2><p>The source reports comparing commercial metakaolin samples with silicate solutions using temperature evolution. This record identifies the method; it does not supply complete mixing or curing instructions.</p>${table(
      [
        ["Source", link("#/research/mk-testing-2019", "Technical Paper #26")],
        ["Grade examples", "Metaver SF; Argical M1200"],
        [
          "Ingredient masses / ratios",
          "Not extracted; no batch recipe released",
        ],
        ["Solution solids / water", "Not extracted"],
        [
          "Mixing / cure / specimen geometry",
          "Complete protocol pending full-paper review",
        ],
        ["Test results", "No platform results"],
        ["Substitutions", "Not qualified"],
      ],
    )}<h2>Before an executable formulation</h2>${list(["Review the full source and record exact grades and masses.", "Document ratio definitions, solution solids and water accounting.", "Establish equipment, product-specific handling and disposal requirements.", "Record reproduction and independent testing separately."])}</article><aside class="side-panel"><p class="eyebrow">BATCH PLANNING</p><h2>Explore mass scaling</h2><p>Practice proportional scaling with neutral components. The example is not this published formulation.</p>${link("#/tools", "Open arithmetic example", "button")}<h3>Related product concepts</h3><p>These concepts are linked by learning intent only. Method compatibility is not established.</p>${f.productIds.map((id) => link("#/shop/" + id, products.find((x) => x.id === id).title)).join("")}</aside></div>`
  );
}
function shop() {
  return (
    intro(
      "PROPOSED CATALOG",
      "Materials for discovery.",
      "Explore the kits and samples we are developing. Prices are design targets; products are not available to order.",
    ) +
    `<div class="grid two">${products.map(productCard).join("")}</div><div class="callout">Exact kit masses, qualified grades, supplier relationships and shipping eligibility remain open. No checkout or inventory is active.</div>`
  );
}
function productDetail(p) {
  return (
    crumb("Kits & materials", "#/shop") +
    `<div class="product-detail"><div class="product-summary"><p class="eyebrow">${p.category}</p><h1>${p.title}</h1><p class="lede">${p.summary}</p>${badge("Proposed product · not available", "amber")}<p class="pack">${p.pack}</p><div class="price">${p.targetPrice ? `$${p.targetPrice}<span>USD target price · unconfirmed</span>` : "Price undecided"}</div><p>Under development. Not available to purchase or reserve.</p>${link(p.id === "classroom-kit" ? "#/learn/educators" : "#/formulations/metakaolin-comparison", p.id === "classroom-kit" ? "Explore the educator pathway" : "Explore the connected method", "button")}</div><div><h2>Proposed contents</h2>${list(p.included)}<h2>Required separately</h2>${list(p.required)}<h2>Qualification & availability</h2>${table(
      [
        [
          "Exact grade",
          grades.find((g) => g.id === p.gradeId).title + " · unselected",
        ],
        ["Inventory", "No available stock"],
        ["SDS / TDS / COA", "Not yet established"],
        ["Compatibility", "Not validated; related method is a research lead"],
        [
          "Shipping / shelf life",
          "Undecided; no eligibility or cost established",
        ],
      ],
    )}</div></div><section class="evidence-band"><div><p class="eyebrow">UNDERSTAND THE MATERIAL</p><h2>Follow the specification.</h2><p>See the material family and why exact grades matter.</p></div>${link("#/materials/" + p.materialId, "Explore metakaolin", "button secondary")}</section>`
  );
}
function learn(audience) {
  const educator = audience === "educators";
  return (
    intro(
      "LEARN / " + (educator ? "EDUCATORS" : "START HERE"),
      educator
        ? "Bring material science into the classroom."
        : "Start with a better question.",
      educator
        ? "A proposed pathway for trained instructors and supervised older students. Age suitability and product instructions must be reviewed before release."
        : "Explore how material identity, published evidence and careful observation connect.",
    ) +
    `<div class="grid three"><article class="record"><p class="eyebrow">01 / UNDERSTAND</p><h2>Meet the material</h2><p>Start with the family. Then distinguish a named grade from a qualified product.</p>${link("#/materials/metakaolin", "Explore metakaolin")}</article><article class="record"><p class="eyebrow">02 / INVESTIGATE</p><h2>Trace the evidence</h2><p>Ask what was measured, which material was used and what information is missing.</p>${link("#/research/mk-testing-2019", "Read the source record")}</article><article class="record"><p class="eyebrow">03 / PLAN</p><h2>${educator ? "Plan six workstations" : "Preview a first experiment"}</h2><p>${educator ? "The classroom concept pairs 12 students across six stations. Chemical quantities remain undecided." : "The starter concept targets 2–3 small specimens. A qualified system comes before release."}</p>${link("#/shop/" + (educator ? "classroom-kit" : "starter-kit"), "View kit concept")}</article></div><div class="callout">${educator ? "The classroom offer is still a concept, not a ready-to-teach chemical activity." : "A published method is not automatically a suitable beginner experiment."} Product-specific equipment, handling and instructions are part of qualification.</div>${link("#/tools", "Practice with the batch mass scaler")}`
  );
}
function evidence() {
  return (
    intro(
      "EDITORIAL STANDARD",
      "Evidence has a scope.",
      "Every claim should tell you where it came from and what has actually been checked.",
    ) +
    `<div class="grid three">${[
      [
        "Literature-reported",
        "Reported by an external source. Show the source, access level and limitations. It does not mean we reproduced it.",
      ],
      [
        "Internally reproduced",
        "Repeated by the platform with a documented grade, lot, procedure and test record. No such records exist yet.",
      ],
      [
        "Independently tested",
        "Tested by an external party with a named scope, method and date. No such records exist yet.",
      ],
    ]
      .map(
        ([a, b]) =>
          `<article class="record">${badge(a)}<h2>${a}</h2><p>${b}</p></article>`,
      )
      .join(
        "",
      )}</div><div class="callout">Testing is not certification. Product concepts and arithmetic demonstrations have no performance validation.</div>`
  );
}
function toolsPage() {
  return (
    intro(
      "TOOLS / MASS ARITHMETIC",
      "A smaller batch. The same proportions.",
      "Scale an illustrative three-component batch in grams or kilograms.",
    ) +
    `<div class="scaler-grid"><form id="scaler" class="side-panel"><p class="eyebrow">REFERENCE BATCH</p><h2>1,000 g total</h2><p>Component A: 600 g<br>Component B (as supplied): 300 g<br>Component C: 100 g</p><label for="target">Target total batch mass</label><div class="input-pair"><input id="target" name="target" type="number" min="0.000001" step="any" value="1" inputmode="decimal" required><select id="unit" name="unit" aria-label="Target mass unit"><option value="kg">kg</option><option value="g">g</option></select></div><button class="button" type="submit">Calculate batch</button><p id="scale-error" class="error" role="alert"></p></form><section aria-label="Scaled batch"><div class="section-title"><h2>Your batch</h2>${badge("Arithmetic example", "amber")}</div><div id="scale-output" aria-live="polite"></div><p class="small">As-supplied mass basis: a solution’s mass includes its water. This tool does not calculate solids, added water, molar ratios, density or yield. Results are rounded for display.</p></section></div><div class="callout"><strong>This is not a chemical recipe.</strong> Components A, B and C are neutral placeholders. Scaling mass does not establish equivalent mixing, cure, performance or suitability at a different scale.</div>`
  );
}
function searchPage(params) {
  const q = params.get("q") || "";
  return (
    intro(
      "UNIFIED SEARCH",
      "Find a connection.",
      "Search materials, research, formulations, product concepts and tools.",
    ) +
    `<form id="search-form" class="search-form"><label class="sr-only" for="query">Search the platform</label><input type="search" id="query" name="q" placeholder="Try metakaolin, classroom or batch…" value="${esc(q)}"><button class="button">Search</button></form><div class="filters" role="group" aria-label="Content type">${["All", "Material", "Research", "Formulation", "Product concept", "Tool", "Guide"].map((t) => `<button type="button" data-filter="${t}" aria-pressed="${t === "All"}">${t}</button>`).join("")}</div><p id="search-count" role="status"></p><div id="results"></div>`
  );
}
function showResults(q, type) {
  const results = search(q, type);
  document.querySelector("#search-count").textContent =
    `${results.length} ${results.length === 1 ? "result" : "results"}${q.trim() ? ` for “${q.trim()}”` : ""}`;
  document.querySelector("#results").innerHTML = results.length
    ? results
        .map(
          (x) =>
            `<a class="result" href="${x.href}"><span class="eyebrow">${x.type}</span><h2>${x.title} <span>↗</span></h2><p>${x.summary}</p></a>`,
        )
        .join("")
    : `<div class="empty"><h2>No matches yet.</h2><p>Try “metakaolin”, “classroom” or “batch”, or select All to widen the search.</p></div>`;
}
function attach() {
  const form = document.querySelector("#scaler");
  if (form) {
    const calculate = () => {
      const out = document.querySelector("#scale-output"),
        err = document.querySelector("#scale-error");
      try {
        const result = scaleBatch(
          demoIngredients,
          form.elements.namedItem("target").value,
          form.elements.namedItem("unit").value,
        );
        err.textContent = "";
        form.elements.namedItem("target").removeAttribute("aria-invalid");
        const fmt = (n) =>
          n.toLocaleString("en-US", { maximumSignificantDigits: 8 });
        out.innerHTML = `<p class="batch-total">${fmt(result.grams)} <span>g total</span></p><p class="small">${fmt(result.factor)}× reference batch</p><div class="table-scroll"><table><thead><tr><th scope="col">Component</th><th scope="col">Mass %</th><th scope="col">Scaled mass (g)</th></tr></thead><tbody>${result.rows.map((r) => `<tr><th scope="row">${r.label}</th><td>${fmt(r.percent)}%</td><td>${fmt(r.grams)}</td></tr>`).join("")}</tbody></table></div>`;
      } catch (e) {
        out.innerHTML = "<p>Enter a valid mass to see the scaled batch.</p>";
        err.textContent = e.message;
        form.elements.namedItem("target").setAttribute("aria-invalid", "true");
      }
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      calculate();
    });
    form.addEventListener("input", calculate);
    form.addEventListener("change", calculate);
    calculate();
  }
  const searchForm = document.querySelector("#search-form");
  if (searchForm) {
    let type = "All";
    const q = document.querySelector("#query");
    showResults(q.value, type);
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      history.replaceState(
        null,
        "",
        `#/search?q=${encodeURIComponent(q.value)}`,
      );
      showResults(q.value, type);
    });
    q.addEventListener("input", () => showResults(q.value, type));
    document.querySelectorAll("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        type = b.dataset.filter;
        document
          .querySelectorAll("[data-filter]")
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        showResults(q.value, type);
      }),
    );
  }
}
function render(focus = true) {
  const [path, query = ""] = (location.hash.slice(1) || "/").split("?");
  const parts = path.split("/").filter(Boolean);
  const [area, id] = parts;
  let html,
    title = "Home";
  const notFound = () =>
    intro(
      "404",
      "This page is not here.",
      "Return to the material library or search the prototype.",
    ) + link("#/search", "Search the platform", "button");
  switch (area) {
    case undefined:
      html = home();
      break;
    case "materials": {
      const item = materials.find((x) => x.id === id);
      html = id ? (item ? materialDetail(item) : notFound()) : materialIndex();
      title = item?.title || "Materials";
      break;
    }
    case "research": {
      const item = papers.find((x) => x.id === id);
      html = id ? (item ? researchDetail(item) : notFound()) : researchIndex();
      title = item?.title || "Research";
      break;
    }
    case "formulations": {
      const item = formulations.find((x) => x.id === id);
      html = id
        ? item
          ? formulationDetail(item)
          : notFound()
        : formulationIndex();
      title = item?.title || "Formulations";
      break;
    }
    case "shop": {
      const item = products.find((x) => x.id === id);
      html = id ? (item ? productDetail(item) : notFound()) : shop();
      title = item?.title || "Kits & materials";
      break;
    }
    case "learn":
      html = learn(id);
      title = id === "educators" ? "For educators" : "Start here";
      break;
    case "evidence":
      html = evidence();
      title = "Evidence standards";
      break;
    case "tools":
      html = toolsPage();
      title = "Batch scaler";
      break;
    case "search":
      html = searchPage(new URLSearchParams(query));
      title = "Search";
      break;
    default:
      html = notFound();
      title = "Page not found";
  }
  main.innerHTML = html;
  document.title = `${title} · Geopolymer Platform`;
  document.querySelectorAll("nav a").forEach((a) => {
    if (a.hash === `#/${area}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  attach();
  if (focus) {
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}
window.addEventListener("hashchange", () => {
  if (location.hash === "#main") {
    main.focus();
    return;
  }
  render();
});
render(false);
