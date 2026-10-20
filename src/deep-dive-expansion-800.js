// Original partial editorial guides from the 300-publication expansion.
export const expansion800DeepDives = [
  {
    "id": "metakaolin-gel-amount-versus-composition",
    "title": "Metakaolin strength: gel amount and gel composition are different variables",
    "summary": "Use reaction measurements to test a mechanism without treating bulk Si/Al as a complete strength predictor.",
    "glossary": "NMR = nuclear magnetic resonance; Si/Al = atomic silicon/aluminum ratio; degree of reaction = the method-defined reacted fraction.",
    "relatedStudy": "/studies/ke-b19-002",
    "sourceTitle": "Quantitative Correlation between the Degree of Reaction and Compressive Strength of Metakaolin-Based Geopolymers",
    "doi": "10.3390/ma13245784",
    "checked": "2026-10-19",
    "citation": "Materials (2020), DOI 10.3390/ma13245784. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/13/24/5784",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Use reaction measurements to test a mechanism without treating bulk Si/Al as a complete strength predictor.",
      "Specify whether the experiment changes gel chemistry, reacted fraction or both. Keep calcium addition as an explicit factor.",
      "No fitted strength equation or gel measurement is added to canonical numerical search."
    ],
    "facts": [
      {
        "title": "Design",
        "locator": "Abstract and study-objective passage",
        "text": "The paper separates gel composition from reaction extent when correlating metakaolin-geopolymer strength, including mixtures with and without calcium."
      },
      {
        "title": "Activator",
        "locator": "Materials and Methods, solution composition",
        "text": "Reported sodium silicate contains 29.02 wt% SiO₂, 9.00 wt% Na₂O and 61.98 wt% water; hydroxide is a separate ingredient."
      },
      {
        "title": "Measurements",
        "locator": "NMR/chemical-extraction methods; compression method",
        "text": "Solid-state silicon NMR aided by chemical extractions estimates gel composition and amount. Compression follows the cited ASTM C109 approach at 900–1800 N/s and 22 ± 1°C."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Solution mass closure",
          "29.02 + 9.00 + 61.98 = 100.00%",
          "An original consistency check on the reported solution assay, not a batch recipe."
        ],
        [
          "Measured chemistry",
          "Bulk input Si/Al ≠ measured gel Si/Al by definition",
          "Unreacted precursor and other phases must remain in the accounting."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Separate the hypotheses",
        "Specify whether the experiment changes gel chemistry, reacted fraction or both. Keep calcium addition as an explicit factor."
      ],
      [
        "Document the solution ledger",
        "Account for silicate water and added hydroxide separately; do not derive the entire activator from its stock modulus."
      ],
      [
        "Audit analytical selectivity",
        "Qualify extraction recovery, NMR peak assignment and phase assumptions. Treat degree of reaction as method dependent."
      ],
      [
        "Test correlation on independent batches",
        "Retain matched-age strength and analytical specimens. A within-study correlation is not a validated predictor for a different precursor."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Full mixture ledger, cure history, extraction protocol and uncertainty remain incomplete.",
      "No fitted strength equation or gel measurement is added to canonical numerical search.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "NMR/chemical-extraction methods; compression method",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Abstract and study-objective passage",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Abstract and study-objective passage",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "NMR/chemical-extraction methods; compression method",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "metakaolin-reactivity-and-liquid-volume",
    "title": "Metakaolin kinetics: a volume-based liquid ratio cannot become a mass ratio",
    "summary": "Keep calcination-dependent reactivity separate from the amount and identity of activating solution.",
    "glossary": "MK = metakaolin; mL/g = liquid volume per solid mass; soluble and amorphous aluminum are different characterization quantities.",
    "relatedStudy": "/studies/ke-b19-004",
    "sourceTitle": "Mechanical Properties and Reaction Kinetics of Alkali-Activated Metakaolin",
    "doi": "10.3390/ma17020367",
    "checked": "2026-10-19",
    "citation": "Materials (2024), DOI 10.3390/ma17020367. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/17/2/367",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep calcination-dependent reactivity separate from the amount and identity of activating solution.",
      "Document clay origin, furnace history, particle distribution and surface area before attributing a strength change to chemistry.",
      "The reported association is not a universal reactivity ranking or a numeric strength prediction."
    ],
    "facts": [
      {
        "title": "Materials comparison",
        "locator": "Discussion of calcined kaolins and active aluminum",
        "text": "The study compares metakaolins with different calcination histories and discusses soluble/amorphous aluminum alongside particle properties."
      },
      {
        "title": "Mixture basis",
        "locator": "Preparation passage specifying liquid–solid ratio",
        "text": "Activator is combined with MK at 0.5 mL/g. This is not a liquid/solid mass ratio of 0.5."
      },
      {
        "title": "Cure and interpretation",
        "locator": "Specimen preparation; mechanical/kinetics discussion",
        "text": "After demolding, specimens are stored at 20 ± 2°C and above 95% RH for seven days. The paper reports a strong association of active aluminum and strength within its tested materials."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Proposed volume normalization",
          "1000 g solid × 0.5 mL/g = 500 mL solution",
          "Solution mass requires measured density at a stated temperature."
        ],
        [
          "Mass conversion",
          "msolution = measured volume × density",
          "The volume ratio alone supplies neither water mass nor alkali dose."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Qualify calcination and fineness",
        "Document clay origin, furnace history, particle distribution and surface area before attributing a strength change to chemistry."
      ],
      [
        "Measure the solution correctly",
        "Record volume, density, composition and temperature. Preserve the original mL/g denominator in exports."
      ],
      [
        "Separate analytical fractions",
        "Use documented methods for soluble aluminum and amorphous phase content; do not substitute XRF total aluminum for either quantity."
      ],
      [
        "Retain curing chronology",
        "Record casting, demolding and the subsequent seven-day humid stage independently. Test matched ages without extrapolating a correlation to a new grade."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Pre-demolding cure, complete solution composition and individual-result uncertainty remain unextracted.",
      "The reported association is not a universal reactivity ranking or a numeric strength prediction.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Specimen preparation; mechanical/kinetics discussion",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Discussion of calcined kaolins and active aluminum",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Discussion of calcined kaolins and active aluminum",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Specimen preparation; mechanical/kinetics discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "ceramic-waste-artistic-restoration",
    "title": "Ceramic waste for casting and restoration: surface compatibility needs its own test",
    "summary": "Compare tile-production residues and spent mold gypsum while preserving substrate and appearance requirements.",
    "glossary": "MK = metakaolin; MIX-MK = source formulation label; EDS = local elemental microanalysis, not a complete as-supplied assay.",
    "relatedStudy": "/studies/ke-b20-022",
    "sourceTitle": "Development of Geopolymer-Based Materials with Ceramic Waste for Artistic and Restoration Applications",
    "doi": "10.3390/ma15238600",
    "checked": "2026-10-19",
    "citation": "Materials (2022), DOI 10.3390/ma15238600. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/15/23/8600",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Compare tile-production residues and spent mold gypsum while preserving substrate and appearance requirements.",
      "Separate fired ceramic, unfired residue and gypsum by origin and particle size. Do not pool them as an interchangeable filler.",
      "The sacrificial/restoration framing is an application proposal; current supplier equivalence and field conservation performance are unverified."
    ],
    "facts": [
      {
        "title": "Waste identity",
        "locator": "Materials and specimen-preparation passages",
        "text": "The study combines metakaolin and alkaline solution with pressed/burnt and extruded ceramic residues, raw pressed waste and gypsum from exhausted molds."
      },
      {
        "title": "Formulation objective",
        "locator": "Table 2; MIX-MK discussion",
        "text": "The MIX-MK design seeks to incorporate gypsum while limiting loss of mechanical properties. It is one study-specific tradeoff."
      },
      {
        "title": "Application boundary",
        "locator": "Application discussion; cured-composition passage",
        "text": "The paper discusses tuff, cement, ceramic and porcelain-stoneware substrates. A cured EDS-derived composition is reported; it does not provide the ingredient water/alkali ledger."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Composition interpretation",
          "3.48 mol SiO₂ per 1 mol Al₂O₃ gives atomic Si/Al = 3.48/2 = 1.74",
          "Conditional interpretation of the stated cured oxide formula, not an input formulation target."
        ],
        [
          "Proposed coupon coverage",
          "Volume = coated area × measured thickness",
          "Record texture and local thickness instead of inferring yield from nominal binder mass."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Classify the residue stream",
        "Separate fired ceramic, unfired residue and gypsum by origin and particle size. Do not pool them as an interchangeable filler."
      ],
      [
        "Set the artistic objective",
        "Predefine color, edge detail, finishing, shrinkage and demolding requirements alongside mechanical tests."
      ],
      [
        "Test a relevant substrate",
        "Compare adhesion and failure locus on representative stone/ceramic surfaces with controlled moisture and cleaning."
      ],
      [
        "Assess restoration compatibility",
        "Check moisture transport, salt behavior and whether removal damages the original substrate. A material-level strength result does not qualify a conservation intervention."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Full Table 2 ledger, mixing/cure and substrate-specific bond methods remain unextracted.",
      "The sacrificial/restoration framing is an application proposal; current supplier equivalence and field conservation performance are unverified.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Materials and specimen-preparation passages",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Materials and specimen-preparation passages",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Materials and specimen-preparation passages",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Application discussion; cured-composition passage",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "aluminum-foam-coating-ratio-conflict",
    "title": "Foam on aluminum: resolve the activator-ratio conflict before weighing",
    "summary": "Preserve conflicting source ratios while separating rapid heat cure from assembly fire behavior.",
    "glossary": "GF = geopolymer foam; Baucis LK = the source commercial binder system; RT = room temperature.",
    "relatedStudy": "/studies/ke-b23-024",
    "sourceTitle": "Research of Curing Time and Temperature-Dependent Strengths and Fire Resistance of Geopolymer Foam Coated on an Aluminum Plate",
    "doi": "10.3390/coatings11010087",
    "checked": "2026-10-19",
    "citation": "Coatings (2021), DOI 10.3390/coatings11010087. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2079-6412/11/1/87",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Preserve conflicting source ratios while separating rapid heat cure from assembly fire behavior.",
      "Check methods, abstract and product-component definitions before preparing a weighing sheet. Ask for an author correction if the denominator cannot be reconciled.",
      "Fire curves and full specimen/uncertainty inventory are not extracted; no certified fire rating or independent replication claim."
    ],
    "facts": [
      {
        "title": "Source conflict",
        "locator": "Abstract versus experimental mixing description",
        "text": "The abstract gives activator/binder 0.45, but methods describe five cement parts to four activator parts, equivalent to 0.80. These are not reconciled here."
      },
      {
        "title": "Sequence",
        "locator": "Experimental mixing passage",
        "text": "Binder/activator mix for 5 min at RT, basalt filler is incorporated for 5 min, then aluminum powder for about 1 min at high speed."
      },
      {
        "title": "Curing and assembly",
        "locator": "Curing discussion; fire-test temperature–time captions",
        "text": "The paper studies cure temperature/time and compares bare aluminum with 10 and 20 mm coatings. Faster early strength development is reported for heated mixtures."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Ratio conflict",
          "4/5 = 0.80, whereas the abstract states 0.45",
          "Difference = 0.35 binder-mass units. Do not average conflicting ratios."
        ],
        [
          "Source sequence",
          "5 + 5 + 1 = 11 min",
          "Sequence and mixer speed remain separate from total duration."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Identify the exact source version",
        "Check methods, abstract and product-component definitions before preparing a weighing sheet. Ask for an author correction if the denominator cannot be reconciled."
      ],
      [
        "Qualify the binder system",
        "Record commercial components, solution solids and actual lot. Do not substitute a generic metakaolin and KOH recipe."
      ],
      [
        "Track cure and thickness",
        "Measure cured thickness, heat history, mass loss and cracking independently of later fire exposure."
      ],
      [
        "Test the complete assembly",
        "Document aluminum geometry, exposed area, edges, attachment and cold-face temperature in a qualified laboratory. Keep material strength distinct from a fire classification."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Activator/binder conflict prevents an executable recipe. Source-family overlap with other Le/Louda foam studies remains unassessed.",
      "Fire curves and full specimen/uncertainty inventory are not extracted; no certified fire rating or independent replication claim.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Abstract versus experimental mixing description",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Abstract versus experimental mixing description",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Abstract versus experimental mixing description",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Curing discussion; fire-test temperature–time captions",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "pce-alkali-stability-versus-flow",
    "title": "PCE stability: surviving an activator is different from dispersing a paste",
    "summary": "Use molecular characterization and rheology as separate compatibility checks for superplasticizers.",
    "glossary": "PCE = polycarboxylate ester/ether; MPEG/IPEG/HPEG = source polymer architectures; Mw = weight-average molar mass; SEC = size-exclusion chromatography.",
    "relatedStudy": "/studies/ke-b23-006",
    "sourceTitle": "Investigations on Stability of Polycarboxylate Superplasticizers in Alkaline Activators for Geopolymer Binders",
    "doi": "10.3390/ma16155369",
    "checked": "2026-10-19",
    "citation": "Materials (2023), DOI 10.3390/ma16155369. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/16/15/5369",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Use molecular characterization and rheology as separate compatibility checks for superplasticizers.",
      "Record supplier, backbone/side-chain identity, solids and solution water rather than using PCE as a single chemical identity.",
      "The apparent contrast with other PCE studies is conditional on precursor, activator and dose basis; no universal incompatibility claim."
    ],
    "facts": [
      {
        "title": "Design",
        "locator": "Study objective; activator-exposure methods",
        "text": "MPEG-, IPEG- and HPEG-based PCEs are examined in NaOH, KOH and sodium/potassium silicate solutions, varying alkalinity and exposure duration."
      },
      {
        "title": "Dose basis",
        "locator": "Geopolymer-paste concentration passage",
        "text": "The binder denominator includes MK plus alkaline-activator solids. It is not metakaolin mass alone."
      },
      {
        "title": "Analytical versus fresh response",
        "locator": "Table 2; Conclusions",
        "text": "SEC assesses polymer degradation after exposure. The rheology investigation reports increased paste viscosity/yield strength with the investigated PCEs rather than establishing general fluidization."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Selected Mw check",
          "MPEG Mw: 22.8 / 46.6 ≈ 0.489 after the reported 30 min, 8 M NaOH exposure",
          "Selected Table 2 comparison only; molar-mass distribution and calibration matter. It is not a paste-flow prediction."
        ],
        [
          "Dose denominator",
          "mPCE / (mMK + mactivator-solids)",
          "Resolve as-supplied versus polymer-solids mass before using the ratio."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Qualify polymer architecture",
        "Record supplier, backbone/side-chain identity, solids and solution water rather than using PCE as a single chemical identity."
      ],
      [
        "Match the activator history",
        "Use documented concentration, silicate modulus, temperature and exposure time. Test an unexposed polymer reference."
      ],
      [
        "Measure chemical and functional behavior separately",
        "Compare SEC changes with paste flow, yield response, air and setting. Chemical stability alone does not establish dispersing action."
      ],
      [
        "Retain unsuccessful combinations",
        "Do not conceal increased viscosity by adding water. Treat any rescue addition as a new formulation with a revised ledger."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete rheometer protocol, polymer solids and all time/concentration results remain unextracted.",
      "The apparent contrast with other PCE studies is conditional on precursor, activator and dose basis; no universal incompatibility claim.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Study objective; activator-exposure methods",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Study objective; activator-exposure methods",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Study objective; activator-exposure methods",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Table 2; Conclusions",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "ambient-fly-ash-superplasticizer",
    "title": "Ambient fly-ash paste: test the admixture without silently adding water",
    "summary": "Keep a reported flow improvement tied to its fly-ash mass basis and ambient activation system.",
    "glossary": "SP = superplasticizer; FA = carbon fly ash in the source; PCE = polycarboxylic ether-based admixture.",
    "relatedStudy": "/studies/ke-b22-022",
    "sourceTitle": "Superplasticizer Addition to Carbon Fly Ash Geopolymers Activated at Room Temperature",
    "doi": "10.3390/ma9070586",
    "checked": "2026-10-19",
    "citation": "Materials (2016), DOI 10.3390/ma9070586. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/9/7/586",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep a reported flow improvement tied to its fly-ash mass basis and ambient activation system.",
      "Record carbon content, fineness, lot and commercial admixture solids. Preserve product identity where available.",
      "This source’s favorable PCE result must not override the distinct, unfavorable low-calcium activator-stability study."
    ],
    "facts": [
      {
        "title": "System",
        "locator": "Preparation passage",
        "text": "The study activates carbon fly ash at room temperature with sodium hydroxide and sodium silicate. Admixtures are added during mixing."
      },
      {
        "title": "Processing",
        "locator": "Mixing passage",
        "text": "The reference preparation specifies four minutes of mixing; the full solution and added-water ledger is not extracted here."
      },
      {
        "title": "Reported result",
        "locator": "Abstract/conclusions, PCE comparison",
        "text": "A PCE-based admixture at 1.0 wt% of FA improves workability without reducing the final strength in the studied comparison. This is not evidence for every PCE or ash."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Conditional FA normalization",
          "1.0% × 1000 g FA = 10 g on the source dose basis",
          "Confirm whether the source amount means commercial product or active polymer before weighing."
        ],
        [
          "Water accounting",
          "Total physical water = solution water + admixture water + added water",
          "A flow improvement cannot be assigned to dispersion if extra water is not controlled."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Characterize the ash and admixture",
        "Record carbon content, fineness, lot and commercial admixture solids. Preserve product identity where available."
      ],
      [
        "Use a water-matched control",
        "Correct the control for admixture solution water and compare the same nominal chemical quantities."
      ],
      [
        "Control mixing and elapsed time",
        "Measure flow, setting and paste temperature at predefined times after the documented mixing stage."
      ],
      [
        "Follow through to hardened behavior",
        "Test strength, density and porosity at matched cure and age. Keep failure or poor-setting outcomes alongside successful flow results."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Exact solution quantities, SP solids, specimen/test age and uncertainty remain unextracted.",
      "This source’s favorable PCE result must not override the distinct, unfavorable low-calcium activator-stability study.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Preparation passage",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Preparation passage",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Preparation passage",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Abstract/conclusions, PCE comparison",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "superplasticizer-flow-air-long-term",
    "title": "Superplasticizers: a lower viscosity can come with more air",
    "summary": "Follow fresh-state measurements through early and 90-day behavior before choosing an admixture.",
    "glossary": "M/NF/AP/PC = source melamine, naphthalene, acrylic-polymer and polycarboxylic-ether admixture classes.",
    "relatedStudy": "/studies/ke-b23-004",
    "sourceTitle": "Effect of Various Types of Superplasticisers on Consistency, Viscosity, Structure and Long-Term Strength of Geopolymer Products",
    "doi": "10.3390/ma14247614",
    "checked": "2026-10-19",
    "citation": "Materials (2021), DOI 10.3390/ma14247614. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/14/24/7614",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Follow fresh-state measurements through early and 90-day behavior before choosing an admixture.",
      "Record admixture product and solids separately and use FA mass for the source dose.",
      "The selected long-term comparison does not establish chemical stability, environmental suitability or a universal best admixture."
    ],
    "facts": [
      {
        "title": "Design",
        "locator": "Abstract; experimental overview",
        "text": "Four admixture classes are added at 2% of fly-ash mass. Consistency is measured with flow/penetration methods, viscosity with a rheometer, and air voids separately."
      },
      {
        "title": "Mechanical chronology",
        "locator": "Strength-testing description",
        "text": "Compression is compared at 7, 28 and 90 days under heated and room-temperature maturation histories."
      },
      {
        "title": "Tradeoff",
        "locator": "Abstract/conclusions; §3.3",
        "text": "Naphthalene gives the strongest viscosity reduction while increasing air. Heating affects early strength, but its advantage is not evident after 90 days in the reported comparison."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Dose normalization",
          "0.02 × 1000 g FA = 20 g on the source admixture basis",
          "No conversion to active solids or whole-batch percentage is assumed."
        ],
        [
          "Late/early age ratio",
          "90/7 ≈ 12.9",
          "A longer test horizon is not a constant-rate aging model or proof of service life."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Match the denominator",
        "Record admixture product and solids separately and use FA mass for the source dose."
      ],
      [
        "Measure air and rheology together",
        "Keep flow spread, viscosity and air content as distinct responses; a larger spread alone does not identify the mechanism."
      ],
      [
        "Separate the curing arms",
        "Document temperature, duration, humidity and later storage for heated and room-temperature specimens."
      ],
      [
        "Test at the required service horizon",
        "Compare both early placement/strength needs and later mechanical behavior. Keep the 90-day result from being replaced by an early-age ranking."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete mix, heating schedule, rheometer settings and replicate/spread audit remain incomplete.",
      "The selected long-term comparison does not establish chemical stability, environmental suitability or a universal best admixture.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Abstract; experimental overview",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Abstract; experimental overview",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Abstract; experimental overview",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Abstract/conclusions; §3.3",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "hpmc-vae-workability-durability",
    "title": "HPMC and VAE: workability and exposure resistance can disagree",
    "summary": "Compare cellulose ether and dispersible polymer through matched fresh, mechanical and exposure tests.",
    "glossary": "HPMC = hydroxypropyl methylcellulose; VAE = vinyl acetate–ethylene polymer; the source’s mechanism is an interpretation, not a replacement material assay.",
    "relatedStudy": "/studies/ke-b22-011",
    "sourceTitle": "Influence of HPMC and VAE on the Properties of Geopolymer Mortar",
    "doi": "10.3390/buildings15193621",
    "checked": "2026-10-19",
    "citation": "Buildings (2025), DOI 10.3390/buildings15193621. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2075-5309/15/19/3621",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Compare cellulose ether and dispersible polymer through matched fresh, mechanical and exposure tests.",
      "Separate application flow, water retention, bond and durability requirements before selecting a polymer.",
      "No universal HPMC benefit or VAE incompatibility is established, and OPC polymer behavior is not automatically transferred."
    ],
    "facts": [
      {
        "title": "Preparation",
        "locator": "Materials and activator passage",
        "text": "NaOH and water glass form the alkaline solution. HPMC and VAE are the separate polymer variables."
      },
      {
        "title": "Responses",
        "locator": "Study scope and testing overview",
        "text": "The study examines workability, compression, flexure, splitting tension, adhesion and durability under different cure environments."
      },
      {
        "title": "Unfavorable direction",
        "locator": "Durability discussion and microstructural interpretation",
        "text": "The source reports better exposure resistance with HPMC and worse behavior with VAE in its system, attributing VAE behavior to inhibited reaction and increased porosity."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Required polymer ledger",
          "As-supplied mass = active polymer + carrier water/other documented components",
          "Equal product mass does not establish equal active dose."
        ],
        [
          "Retention metric",
          "R = exposed property / matched unexposed property",
          "Use the same polymer, cure, test age and geometry in numerator and denominator."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Choose an explicit objective",
        "Separate application flow, water retention, bond and durability requirements before selecting a polymer."
      ],
      [
        "Document chemistry and solids",
        "Record HPMC viscosity grade, VAE form, dose basis and any carrier water. Avoid transplanting a cement-mortar dosage."
      ],
      [
        "Control cure and conditioning",
        "Use matched curing environments and exposure histories across polymer and control groups."
      ],
      [
        "Test the unfavorable arm",
        "Keep VAE-associated degradation and any loss of mechanical performance visible. Treat the proposed chemical mechanism as an interpretation requiring independent evidence."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Full doses, mixing sequence, cure regimes, exposure concentrations and uncertainty are not extracted.",
      "No universal HPMC benefit or VAE incompatibility is established, and OPC polymer behavior is not automatically transferred.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Materials and activator passage",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Materials and activator passage",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Materials and activator passage",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Durability discussion and microstructural interpretation",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "mgo-shrinkage-curing-demolding",
    "title": "MgO and slag shrinkage: the demolding clock changes the comparison",
    "summary": "Keep air, water and steam exposure separate when interpreting a dimensional-change additive.",
    "glossary": "GGBFS = slag; GP = source geopolymer; MgO = magnesium oxide; length change is signed relative to a defined initial reading.",
    "relatedStudy": "/studies/ke-b23-001",
    "sourceTitle": "The Length Change Ratio of Ground Granulated Blast Furnace Slag-Based Geopolymer Blended with Magnesium Oxide Cured in Various Environments",
    "doi": "10.3390/polym14163386",
    "checked": "2026-10-19",
    "citation": "Polymers (2022), DOI 10.3390/polym14163386. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2073-4360/14/16/3386",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep air, water and steam exposure separate when interpreting a dimensional-change additive.",
      "Choose the reference reading age and document handling limits. Keep three-hour and twenty-four-hour histories separate.",
      "Selected OPC control strains in the paper are not geopolymer results and are not transferred into this guide."
    ],
    "facts": [
      {
        "title": "Activator",
        "locator": "Materials passage",
        "text": "The sodium activator combines tap water, NaOH, sodium silicate and sodium aluminate. This is not hydroxide-only activation."
      },
      {
        "title": "Timing design",
        "locator": "Tables 4–5 discussion",
        "text": "The source separates specimens demolded at 3 h and 24 h, with composition, A/B, flow and 28-day length change reported by curing condition."
      },
      {
        "title": "Environment",
        "locator": "Cure-comparison discussion",
        "text": "Air-dry, water-bath and steam curing are distinct test arms. The study uses MgO hydration expansion as a shrinkage-compensation approach."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Unobserved interval",
          "24 − 3 = 21 h",
          "An initial reading at 24 h can omit change captured by a 3 h baseline; do not merge the series as equivalent."
        ],
        [
          "Signed dimensional change",
          "ε = (L − L₀)/L₀",
          "Record temperature, reference age and moisture with every reading."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Define time zero before casting",
        "Choose the reference reading age and document handling limits. Keep three-hour and twenty-four-hour histories separate."
      ],
      [
        "Resolve the multi-component activator",
        "Account for sodium aluminate, silicate and hydroxide solids/water rather than simplifying the solution to NaOH alone."
      ],
      [
        "Qualify MgO reactivity",
        "Record source, activity and particle size. A nominal MgO mass does not specify hydration/expansion timing."
      ],
      [
        "Track water access and strength",
        "Compare mass, strain and mechanical behavior under matched air, water or steam exposure. Compensation at one condition is not proof of dimensional stability everywhere."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Full MgO dose matrix, cure temperatures/durations, mixture ledger and uncertainty remain unextracted.",
      "Selected OPC control strains in the paper are not geopolymer results and are not transferred into this guide.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Materials passage",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Materials passage",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Materials passage",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Cure-comparison discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "fly-ash-opc-slant-shear-bond",
    "title": "Fly-ash repair paste on OPC: slant shear is not pull-off adhesion",
    "summary": "Keep activator concentration, substrate age and loading mode visible in a repair-material comparison.",
    "glossary": "OPC = ordinary Portland cement; FA = fly ash; ASTM C882 is the source’s cited bond-test framework.",
    "relatedStudy": "/studies/ke-b22-004",
    "sourceTitle": "Bonding Strength Characteristics of FA-Based Geopolymer Paste as a Repair Material When Applied on OPC Substrate",
    "doi": "10.3390/app10093321",
    "checked": "2026-10-19",
    "citation": "Applied Sciences (2020), DOI 10.3390/app10093321. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2076-3417/10/9/3321",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep activator concentration, substrate age and loading mode visible in a repair-material comparison.",
      "Decide whether the target is mixed-mode/slant shear, direct tension or substrate-coating adhesion. Select an appropriate independent protocol.",
      "A source bond value cannot be ranked directly against a pull-off result from a different geometry or failure mode."
    ],
    "facts": [
      {
        "title": "Activator variables",
        "locator": "Activator-preparation passage",
        "text": "NaOH concentrations of 6, 8, 10 and 14 M are used. Solutions rest 24 h; the source reports a silicate/hydroxide solution mass ratio of 2.5."
      },
      {
        "title": "Substrate history",
        "locator": "Substrate preparation",
        "text": "OPC substrate specimens are water-cured for 28 days before the repair comparison. This is not the repair paste’s test age."
      },
      {
        "title": "Bond method",
        "locator": "Bond-test passage citing ASTM C882",
        "text": "The paper uses the cited C882 approach to evaluate old/new material bond. Its mixed stress state must not be reported as a pure tensile pull-off result."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Conditional activator split",
          "For A solution mass at SS/SH = 2.5: SS = 2.5A/3.5; SH = A/3.5",
          "The total A and solution compositions remain unresolved."
        ],
        [
          "Stress definition",
          "Applied load / source-defined bond area",
          "Retain geometry and loading angle; no automatic conversion to pull-off MPa."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Choose the bond question",
        "Decide whether the target is mixed-mode/slant shear, direct tension or substrate-coating adhesion. Select an appropriate independent protocol."
      ],
      [
        "Control the OPC substrate",
        "Record age, moisture, roughness and cleaning at repair application. Do not assign the substrate’s 28-day cure to the new paste."
      ],
      [
        "Qualify the activator solutions",
        "Record concentration, preparation age and silicate composition before interpreting a molarity effect."
      ],
      [
        "Retain failure location",
        "Identify interface, old-substrate and repair-material failures separately. Report geometry with every measured stress."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete paste ratio, interface preparation, post-repair cure/test age and uncertainty remain unextracted.",
      "A source bond value cannot be ranked directly against a pull-off result from a different geometry or failure mode.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Activator-preparation passage",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Activator-preparation passage",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Activator-preparation passage",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Bond-test passage citing ASTM C882",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "slag-fly-ash-red-mud-interface",
    "title": "Slag, fly ash and red mud: compare three bond-test modes separately",
    "summary": "Use a ternary repair-mortar study to separate matrix strength from substrate-interface behavior.",
    "glossary": "GPM = geopolymer mortar; OPC = cement substrate; S/F/R = source slag/fly-ash/red-mud formulation labels.",
    "relatedStudy": "/studies/ke-b19-016",
    "sourceTitle": "Interfacial Behavior of Slag, Fly Ash, and Red Mud-Based Geopolymer Mortar with Concrete Substrate: Mechanical Properties and Microstructure",
    "doi": "10.3390/buildings14030652",
    "checked": "2026-10-19",
    "citation": "Buildings (2024), DOI 10.3390/buildings14030652. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2075-5309/14/3/652",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Use a ternary repair-mortar study to separate matrix strength from substrate-interface behavior.",
      "Keep the old OPC and new mortar in separate ingredient and cure ledgers.",
      "Source selection does not establish universal bond improvement, field durability or supplier-grade equivalence."
    ],
    "facts": [
      {
        "title": "Study design",
        "locator": "Experimental overview",
        "text": "Different slag, fly-ash and red-mud proportions are compared with a cement-mortar control."
      },
      {
        "title": "Substrate and tests",
        "locator": "§2.2; Figure 2",
        "text": "The study prepares C30 OPC substrates for splitting tension, double-sided shear and three-point bending. Substrates spend 1 d before demolding and then 28 d in humid standard curing."
      },
      {
        "title": "Surface preparation",
        "locator": "Interface roughening description",
        "text": "Mechanical grinding/chiseling and cleaning are used, including preparation from fractured substrate surfaces for the bending configuration."
      },
      {
        "title": "Reported selection",
        "locator": "Results summary",
        "text": "S33F33R33 is the paper’s selected blend in its tested series; it is not a general optimum for other red muds or substrates."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Substrate water/cement check",
          "205/402 ≈ 0.510",
          "This comes from the stated OPC substrate recipe; it is not the GPM water/binder ratio."
        ],
        [
          "Nominal blend labels",
          "33 + 33 + 33 = 99",
          "Treat the code as a label. Do not repair a missing percentage by inventing a fourth component."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Document both materials",
        "Keep the old OPC and new mortar in separate ingredient and cure ledgers."
      ],
      [
        "Define the interface preparation",
        "Measure roughness and moisture and keep the grinding/chiseling method fixed within each test series."
      ],
      [
        "Preserve test-mode identity",
        "Use separate records for split tension, double shear and bending, including geometry and failure locus."
      ],
      [
        "Confirm a selected blend independently",
        "Test a new batch and realistic substrate conditions before treating a laboratory selection as a repair specification."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete ternary mixture/activator ledger, roughness quantification and uncertainty remain unextracted.",
      "Source selection does not establish universal bond improvement, field durability or supplier-grade equivalence.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Interface roughening description",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Experimental overview",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Experimental overview",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Results summary",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "pp-foam-volume-versus-fiber-dose",
    "title": "PP-reinforced foam: foam volume and fiber dose use different ledgers",
    "summary": "Control foam generation and density before assigning a thermal change to fibers.",
    "glossary": "PP = polypropylene; FA = fly ash; foam volume fraction is distinct from a fiber mass or volume percentage.",
    "relatedStudy": "/studies/ke-b23-015",
    "sourceTitle": "Mechanical Properties and Thermal Conductivity of Fly Ash-Based Geopolymer Foams with Polypropylene Fibers",
    "doi": "10.3390/app11114886",
    "checked": "2026-10-19",
    "citation": "Applied Sciences (2021), DOI 10.3390/app11114886. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2076-3417/11/11/4886",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Control foam generation and density before assigning a thermal change to fibers.",
      "Record surfactant identity, solution ratio units, expansion, foam density and drainage before adding it to paste.",
      "No thermal values are digitized and no complete foam recipe or scale-up equivalence is supplied."
    ],
    "facts": [
      {
        "title": "Materials and mixing",
        "locator": "Preparation passage",
        "text": "FA, PP and sodium activator are mixed for 5 min at 140 rpm in a Hobart mixer."
      },
      {
        "title": "Foam generation",
        "locator": "Foam-preparation passage",
        "text": "A surfactant/water ratio printed as 1:40 mL and a 5 kPa foam-generator setting are reported. The exact ratio units need confirmation before reproduction."
      },
      {
        "title": "Design and result",
        "locator": "Abstract; thermal-conductivity discussion",
        "text": "Foam volume levels are 40 and 60%; PP doses are labeled 0, 0.25 and 0.50%. The fiber denominator remains unresolved here, and thermal trends differ between foam-volume arms."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Conditional foam allocation",
          "For a proposed 10 L final nominal volume: 4 L or 6 L preformed foam",
          "Final yield and foam survival must be measured; nominal mixed volumes need not add exactly."
        ],
        [
          "Mixer comparison",
          "5 min × 140 rev/min = 700 nominal revolutions",
          "This does not establish shear energy or equivalence to another mixer."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Qualify the foam first",
        "Record surfactant identity, solution ratio units, expansion, foam density and drainage before adding it to paste."
      ],
      [
        "Keep fiber basis explicit",
        "Resolve source dose denominator and record fiber geometry. Do not convert the printed percentage to grams by assumption."
      ],
      [
        "Track the mixing sequence",
        "Record foam addition, mixing intensity and changes in fresh density; distinguish generated foam from retained pores."
      ],
      [
        "Compare matched dry states",
        "Measure density, thermal conductivity and mechanical properties at documented age/moisture. Do not rank fibers across the two foam-volume arms without controlling density."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Activator masses, PP basis, foam-ratio units, cure and full test protocol remain incomplete.",
      "No thermal values are digitized and no complete foam recipe or scale-up equivalence is supplied.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Preparation passage",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Preparation passage",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Preparation passage",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Abstract; thermal-conductivity discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "metakaolin-foam-thermal-versus-fire",
    "title": "Metakaolin foam: annealing a coupon and exposing an assembly are different tests",
    "summary": "Separate manufacturing, bulk heat treatment and fire exposure before comparing foam performance.",
    "glossary": "BGF = source basalt-containing geopolymer foam; Baucis LK = commercial two-component source binder system.",
    "relatedStudy": "/studies/ke-b24-008",
    "sourceTitle": "Study on Temperature-Dependent Properties and Fire Resistance of Metakaolin-Based Geopolymer Foams",
    "doi": "10.3390/polym12122994",
    "checked": "2026-10-19",
    "citation": "Polymers (2020), DOI 10.3390/polym12122994. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2073-4360/12/12/2994",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Separate manufacturing, bulk heat treatment and fire exposure before comparing foam performance.",
      "Obtain component composition and source lot before considering a reproduction with generic reagents.",
      "Potential overlap with other commercial MK/basalt foam papers is unresolved; no independent replication or fire-rating claim."
    ],
    "facts": [
      {
        "title": "System",
        "locator": "Materials and preparation",
        "text": "A potassium-activated commercial MK system is combined with ground basalt fibers and aluminum powder."
      },
      {
        "title": "Sequence",
        "locator": "Three-step preparation passage",
        "text": "Binder and potassium solution are mixed first, then basalt is incorporated, then aluminum powder is added to form foam."
      },
      {
        "title": "Evidence scope",
        "locator": "Study objective and characterization description",
        "text": "The paper examines temperature-dependent properties, porous/crystal/chemical changes after heat treatment, and fire resistance as distinct parts of its investigation."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Retention definition",
          "R = property after documented heat exposure / matched reference property",
          "Test temperature, conditioning and measurement temperature must all be stated."
        ],
        [
          "Porosity accounting",
          "Apparent volume includes pores; skeletal volume excludes accessible pores according to method",
          "Different density methods cannot be substituted without a definition."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Preserve the commercial binder identity",
        "Obtain component composition and source lot before considering a reproduction with generic reagents."
      ],
      [
        "Control gas-generation timing",
        "Qualify the aluminum dose, solution chemistry and handling conditions; keep its final addition distinct from precursor mixing."
      ],
      [
        "Separate the thermal histories",
        "Use separate specimen records for cure, bulk heat treatment and fire-assembly exposure. Record ramps, dwell and cooling."
      ],
      [
        "Measure residual properties consistently",
        "Compare conditioned reference and exposed specimens at matched age and measurement state. Treat assembly integrity and back-face temperature separately from coupon strength."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete batch, cure and exposure program, numerical series and uncertainty remain unextracted.",
      "Potential overlap with other commercial MK/basalt foam papers is unresolved; no independent replication or fire-rating claim.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Materials and preparation",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Materials and preparation",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Materials and preparation",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Study objective and characterization description",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "waste-glass-replacement-and-bioassays",
    "title": "Waste glass in metakaolin: replacement, particle size and biological tests stay separate",
    "summary": "Use a glass-replacement experiment without inferring product safety from a limited assay.",
    "glossary": "WG = ground waste container glass; MK = metakaolin; biological assay response is specific to exposure and cell/microorganism method.",
    "relatedStudy": "/studies/ke-b20-023",
    "sourceTitle": "Efficient Addition of Waste Glass in MK-Based Geopolymers: Microstructure, Antibacterial and Cytotoxicity Investigation",
    "doi": "10.3390/polym13091493",
    "checked": "2026-10-19",
    "citation": "Dal Poggetto, Catauro, Crescente & Leonelli. Polymers 13(9), 1493 (2021). DOI 10.3390/polym13091493.",
    "source": "https://www.mdpi.com/2073-4360/13/9/1493",
    "sourceLabel": "Read the source article",
    "license": "CC BY 4.0 stated in the indexed primary permissions section. Original editorial notes; source tables and figures are not reproduced.",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Use a glass-replacement experiment without inferring product safety from a limited assay.",
      "Record container stream, contamination, composition and grinding size rather than using generic recycled glass.",
      "Biological results and an environmental framing do not establish universal biocompatibility, regulatory clearance or an LCA benefit."
    ],
    "facts": [
      {
        "title": "Mix and basis",
        "locator": "§§2.1–2.2",
        "text": "The reference uses 100 g MK, 48 mL 8 M NaOH solution and 68 mL sodium silicate. Glass replaces 20, 50 or 60 wt% of MK using two size ranges, 37–53 and 75–105 µm."
      },
      {
        "title": "Specimens and cure",
        "locator": "§2.2",
        "text": "Capped specimens are 20 mm diameter and 40 mm high, cured at room temperature/100% RH, with opening at 7, 14 or 28 days for characterization."
      },
      {
        "title": "Multiple evidence types",
        "locator": "Study scope and conclusions",
        "text": "Mechanical, microstructural, antibacterial and cytotoxicity responses are studied. These are distinct tests; none alone establishes broad safe use."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Conditional 50% precursor ledger",
          "50 g MK + 50 g WG replaces the 100 g precursor reference",
          "Solution volumes remain source quantities, not inferred solution masses."
        ],
        [
          "Nominal specimen volume",
          "π × (0.010 m)² × 0.040 m ≈ 12.6 mL",
          "Geometry arithmetic only; not an estimate of batch yield or replicate count."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Qualify the glass",
        "Record container stream, contamination, composition and grinding size rather than using generic recycled glass."
      ],
      [
        "Hold particle-size and replacement factors apart",
        "Compare both sizes at matched replacement and cure before attributing an effect to chemistry."
      ],
      [
        "Complete the solution ledger",
        "Record density and composition of both solutions. Modulus and volume alone do not determine physical water or active alkali."
      ],
      [
        "Keep biological claims assay-specific",
        "Retain leachate conditioning, organisms/cells, controls and exposure duration. Require application-specific assessment before product-safety or antimicrobial claims."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete assay protocols, solution assay/density and uncertainty remain unextracted; supplements are listed but not inspected.",
      "Biological results and an environmental framing do not establish universal biocompatibility, regulatory clearance or an LCA benefit.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "§2.2",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "§§2.1–2.2",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "§§2.1–2.2",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Study scope and conclusions",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": "Supplementary Materials, Figures S1/S3/S4/S6 listings",
        "note": "A source supplement listing was observed; the asset was not retrieved, licensed or extracted."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "olive-pine-ash-precursor-boundary",
    "title": "Olive–pine bottom ash: biomass ash is not biochar",
    "summary": "Track replacement and heated curing without confusing combustion residue with a carbon-rich pyrolysis additive.",
    "glossary": "OPBA = olive/pine pruning bottom ash; MK = metakaolin; the reported hydroxide concentration is not a preparation instruction.",
    "relatedStudy": "/studies/ke-b21-013",
    "sourceTitle": "Effect of Olive-Pine Bottom Ash on Properties of Geopolymers Based on Metakaolin",
    "doi": "10.3390/ma13040901",
    "checked": "2026-10-19",
    "citation": "Materials (2020), DOI 10.3390/ma13040901. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/13/4/901",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Track replacement and heated curing without confusing combustion residue with a carbon-rich pyrolysis additive.",
      "Record feedstock blend, furnace conditions, loss on ignition and ash collection point.",
      "The initial-heating-plus-later-cure wording needs a fixed age origin; no ambient-only performance or carbon-sequestration benefit is inferred."
    ],
    "facts": [
      {
        "title": "Replacement design",
        "locator": "Study objective and mix series",
        "text": "Combustion bottom ash replaces MK at 0, 25, 50, 75 and 100 wt%. It is not untreated biomass or pyrolysis biochar."
      },
      {
        "title": "Activator and cure",
        "locator": "Preparation and curing passages",
        "text": "The reported activator preparation combines hydroxide solution and sodium silicate. Specimens receive 24 h at 60°C in a water-saturated chamber, then room-temperature curing for 28 days."
      },
      {
        "title": "Unfavorable direction",
        "locator": "Strength/microstructure discussion",
        "text": "The source associates reduced mechanical performance with less reacted gel, unreacted ash and visible microcracking; the proposed causes are interpretations, not a validated universal mechanism."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Proposed 25% precursor normalization",
          "At 1000 g precursor: 750 g MK + 250 g OPBA",
          "This fixes only replacement mass, not activator or absorbed water."
        ],
        [
          "Molarity consistency check",
          "M = moles solute / measured final solution volume",
          "The source’s 80 g NaOH/195 g water wording does not supply final volume; do not assume it reproduces the stated 8 M label."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Document combustion residue identity",
        "Record feedstock blend, furnace conditions, loss on ignition and ash collection point."
      ],
      [
        "Control replacement and moisture",
        "Use weighed dry-equivalent precursors and quantify ash water uptake before interpreting workability."
      ],
      [
        "Resolve the activator independently",
        "Check concentration using a qualified preparation/measurement protocol; retain conflicting mass and molarity descriptions as a hold."
      ],
      [
        "Preserve heat and drying history",
        "Log the heated stage and subsequent room storage separately. Compare strength and cracking at matched total age and moisture."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete solution/solid ratio, ash lot chemistry and individual uncertainty remain unextracted.",
      "The initial-heating-plus-later-cure wording needs a fixed age origin; no ambient-only performance or carbon-sequestration benefit is inferred.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Preparation and curing passages",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Study objective and mix series",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Study objective and mix series",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Strength/microstructure discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "nickel-slag-phosphate-foamer",
    "title": "Acid-activated nickel-slag foams: foamer form is part of the experiment",
    "summary": "Keep phosphoric-acid activation, foam stabilization and early strength distinct from alkaline foam recipes.",
    "glossary": "HMNS = high-magnesium nickel slag; FA = fly ash; SDS = sodium dodecyl sulfate; acid activation is outside the alkaline calculator model.",
    "relatedStudy": "/studies/ke-b24-006",
    "sourceTitle": "Preparation and Properties of Phosphoric Acid-Based Porous Geopolymer with High Magnesium Nickel Slag and Fly Ash",
    "doi": "10.3390/min13040564",
    "checked": "2026-10-19",
    "citation": "Minerals (2023), DOI 10.3390/min13040564. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2075-163X/13/4/564",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep phosphoric-acid activation, foam stabilization and early strength distinct from alkaline foam recipes.",
      "Record phase composition, residual contaminants and solution concentration before treating a new nickel slag as equivalent.",
      "No complete batch, predicted strength or validated insulation/fire application is supplied."
    ],
    "facts": [
      {
        "title": "Materials",
        "locator": "Preparation overview",
        "text": "HMNS and FA are activated with phosphoric acid; hydrogen peroxide and aluminum powder are alternative foamers and SDS is the stabilizer."
      },
      {
        "title": "Early evidence",
        "locator": "Three-day peroxide-series strength discussion",
        "text": "The paper reports a range of three-day peroxide-series compressive results. A range across mixtures is not a time-dependent curve or a universal best foamer."
      },
      {
        "title": "Mechanistic interpretation",
        "locator": "Foamer-form and reaction discussion",
        "text": "The source discusses earlier/faster bubble formation with a liquid foamer relative to solid powder and describes encapsulation and gelation contributions. These are condition-dependent interpretations."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Peroxide product ledger",
          "Active H₂O₂ = product mass × documented active fraction",
          "Carrier water remains part of the liquid ledger; product percent and active-agent percent differ."
        ],
        [
          "Density comparison",
          "ρdry = constant dry mass / measured external volume",
          "Compare foamer arms at documented dry condition rather than assigning a strength change to chemistry alone."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Qualify the slag and acid",
        "Record phase composition, residual contaminants and solution concentration before treating a new nickel slag as equivalent."
      ],
      [
        "Resolve foamer and stabilizer bases",
        "Separate aluminum/peroxide quantities, peroxide water, SDS and acid/solid ratio. Use compatible laboratory protocols."
      ],
      [
        "Track foam kinetics",
        "Measure expansion, drainage, collapse and temperature as functions of time after the last reactive addition."
      ],
      [
        "Measure multiple responses",
        "Compare early and later strength, density, pore structure and water stability under matched curing. Do not transfer an alkaline foaming dose into this acid system."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Exact acid ratio/concentration, agent/stabilizer doses, cure and uncertainty remain unextracted.",
      "No complete batch, predicted strength or validated insulation/fire application is supplied.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Preparation overview",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Preparation overview",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Preparation overview",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Foamer-form and reaction discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "acoustic-foam-architecture-versus-material",
    "title": "Acoustic geopolymer structures: absorption depends on the architecture",
    "summary": "Separate perforation and mechanical geometry effects from the intrinsic behavior of a foam.",
    "glossary": "SAC = sound absorption coefficient; DMA = dynamic mechanical analysis; sound absorption is different from transmission loss.",
    "relatedStudy": "/studies/ke-b24-007",
    "sourceTitle": "Acoustic Applications of a Foamed Geopolymeric-Architected Metamaterial",
    "doi": "10.3390/app14031207",
    "checked": "2026-10-19",
    "citation": "Applied Sciences (2024), DOI 10.3390/app14031207. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2076-3417/14/3/1207",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Separate perforation and mechanical geometry effects from the intrinsic behavior of a foam.",
      "Record thickness, perforation size, open area, backing and air gap separately from bulk material composition.",
      "No room-scale acoustic rating, universal absorption improvement or transmission-loss value is inferred."
    ],
    "facts": [
      {
        "title": "Material",
        "locator": "Study description",
        "text": "The foam combines geopolymer chemistry with an oligomeric polysiloxane and aluminum-powder foaming route."
      },
      {
        "title": "Architecture comparison",
        "locator": "Figure 11 discussion",
        "text": "Solid and perforated single-layer architectures are compared; the discussed samples have 40 mm thickness."
      },
      {
        "title": "Measurement scope",
        "locator": "Acoustic and dynamic-mechanical methods",
        "text": "The paper uses impedance-tube/acoustic characterization and relates frequency-dependent behavior to dynamic-mechanical response. No numeric spectrum is extracted here."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Absorption definition",
          "α = absorbed incident acoustic power / incident power",
          "A coefficient is not a decibel transmission-loss result."
        ],
        [
          "Frequency dependence",
          "Compare α(f) at the same frequency, thickness and backing",
          "One peak value cannot stand in for broadband room or wall performance."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Fix the architecture",
        "Record thickness, perforation size, open area, backing and air gap separately from bulk material composition."
      ],
      [
        "Control specimen fit",
        "Document edge sealing and impedance-tube geometry so leakage is not mistaken for absorption."
      ],
      [
        "Link mechanics carefully",
        "Record DMA frequency/temperature and acoustic test conditions before connecting the response mechanisms."
      ],
      [
        "Compare complete spectra",
        "Retain measured frequency bands and repeated specimens; distinguish material/architectural hypotheses from demonstrated building sound isolation."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete foam recipe, cure, tube procedure, spectrum values and uncertainty remain unextracted.",
      "No room-scale acoustic rating, universal absorption improvement or transmission-loss value is inferred.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Acoustic and dynamic-mechanical methods",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Study description",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Study description",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Acoustic and dynamic-mechanical methods",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "carbon-textile-thermal-directions",
    "title": "Carbon fabrics: name the heat-flow direction before comparing conductivity",
    "summary": "Keep fabric architecture, void fraction and unit conversions visible in anisotropic thermal measurements.",
    "glossary": "Vf/Vm/Vv = fiber/matrix/void volume fractions; Cp = specific heat; α = thermal diffusivity; areal fabric mass is not volumetric density.",
    "relatedStudy": "/studies/ke-b24-013",
    "sourceTitle": "Anisotropic Heat Transfer in Plane of Carbon Fabrics Reinforced Geopolymer Composite",
    "doi": "10.3390/app12136624",
    "checked": "2026-10-19",
    "citation": "Applied Sciences (2022), DOI 10.3390/app12136624. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2076-3417/12/13/6624",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep fabric architecture, void fraction and unit conversions visible in anisotropic thermal measurements.",
      "Document fabric weave, orientation, areal mass, number of layers and measured cured thickness.",
      "No isotropic conductivity, certified insulation category or supplier substitution is inferred from the source framing."
    ],
    "facts": [
      {
        "title": "Fabrication",
        "locator": "§2.2; Figure 5 description",
        "text": "The source manually stacks ten geopolymer-impregnated carbon-fabric layers, then uses compaction, vacuum bagging and curing."
      },
      {
        "title": "Thermal model",
        "locator": "Thermal-conductivity equation and unit definitions",
        "text": "Conductivity is related to density, heat capacity and diffusivity; the source gives density in g/cm³, Cp in J/g/K and diffusivity in m²/s."
      },
      {
        "title": "Architecture scope",
        "locator": "Study objective and thermal interpretation",
        "text": "Parallel/perpendicular heat paths and fabric arrangement are considered with experimental and theoretical results. Direction labels are required for comparison."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Unit closure",
          "1 g/cm³ × 1 J/g/K = 10⁶ J/m³/K",
          "Multiply by diffusivity in m²/s to obtain W/m/K. Do not mix unconverted density/heat-capacity units."
        ],
        [
          "Volume fractions",
          "Vf + Vm + Vv = 1 for the defined composite volume",
          "Ten layers or a fabric g/m² label alone does not establish Vf."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Record the layup",
        "Document fabric weave, orientation, areal mass, number of layers and measured cured thickness."
      ],
      [
        "Measure compaction and voids",
        "Track bagging pressure/history, mass retention, dimensions and an appropriate void method before calculating fiber fraction."
      ],
      [
        "Label every heat direction",
        "Keep in-plane warp/weft and through-thickness measurements separate and record contact resistance."
      ],
      [
        "Validate theory against its domain",
        "Check temperature, moisture, radiation assumptions and boundary conditions before applying a fitted conductivity to another architecture."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Full matrix ledger, bagging/cure protocol, thermal instrument settings and uncertainty remain unextracted.",
      "No isotropic conductivity, certified insulation category or supplier substitution is inferred from the source framing.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "§2.2; Figure 5 description",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "§2.2; Figure 5 description",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "§2.2; Figure 5 description",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Study objective and thermal interpretation",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "organic-slag-model-gel-versus-paste",
    "title": "Organic toughening of slag: model gels and real paste answer different questions",
    "summary": "Keep molecular interpretations, compaction and bulk mechanical behavior as separate evidence layers.",
    "glossary": "SCA = silane coupling agent; C–A–S–H = calcium aluminosilicate hydrate; model gel composition is not a commercial slag assay.",
    "relatedStudy": "/studies/ke-b19-009",
    "sourceTitle": "Effect of Organic Polymers on Mechanical Property and Toughening Mechanism of Slag Geopolymer Matrix",
    "doi": "10.3390/polym14194214",
    "checked": "2026-10-19",
    "citation": "Polymers (2022), DOI 10.3390/polym14194214. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2073-4360/14/19/4214",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep molecular interpretations, compaction and bulk mechanical behavior as separate evidence layers.",
      "Label synthetic gel, compacted paste and any ordinary-cast control with different identities.",
      "No synthetic-gel stoichiometry, analytical peak assignment or chemical mechanism is promoted to a verified whole-paste result."
    ],
    "facts": [
      {
        "title": "Experimental scope",
        "locator": "Study objective and preparation description",
        "text": "Silane coupling agents and water-soluble polymers are compared in slag paste using a vibration/pressure processing route."
      },
      {
        "title": "Model system",
        "locator": "Synthetic-gel preparation passage",
        "text": "A C–A–S–H model with C/S = 0.8 and A/S = 0.2 is used to investigate organic interactions alongside real slag-based material."
      },
      {
        "title": "Interpretation",
        "locator": "Spectroscopy/toughening discussion",
        "text": "The authors connect spectral changes and polymer reactive groups to network modification and flexural toughening. Peak shifts alone are not a complete mechanical mechanism."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Model-gel basis",
          "C/S = 0.8 and A/S = 0.2 describe the stated model",
          "Do not assign those ratios to the total slag batch or its gel without measurement."
        ],
        [
          "Mechanical comparison",
          "Toughness = protocol-defined area under a load/displacement or stress/strain curve",
          "Peak flexural strength and integrated toughness are different responses."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Separate the specimen families",
        "Label synthetic gel, compacted paste and any ordinary-cast control with different identities."
      ],
      [
        "Document polymer chemistry",
        "Record functional groups, solids and dose bases before treating polymer names as interchangeable."
      ],
      [
        "Control the processing factor",
        "Compare pressure/vibration conditions independently from polymer addition so densification is not attributed solely to chemistry."
      ],
      [
        "Require converging evidence",
        "Retain spectra, pore measurements and complete mechanical curves with matched controls rather than inferring toughness from one peak shift."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete polymer series, press/vibration settings, cure, mechanical protocol and uncertainty remain unextracted.",
      "No synthetic-gel stoichiometry, analytical peak assignment or chemical mechanism is promoted to a verified whole-paste result.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Study objective and preparation description",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Study objective and preparation description",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Study objective and preparation description",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Spectroscopy/toughening discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "hydrophilic-polymers-slag-processing",
    "title": "Hydrophilic polymers in slag: compare processing before ranking additions",
    "summary": "Keep activator selection and molding method visible in an organic–inorganic composite study.",
    "glossary": "PVA = polyvinyl alcohol polymer in this study, not necessarily a fiber; PAA = polyacrylic acid; CPAM = source hydrophilic polymer designation.",
    "relatedStudy": "/studies/ke-b19-015",
    "sourceTitle": "The Mechanical Performance and Reaction Mechanism of Slag-Based Organic–Inorganic Composite Geopolymers",
    "doi": "10.3390/ma17030734",
    "checked": "2026-10-19",
    "citation": "Materials (2024), DOI 10.3390/ma17030734. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/17/3/734",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep activator selection and molding method visible in an organic–inorganic composite study.",
      "Preserve the screening basis and do not change modulus or concentration during a nominal polymer-only comparison.",
      "Possible relation to other slag/polymer work is unresolved; similar mechanisms do not establish independent replication."
    ],
    "facts": [
      {
        "title": "Matrix screening",
        "locator": "§3.1; Table 2 discussion",
        "text": "Activator type, modulus and concentration are screened before choosing the slag-based substrate for polymer comparisons."
      },
      {
        "title": "Polymer and process series",
        "locator": "Abstract and preparation overview",
        "text": "PVA, PAA and CPAM pastes are prepared through ordinary molding and pressure-mixing processes. Polymer identity and process both vary."
      },
      {
        "title": "Mechanism limits",
        "locator": "Spectral discussion for 2.0% PVA",
        "text": "A weak band near 1180 cm⁻¹ is assigned by the authors to a possible organic–inorganic reaction. This is a reported interpretation, not independent bond verification."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Factor separation",
          "Observed change = material + processing + interaction contributions",
          "This is a planning decomposition, not a fitted source equation."
        ],
        [
          "Mass bookkeeping",
          "Polymer solution = documented active solids + carrier water",
          "A hydrophilic polymer dose is not a fiber volume fraction or an unqualified water-reducer dose."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Freeze the selected activator",
        "Preserve the screening basis and do not change modulus or concentration during a nominal polymer-only comparison."
      ],
      [
        "Document polymer form",
        "Separate dissolved polymer, solution carrier and any fiber reinforcement in the records."
      ],
      [
        "Compare both molding routes",
        "Use the same formulation under ordinary and pressure-assisted processing to isolate processing effects."
      ],
      [
        "Check the proposed chemistry",
        "Compare spectral evidence with controls, pore structure and bulk mechanics before claiming covalent reinforcement."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Full Table 2 doses, process pressure/time, cure, analytical uncertainty and complete outcome inventory remain unextracted.",
      "Possible relation to other slag/polymer work is unresolved; similar mechanisms do not establish independent replication.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "§3.1; Table 2 discussion",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "§3.1; Table 2 discussion",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "§3.1; Table 2 discussion",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Spectral discussion for 2.0% PVA",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "one-part-batch-reproducibility",
    "title": "One-part concrete: repeat batches, not just specimens",
    "summary": "Use a study of batch reproducibility to plan uncertainty at the right experimental level.",
    "glossary": "GPC = geopolymer concrete; splitting tensile and direct tensile tests are different measurement methods; a normalized comparison is not a raw measurement.",
    "relatedStudy": "/studies/ke-b19-010",
    "sourceTitle": "Mechanical Properties and Reproducibility of One-Part Ambient-Cured Slag and Fly Ash-Based Geopolymer Concrete",
    "doi": "10.3390/buildings16040707",
    "checked": "2026-10-19",
    "citation": "Buildings (2026), DOI 10.3390/buildings16040707. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/2075-5309/16/4/707",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Use a study of batch reproducibility to plan uncertainty at the right experimental level.",
      "Choose batches made on different occasions and track materials, operator and ambient conditions rather than increasing specimens from one mix only.",
      "The study’s reproducibility conclusion is limited to its formulations and conditions; no universal reproducibility or tensile conversion rule."
    ],
    "facts": [
      {
        "title": "Objective",
        "locator": "Introduction, three underexplored aspects",
        "text": "The paper examines batch-to-batch reproducibility, fracture energy/direct tension, and the relationship of splitting and direct tensile response in one-part slag/FA concrete."
      },
      {
        "title": "Process evidence",
        "locator": "Figures 5–6 description",
        "text": "Stepwise mixing is assigned to Figures 5 and 6, which were not visually inspected in this review. No detailed sequence is reconstructed from their existence."
      },
      {
        "title": "Comparison limit",
        "locator": "Table 14 discussion",
        "text": "Some fracture-energy comparisons are normalized to a reference compressive strength of 34.5 MPa. Those transformed comparisons must remain separate from directly measured batch results."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Nested variation",
          "Total variability can include between-batch and within-batch terms",
          "Multiple specimens from one batch do not estimate both terms."
        ],
        [
          "Normalization boundary",
          "Adjusted comparison value ≠ original measured value",
          "Retain the transformation, reference strength and original result side by side."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Plan independent batches",
        "Choose batches made on different occasions and track materials, operator and ambient conditions rather than increasing specimens from one mix only."
      ],
      [
        "Resolve the actual procedure",
        "Inspect the cited mixing figures and full methods before reproducing a named source formulation."
      ],
      [
        "Keep tensile methods separate",
        "Document splitting geometry, direct-tension gauge/fixture and fracture test interpretation independently."
      ],
      [
        "Analyze nested uncertainty",
        "Retain every batch/specimen ID and inspect occasional high scatter rather than collapsing it into a single favorable mean."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Mix masses, solid activator identity, complete cure regimes, batch counts and variance estimates remain unextracted.",
      "The study’s reproducibility conclusion is limited to its formulations and conditions; no universal reproducibility or tensile conversion rule.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Introduction, three underexplored aspects",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Introduction, three underexplored aspects",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Introduction, three underexplored aspects",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Table 14 discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "ceramic-fines-conditioning-and-absorption",
    "title": "Recycled ceramic fines: absorption conditioning is part of the result",
    "summary": "Keep mechanical prisms and dried absorption specimens in separate test histories.",
    "glossary": "CF = ceramic fines; A/B = source alkaline activator/binder mass ratio; dry mass is a method-defined state.",
    "relatedStudy": "/studies/ke-b20-024",
    "sourceTitle": "Properties of Geopolymer Mixtures Incorporating Recycled Ceramic Fines",
    "doi": "10.3390/ma17081740",
    "checked": "2026-10-19",
    "citation": "Materials (2024), DOI 10.3390/ma17081740. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/17/8/1740",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep mechanical prisms and dried absorption specimens in separate test histories.",
      "Record ceramic origin, grinding history, final size and moisture. Initial coarse crushing is not the final particle distribution.",
      "An oven-conditioned absorption result is not a direct estimate of field moisture behavior or durability."
    ],
    "facts": [
      {
        "title": "Material and liquid basis",
        "locator": "Materials/preparation passage",
        "text": "Ceramic blocks are crushed and processed into fines; alkaline activator is added at 55% of binder mass to maintain workability."
      },
      {
        "title": "Geometry and mechanics",
        "locator": "§2.2",
        "text": "The source prepares 40 × 40 × 160 mm prisms and cites EN 196-1:2016 for flexural/compressive tests."
      },
      {
        "title": "Absorption conditioning",
        "locator": "§2.2, water absorbability",
        "text": "After 28-day curing, three specimens per series are selected for 85°C drying to constant mass before dry/saturated mass comparison."
      },
      {
        "title": "Selected result",
        "locator": "Porosity discussion",
        "text": "The lowest total porosity in the tested series is associated with about 35% CF. This is not a universal optimum."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Activator normalization",
          "0.55 × 1000 g binder = 550 g activator solution",
          "Solution water/solids and the binder definition still require reconciliation."
        ],
        [
          "Water absorption",
          "(msaturated − mdry) / mdry × 100",
          "The 85°C dry-state method belongs with the value; it is not the material curing temperature."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Qualify the fines stream",
        "Record ceramic origin, grinding history, final size and moisture. Initial coarse crushing is not the final particle distribution."
      ],
      [
        "Resolve the binder denominator",
        "Separate reactive precursor, ceramic replacement and any inert aggregate before applying A/B."
      ],
      [
        "Preserve specimen histories",
        "Use distinct records for mechanical tests and absorption specimens subjected to oven drying."
      ],
      [
        "Check the selected fraction independently",
        "Compare porosity, water uptake, strength and workability in new batches rather than optimizing on one response alone."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Complete fines/precursor ledger, activator chemistry, cure and spread definitions remain unextracted.",
      "An oven-conditioned absorption result is not a direct estimate of field moisture behavior or durability.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "Materials/preparation passage",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "Materials/preparation passage",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "Materials/preparation passage",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Porosity discussion",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  },
  {
    "id": "reactive-mgo-dose-and-erratum",
    "title": "Reactive MgO: define the total-solids dose and review the erratum",
    "summary": "Keep MgO activity and shrinkage type separate while retaining an unresolved source-status notice.",
    "glossary": "MgO = reactive magnesium oxide; chemical, autogenous and drying shrinkage use different methods and reference states.",
    "relatedStudy": "/studies/ke-b23-013",
    "sourceTitle": "Effects of Reactive MgO on the Reaction Process of Geopolymer",
    "doi": "10.3390/ma12030526",
    "checked": "2026-10-19",
    "citation": "Materials (2019), DOI 10.3390/ma12030526. Full authorship is available at the linked publication record.",
    "source": "https://www.mdpi.com/1996-1944/12/3/526",
    "sourceLabel": "Read the source article",
    "license": "Original editorial factual notes and independent planning guidance from indexed primary text. Exact full-text license/version not independently established in this batch; no raw paper, figures or complete tables retained or reproduced.",
    "accessNote": "Partial AI review of indexed primary article text, not a complete PDF or visual review. Earlier session direct-access trials encountered publisher rate limits and PMC browser challenges; these guides use indexed text. Source locators identify the inspected passages; unknowns remain unresolved. No human/domain review or independent replication is claimed.",
    "highlights": [
      "Keep MgO activity and shrinkage type separate while retaining an unresolved source-status notice.",
      "Read the original and erratum together before treating author identity or affected claims as reconciled.",
      "Full starting geopolymer identity, cure, activity/dose matrix and uncertainty remain unextracted."
    ],
    "facts": [
      {
        "title": "Dose basis",
        "locator": "§2.2; Table 3",
        "text": "MgO is 4–12% of combined geopolymer plus reactive-MgO mass. The source uses W/S 0.38 and a flow criterion of 180 ± 5 mm."
      },
      {
        "title": "Methods",
        "locator": "§2.2",
        "text": "Mechanical tests are described at 3, 7 and 28 days with the cited ASTM C349 method; drying shrinkage refers to JC/T603-2004."
      },
      {
        "title": "Source-status hold",
        "locator": "Publisher notice; erratum DOI 10.3390/ma12091388",
        "text": "The publisher links an erratum. Indexed erratum text lists Li, Zhao and Yang with contribution/funding fields. Full reconciliation is pending; the record is excluded from assistant evidence."
      }
    ],
    "arithmetic": {
      "intro": "These checks clarify the study’s definitions or plan a new comparison. Conditional and proposed examples are not additional published measurements or executable recipes.",
      "rows": [
        [
          "Total-solids normalization",
          "At 1000 g combined solids and 6% MgO: 60 g MgO + 940 g geopolymer",
          "This differs from adding 6% to an unchanged 1000 g geopolymer mass."
        ],
        [
          "Conditional additive conversion",
          "mMgO = p × mgeopolymer / (1 − p)",
          "Use only when p is the fraction of final combined solids and the other basis is documented."
        ]
      ],
      "notes": [
        "Obtain the full source mass ledger, concentration basis and material identity before scaling. Unknown quantities stay unknown.",
        "Do not assign an unreported strength, optimum or uncertainty to any calculated or proposed variant."
      ]
    },
    "checklist": [
      [
        "Fix the source boundary",
        "Choose a named source comparison or explicitly label a new adaptation. Preserve the source DOI and document changed materials, methods and assumptions."
      ],
      [
        "Resolve the publication notice",
        "Read the original and erratum together before treating author identity or affected claims as reconciled."
      ],
      [
        "Qualify MgO activity",
        "Record activity test, particle size and lot; equal masses can hydrate and expand on different schedules."
      ],
      [
        "Preserve the total-solids denominator",
        "Keep geopolymer and additive masses in the ledger and reconcile the W/S definition separately."
      ],
      [
        "Measure each strain type independently",
        "Track time zero, moisture access, temperature and mechanical performance. Do not use one shrinkage method as a substitute for another."
      ],
      [
        "Prepare independent comparisons",
        "Predefine specimen counts, test ages, controls and independent repeat batches. Randomize practical run order and retain failed batches and missing readings with reasons."
      ],
      [
        "Review before transfer",
        "Resolve the holds with the full methods and qualified laboratory review. Keep source observations, calculated quantities and new measurements separate; this guide does not populate a ready-to-run calculator recipe."
      ]
    ],
    "holds": [
      "Erratum reconciliation is incomplete. Selected source statements are provisional editorial context, not cleared numerical evidence.",
      "Full starting geopolymer identity, cure, activity/dose matrix and uncertainty remain unextracted.",
      "Selected indexed passages only. Complete tables, figures, supplements, status notices and per-condition uncertainty have not been inventoried; no canonical observations or recipes were added."
    ],
    "inventory": [
      {
        "area": "Methods",
        "state": "partial",
        "locator": "§2.2; Table 3",
        "note": "Selected design or procedure facts read as indexed text; the complete method and reproduction protocol remain unresolved."
      },
      {
        "area": "Materials",
        "state": "partial",
        "locator": "§2.2; Table 3",
        "note": "Selected source identities recorded; no current supplier or lot equivalence established."
      },
      {
        "area": "Mix ledger",
        "state": "ambiguous",
        "locator": "§2.2; Table 3",
        "note": "Full solution composition, component masses and denominator reconciliation are incomplete. Conditional arithmetic is not a completed batch."
      },
      {
        "area": "Results",
        "state": "partial",
        "locator": "Publisher notice; erratum DOI 10.3390/ma12091388",
        "note": "Selected source statements and limitations retained; no full outcome inventory or numerical ingestion."
      },
      {
        "area": "Figures",
        "state": "not yet extracted",
        "locator": null,
        "note": "No visual inspection or graph digitization performed."
      },
      {
        "area": "Supplements",
        "state": "not yet extracted",
        "locator": null,
        "note": "Supplement existence and asset-specific rights not assessed."
      },
      {
        "area": "Uncertainty",
        "state": "not yet extracted",
        "locator": null,
        "note": "Valid specimen counts, repeat batches, spread definitions and per-condition uncertainty are not fully audited."
      }
    ]
  }
];
