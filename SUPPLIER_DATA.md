# Supplier inputs and recipe model
Checked 8 October 2026. Public source records are data provenance, not endorsement,
proof of suitability, current availability or lot-specific specifications.

## Source records
- Dynapoz 110 CR: R-E-D Industrial Products, TDS-METAKAOLIN-GEN-0925, p. 1.
  https://www.redindustrialproducts.com/_files/ugd/fa120c_946a12d3e6e64b2bb1cf993ac59c94a2.pdf
  XRF percentages copied without normalization. TiO2/P2O5/SrO sum to Other 2.17%.
  Total allocated 99.85%; 0.15% unknown. No documented moisture/basis conversion:
  using these as supplied is a disclosed dry-powder planning assumption.
- PowerPozz White: Advanced Cement Technologies, 10.150 physical/chemical properties.
  https://www.metakaolin.com/phys-chem-properties-white/
  SiO2 51–52.4, Al2O3 42.1–44.3, Fe2O3 0.30–0.50, TiO2 1.56–2.50 wt%.
  Planning values are independent arithmetic midpoints, not a real measured batch.
  TiO2 goes in Other; missing chemistry is unassigned, not guessed water.
- PQ sodium N/RU/D: manufacturer Bulletin 12-31, Table I, PDF p. 4 (EngNet mirror).
  https://www.engnetglobal.com/documents/pdfcatalog/PQS001_110412024051_Applications%20of%20Soluble%20Silicates.pdf
  Typical aqueous oxide percentages. Density converted from lb/US gal at 20 °C
  using 453.59237 g/lb and 3785.411784 mL/US gal. Historic document, not current COA.
- PQ potassium KASIL 1/6: manufacturer brochure, Figure 1, printed p. 5 / PDF p. 7.
  https://www.engnet.co.za/documents/pdfcatalog/PQS001_110412024333_Potassium%20Silicates.pdf
  Uses listed g/cm3 densities at 20 °C. Historical typical data, not specifications.

For all selected liquid silicates, water = 100 − reported oxide percentages is an
explicit two-oxide aqueous-solution assumption. It is not the generic treatment of
unknown percentages. The user acknowledges these assumptions before previewing.
Mass ratios in supplier tables must not be mistaken for molar or atomic targets.
Supplier sources describe properties/applications; no grade pair is platform tested.

## Solving
Fix precursor mass at 100 g internally, then scale the entire feasible recipe to
the requested total wet mass. Calculate species contributions with gp-chemistry.js.
For target atomic Si/Al A, solution mass x follows:
x = (A * precursor Al moles − precursor Si moles) /
    (solution Si moles per gram − A * solution Al moles per gram).
For target atomic (Na+K)/Al B, matching hydroxide feed supplies remaining alkali:
h = (B * total Al − precursor alkali − x * solution alkali) * M(MOH) / feed fraction.
One mole MOH contributes one mole alkali atoms. Feed water is entered separately;
unknown feed remainder is not converted to water.
Added water = target physical-water/non-water-mass * current non-water binder mass
              − current physical water.
Reject negative requirements beyond numerical tolerance, zero denominators,
missing targets, invalid compositions and unsupported activation systems.
These linear balances say nothing about dissolution, workable consistency, cure,
reaction products or performance. Partial precursor assays yield conditional targets.

## Persistence and tests
Supplier catalogId and optional density are stored with ingredient snapshots in v1
calculator files. Future catalog edits never rewrite already saved assays. Existing
v1 files import with blank catalog ID and absent density. Assay edits in the workbench
clear density and remove displayed volume; the user must confirm any revised density.
Browser-local save/export/import behavior and storage failure protection are retained.
Tests cover source snapshots, sodium/potassium target recovery, hydroxide feed water,
infeasible targets, mass conservation, metadata roundtrips and interactive transfer.
