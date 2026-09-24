/** @type {import('./schema').Paper[]} */
export const papers = [
  {
    id: "mk-testing-2019",
    title: "Testing commercial metakaolins",
    authors: "Ralph Davidovits, Christine Pelegris & Joseph Davidovits",
    year: 2019,
    doi: "10.13140/RG.2.2.18109.10727/1",
    url: "https://www.geopolymer.org/news/26-standardized-method-in-testing-commercial-metakaolins-for-geopolymer-formulations/",
    access: "Publisher summary reviewed; full paper not reviewed",
    publication: "Technical Paper #26 · peer review not established",
    summary:
      "The authors propose a geopolymer-specific comparison of commercial metakaolins. Their summary describes eleven samples with sodium and potassium silicate solutions, using heat evolution to compare behavior.",
    limitation:
      "This is a summary of the publisher page, not a complete protocol. It does not establish compatibility with any proposed kit.",
    reviewedAt: "2026-09-24",
  },
];
/** @type {import('./schema').Grade[]} */
export const grades = [
  {
    id: "grade-metaver-sf",
    materialId: "metakaolin",
    title: "Metaver SF",
    status: "Named in literature · not a qualified platform grade",
    supplier: null,
    lotId: null,
    sourceId: "mk-testing-2019",
  },
  {
    id: "grade-argical-m1200",
    materialId: "metakaolin",
    title: "Argical M1200",
    status: "Named in literature · not a qualified platform grade",
    supplier: null,
    lotId: null,
    sourceId: "mk-testing-2019",
  },
  {
    id: "grade-proposed-mk",
    materialId: "metakaolin",
    title: "Pilot precursor grade",
    status: "Proposed · supplier and specification not selected",
    supplier: null,
    lotId: null,
    sourceId: null,
  },
  {
    id: "grade-proposed-silicate",
    materialId: "silicate-activators",
    title: "Pilot prepared activator",
    status: "Proposed · chemistry and concentration not selected",
    supplier: null,
    lotId: null,
    sourceId: null,
  },
];
/** @type {import('./schema').Material[]} */
export const materials = [
  {
    id: "metakaolin",
    title: "Metakaolin",
    category: "Precursor",
    role: "Starting material",
    summary:
      "Explore a precursor family through named commercial grades, a published comparison method and proposed learning kits.",
    gradeIds: ["grade-metaver-sf", "grade-argical-m1200", "grade-proposed-mk"],
    paperIds: ["mk-testing-2019"],
    productIds: ["starter-kit", "classroom-kit", "mk-sample"],
  },
  {
    id: "silicate-activators",
    title: "Silicate activators",
    category: "Activator",
    role: "System component",
    summary:
      "Compare the information needed to specify a sodium or potassium silicate solution. Exact chemistry matters; a generic name is not a substitution rule.",
    gradeIds: ["grade-proposed-silicate"],
    paperIds: ["mk-testing-2019"],
    productIds: ["starter-kit"],
  },
];
/** @type {import('./schema').Formulation[]} */
export const formulations = [
  {
    id: "metakaolin-comparison",
    title: "Compare metakaolin grades",
    version: "0.1",
    evidence: "literature-reported",
    paperIds: ["mk-testing-2019"],
    gradeIds: ["grade-metaver-sf", "grade-argical-m1200"],
    productIds: ["starter-kit", "classroom-kit"],
    summary:
      "A method record for the published commercial-metakaolin comparison. Full recipe extraction and editorial review are pending.",
    masses: null,
  },
];
/** @type {import('./schema').Product[]} */
export const products = [
  {
    id: "starter-kit",
    title: "First experiment kit",
    category: "Starter kit",
    materialId: "metakaolin",
    gradeId: "grade-proposed-mk",
    targetPrice: 49,
    status: "concept",
    pack: "1 proposed experiment pack · target: 2–3 small specimens",
    summary:
      "An introduction to recording, casting and comparing a single characterized system.",
    included: [
      "Proposed: characterized precursor and matched prepared activator; exact masses pending qualification.",
      "Proposed: measured consumables and observation worksheet.",
    ],
    required: [
      "Suitable scale, mixing tools and molds; final specifications pending.",
      "Product-specific PPE, handling and disposal instructions must be established before release.",
    ],
  },
  {
    id: "classroom-kit",
    title: "Classroom discovery kit",
    category: "Educator kit",
    materialId: "metakaolin",
    gradeId: "grade-proposed-mk",
    targetPrice: 179,
    status: "concept",
    pack: "6 paired workstations · 12 students",
    summary:
      "A shared experiment with a teacher guide, common observations and a refill pathway.",
    included: [
      "Proposed: six experiment packs; exact chemical masses pending qualification.",
      "Proposed: teacher guide, data sheets and refill list.",
    ],
    required: [
      "Trained instructor and supervised older students; age suitability pending review.",
      "Shared equipment and product-specific PPE; final requirements pending qualification.",
    ],
  },
  {
    id: "casting-kit",
    title: "Casting & surface kit",
    category: "Maker kit",
    materialId: "metakaolin",
    gradeId: "grade-proposed-mk",
    targetPrice: 69,
    status: "concept",
    pack: "1 proposed casting experiment pack · chemical masses undecided",
    summary:
      "Explore a small casting and surface experiment with a qualified filler system.",
    included: [
      "Proposed: matched precursor, activator and suitable filler.",
      "Proposed: surface experiment worksheet.",
    ],
    required: [
      "Suitable molds, mixing equipment and scale; specifications pending.",
      "Product-specific handling review and PPE before release.",
    ],
  },
  {
    id: "mk-sample",
    title: "Metakaolin sample",
    category: "Raw material",
    materialId: "metakaolin",
    gradeId: "grade-proposed-mk",
    targetPrice: null,
    status: "concept",
    pack: "Proposed: 453.59237 g (1 lb) or 2,267.96185 g (5 lb)",
    summary:
      "A traceable precursor sample, linked to its exact grade and lot once qualified.",
    included: [
      "Proposed: one sealed powder pack in the selected size.",
      "Grade specification, lot record and relevant documentation required before release.",
    ],
    required: [
      "A compatible reviewed method and qualified activator.",
      "Suitable weighing equipment and product-specific handling controls.",
    ],
  },
];
/** @type {import('./schema').Test[]} */
export const tests = []; // No platform test records exist. Do not infer testing from literature.
export const evidenceLabels = {
  "literature-reported": "Literature-reported",
  "internally-reproduced": "Internally reproduced",
  "independently-tested": "Independently tested",
  illustrative: "Arithmetic example",
};
export const demoIngredients = [
  { label: "Component A", grams: 600 },
  { label: "Component B (as supplied)", grams: 300 },
  { label: "Component C", grams: 100 },
];
export const searchRecords = [
  ...materials.map((x) => ({
    ...x,
    type: "Material",
    href: `#/materials/${x.id}`,
  })),
  ...papers.map((x) => ({
    ...x,
    type: "Research",
    href: `#/research/${x.id}`,
  })),
  ...formulations.map((x) => ({
    ...x,
    type: "Formulation",
    href: `#/formulations/${x.id}`,
  })),
  ...products.map((x) => ({
    ...x,
    type: "Product concept",
    href: `#/shop/${x.id}`,
  })),
  {
    id: "batch-scaler",
    title: "Batch mass scaler",
    summary:
      "Scale component weights in grams or kilograms while preserving mass proportions.",
    type: "Tool",
    href: "#/tools",
  },
  {
    id: "educators",
    title: "For educators",
    summary: "Classroom kits, supervised students and evidence-led learning.",
    type: "Guide",
    href: "#/learn/educators",
  },
  {
    id: "beginners",
    title: "Your first experiment",
    summary: "Start here: materials, grades and evidence.",
    type: "Guide",
    href: "#/learn/beginners",
  },
];
export function search(query, type = "All") {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return searchRecords.filter(
    (x) =>
      (type === "All" || x.type === type) &&
      words.every((w) =>
        `${x.title} ${x.summary} ${x.type} ${x.category || ""}`
          .toLowerCase()
          .includes(w),
      ),
  );
}
