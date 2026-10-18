// Original editorial synthesis; source facts, calculations and proposed steps remain distinct.
export const deepDiveAdditions = [
  {
    "id": "biochar-replacement-and-exposure",
    "title": "Biochar paste: replacement ratios, shrinkage and exposure controls",
    "summary": "Build a defensible biochar comparison by separating batch proportions, conditioning history and the question each test can answer.",
    "sourceTitle": "Effects of Biochar Addition on the Properties of Alkali-Activated Materials",
    "doi": "10.3390/ma18030486",
    "citation": "Andrea Saccani, Luca Baldazzi and Stefania Manzi. Materials 18, 486 (2025).",
    "checked": "2026-10-17",
    "source": "https://cris.unibo.it/retrieve/18a88cc9-e847-4171-b93c-8b7d2c5eae67/materials-18-00486.pdf",
    "relatedRecipe": "/formulations/saccani-mh1",
    "license": "CC BY 4.0, PDF page 1. Original editorial adaptation; selected facts only.",
    "glossary": "MK = metakaolin. A replacement percentage uses the original precursor mass as its denominator; a wet-batch percentage includes the activator solutions and added water.",
    "highlights": [
      "The comparison is most useful when formulation changes and specimen histories can be traced separately.",
      "An apparent benefit after exposure needs an age-matched control before it can be attributed to resistance to that exposure.",
      "Treat a different feedstock, firing process or grading as a new material requiring its own control series."
    ],
    "facts": [
      {
        "title": "Material identity",
        "locator": "§2.1, p.5",
        "text": "Argicem metakaolin; prepared hardwood biochar; 8 M NaOH; Reoflux B sodium silicate (56 wt% water). Biochar: dried 55°C for 72 h, ground, sieved 0.5 mm."
      },
      {
        "title": "Selected MH-1 batch",
        "locator": "Table 2, p.7",
        "text": "Wet-mass percentages: MK 55.46; biochar 0.56; sodium silicate solution 21.29; NaOH solution 21.29; added water 1.40. Replacement series: 0, 1, 2, 5, 8% of original MK."
      },
      {
        "title": "Preparation and cure",
        "locator": "§2.2, p.7",
        "text": "Combine MK/biochar, add premixed activator, then water. Seal at room temperature; demould cylinders after 24 h into hermetic containers."
      },
      {
        "title": "Compression and exposure",
        "locator": "§2.3.4, p.10",
        "text": "27×55 mm cylinders; 7/14/28 days; 5 mm/min. Exposure arm: 28 days cure + 8 days capillary exposure + 4 days drying at 40°C."
      },
      {
        "title": "Length-change method",
        "locator": "§2.3.6, p.11; Figure 12, p.16",
        "text": "Three 25×25×285 mm prisms per recipe; 250 mm gauge length. After 24 h, demould to 30°C/40% RH. Figure 12 remains undigitized."
      }
    ],
    "arithmetic": {
      "intro": "Use the published MH-1 wet-mass row to check the denominator before choosing a batch size. These calculations preserve rounded source proportions; they do not qualify substitute materials.",
      "rows": [
        [
          "MH-1 total",
          "55.46 + 0.56 + 21.29 + 21.29 + 1.40 = 100",
          "A mass ledger closes; chemical composition is still incomplete."
        ],
        [
          "Replacement basis",
          "0.56 / 56.02 × 100 ≈ 1.00%",
          "Original control MK is the denominator, not the wet batch."
        ],
        [
          "Proposed 1 kg batch",
          "554.6 g MK + 5.6 g char + 212.9 g silicate solution + 212.9 g NaOH solution + 14 g added water",
          "Mass scaling only; solution preparation and material qualification remain separate."
        ],
        [
          "Known water subtotal",
          "212.9 × 0.56 + 14 = 133.224 g",
          "Excludes NaOH-solution water and material moisture. Not total mixing water."
        ]
      ],
      "notes": [
        "An 8 M solution contains eight moles per litre of final solution, not per litre of initial water. Obtain concentration, density and temperature records; do not improvise a solution-preparation recipe from the mass ledger.",
        "For a length-change measurement, subtract the reference-bar reading at each time before comparing with the initial reading. Report sign convention and instrument resolution. No graph values are inferred here."
      ]
    },
    "checklist": [
      [
        "Define the comparison",
        "Choose a reproduction or a new feedstock investigation. Keep an unmodified control and include high-dose variants so a favorable low-dose result does not hide tradeoffs."
      ],
      [
        "Qualify and prepare the char",
        "Record feedstock, pyrolysis history, particle grading, storage moisture and handling losses. Use suitable dust controls and trained alkali handling. Historical material names do not establish present-day equivalence."
      ],
      [
        "Close the solution ledger",
        "Check as-supplied solution masses against the table. Record separately the physical water in each solution. Leave missing assay fields unknown rather than borrowing chemistry from another char."
      ],
      [
        "Plan specimens before mixing",
        "Allocate separate specimens to initial compression, water absorption, exposure and length change. Record batch-level replication separately from multiple specimens cut or cast from the same batch."
      ],
      [
        "Mix and document workability",
        "Use the reported order, then record mixer geometry, speed and elapsed time as your own settings where the paper leaves them unspecified. Record clumping, bleeding and failed batches. Do not silently add water to restore flow."
      ],
      [
        "Assign curing and conditioning histories",
        "Keep a dated specimen log. Length-change prisms and hermetically stored cylinders have different histories; do not treat them as interchangeable samples."
      ],
      [
        "Add a matched control for the new question",
        "For a proposed exposure study, retain an unexposed group tested at the same total age. If separating drying from water exposure matters, design an additional drying-only group. These are proposed controls, not claimed source procedures."
      ],
      [
        "Report multiple outcomes",
        "Show flow, individual strengths, absorption and dimensional change with their own units and ages. Specify what a reported spread means. A single strength maximum cannot establish the best material for every application."
      ]
    ],
    "holds": [
      "No newly verified biochar oxide assay or dimensional-change graph points are added. A cited characterization paper does not establish the identity of this specific lot.",
      "Activator quantities stay fixed as MK is replaced, so precursor chemistry changes together with biochar content. A one-factor causal interpretation requires care.",
      "Initial strength and post-exposure strength do not share the same total age; the source comparison does not supply an age-matched unexposed 40-day control.",
      "Mixing speed/time, NaOH solution water fraction and per-age valid-result counts remain unresolved. Reported ± type is not established.",
      "Partial AI source review. The PDF has overlapping review/final text layers; prior visual checks of selected tables are recorded in the batch audit. No new visual review or comprehensive correction clearance is claimed."
    ]
  },
  {
    "id": "basalt-fiber-carbon-textile",
    "title": "Basalt fibers and carbon textile: from mortar mixing to composite plates",
    "summary": "Follow the dose denominator, mixing order and specimen geometry before comparing reinforcement effects or planning a thin composite panel.",
    "sourceTitle": "Investigation on Flexural Behavior of Geopolymer-Based Carbon Textile/Basalt Fiber Hybrid Composite",
    "doi": "10.3390/polym13050751",
    "citation": "Chi Hiep Le, Petr Louda, Katarzyna Ewa Buczkowska and Iva Dufkova. Polymers 13, 751 (2021).",
    "checked": "2026-10-17",
    "source": "https://pdfs.semanticscholar.org/9828/de233e60ca20ada95dd8648c207ba4c8dbe1.pdf",
    "relatedRecipe": "/formulations/le-matrix-6mm-050",
    "license": "CC BY 4.0, PDF page 1. Original editorial adaptation; selected facts only.",
    "glossary": "Geopaste here means geocement plus activator. Geomortar adds sand and other ingredients. Chopped fibers dispersed in mortar and a continuous textile layer are different reinforcement systems.",
    "highlights": [
      "A dose is meaningless without its denominator: calculate the reinforcement against the material fraction the authors actually used.",
      "Evaluate handling failures alongside strength. Poor dispersion can change the experiment before a specimen reaches the test machine.",
      "A mortar result cannot be assigned to a textile plate merely because the plate uses the same mortar."
    ],
    "facts": [
      {
        "title": "Materials and base proportions",
        "locator": "§2.1 and Table 2, pp.3–4",
        "text": "Geocement:activator:rough sand:micro-milled sand:silica fume = 1:0.8:1.5:0.2:0.1 by mass. Basalt dose is wt% of geopaste; lengths 6, 12, 24 mm."
      },
      {
        "title": "Mixing order",
        "locator": "§2.2, p.4",
        "text": "Geocement/activator about 4 min; silica fume/micro-sand about 3 min; disperse fibers; add rough sand slowly."
      },
      {
        "title": "Separate specimen families",
        "locator": "§2.2, pp.4–5",
        "text": "Matrix prisms: 30×30×150 mm, covered, laboratory cure 28 days. Textile plates: approximately 400×100×15 mm; one textile layer over 5 mm mortar; cover 24 h, demould/rewrap, 22°C/55% RH to 28 days."
      },
      {
        "title": "Mixed outcomes",
        "locator": "Abstract; Table 3, p.5",
        "text": "Higher fiber loading reduces workability; longer fibers can cluster. Table 3 reports matrix compression/flexure separately from textile bending/impact."
      },
      {
        "title": "Textile preparation detail",
        "locator": "§2.2, pp.4–5",
        "text": "Manual vibration and yarn tensioning are described. Loading-direction and crosswise yarn counts differ. Quantitative tension remains unspecified."
      }
    ],
    "arithmetic": {
      "intro": "For the selected 0.5% geopaste dose, the source denominator contains only the geocement and activator. The following is a weighing check, not a strength prediction.",
      "rows": [
        [
          "Geopaste mass parts",
          "1 + 0.8 = 1.8",
          "Do not include sand or silica fume in this dose denominator."
        ],
        [
          "Basalt mass parts",
          "0.005 × 1.8 = 0.009",
          "A 0.5% geopaste dose is not 0.5% of the mortar."
        ],
        [
          "Proposed base scale",
          "1000 g geocement + 800 g activator + 1500 g rough sand + 200 g micro-sand + 100 g silica fume + 9 g basalt",
          "Total 3609 g, before handling losses; no carbon textile included."
        ],
        [
          "Basalt fraction of total",
          "9 / 3609 × 100 ≈ 0.249%",
          "Changing the denominator nearly halves the apparent percentage."
        ]
      ],
      "notes": [
        "Scaling mass does not scale mixing energy, dispersion or entrained air. Check mixer working volume and document retained material before inferring mould yield.",
        "Textile layout requires its own drawing: yarn direction, cover, anchorage and dimensions. A complete mortar ledger does not provide a complete textile-assembly specification."
      ]
    },
    "checklist": [
      [
        "Choose the experimental unit",
        "Decide whether you are investigating mortar, a textile plate or a hybrid. Give the unreinforced matrix and textile reference separate IDs. Preserve which outcome belongs to each."
      ],
      [
        "Qualify materials",
        "Record the commercial geocement formulation and activator composition rather than assuming pure metakaolin. Document fiber length distribution, sizing and textile architecture. Use appropriate dust and alkali protection."
      ],
      [
        "Calculate one denominator",
        "Write the geopaste mass on the weighing sheet, calculate fiber mass from it and independently check the total. A change of activator mass also changes fiber mass at fixed geopaste percentage."
      ],
      [
        "Mix with a dispersion log",
        "Follow the reported staged sequence. Record the actual mixer speed and fiber-dispersion duration. Photograph clusters or dry pockets and record a failure instead of silently excluding a difficult formulation."
      ],
      [
        "Keep casting branches separate",
        "For mortar, document consolidation and prism dimensions. For textile plates, document yarn direction, layer position, anchorage and tensioning method. Do not infer a tension force from the descriptive source procedure."
      ],
      [
        "Control specimen history",
        "Label batches and specimens before curing. Record actual temperature, wrapping, demoulding and test age. Keep any adapted cure separate from the reproduction series."
      ],
      [
        "Qualify each mechanical test",
        "Ask the laboratory to document spans, loading rate, geometry and failure mode for the relevant test. Matrix flexure, plate bending and impact energy answer different questions."
      ],
      [
        "Compare matched variants",
        "Change either fiber length or dose when the aim is to isolate its effect. Report individual results and uncertainty; do not rank a compression maximum as the optimum for panel bending."
      ],
      [
        "Investigate the interface",
        "For a proposed follow-up, retain failure photographs and distinguish pull-out, debonding and rupture. Any new treatment, textile or pretension is a new experimental arm, not an inherited improvement."
      ]
    ],
    "holds": [
      "Matrix loading protocol, replicate counts and reported ± type remain unresolved in this extraction. Do not borrow the textile protocol for the matrix.",
      "Textile pretension is not quantified; a repeatable laboratory fixture and force record would be a proposed improvement, not a recovered source quantity.",
      "The source compares some findings with earlier work. Publication count is not an independent dataset count; overlap needs qualification.",
      "No new numerical textile or impact series, graph points or material assay transfer is introduced. Existing matrix rows remain linked with their source locators.",
      "Partial AI source review. The PDF contains overlapping review/final layers; prior selected Table 3 visual checks remain historical. Current correction/retraction status is unresolved."
    ]
  }
];
