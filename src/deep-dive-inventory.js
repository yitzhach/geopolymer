// Source inventory states per guide. Restates recorded audits/holds; adds no new source facts.
// Areas are fixed so a missing category stays visible instead of silently disappearing.
export const inventoryAreas=['Methods','Materials','Mix ledger','Results','Figures','Supplements','Uncertainty'];
export const inventoryStates=['not yet extracted','partial','ambiguous','not reported','not applicable','extracted','verified'];
const row=(area,state,locator,note)=>({area,state,locator,note});
const notAssessed=row('Supplements','not yet extracted',null,'Existence and rights of supplementary files not assessed in this review.');
export const deepDiveInventories={
 'ggbs-taguchi-mortar':[
  row('Methods','partial','§3.4; Figure 3','Mixing sequence, casting, cure and loading read as text. Visual check of Figure 3 not performed.'),
  row('Materials','partial','§3.2','Identities recorded. Supplier certificates, activator water fractions and SiC identity against the characterization table unresolved.'),
  row('Mix ledger','ambiguous','Table 5','Tested T2M9 row listed; free water, complete activator composition and SP dose basis unresolved.'),
  row('Results','partial','§4.1; conclusion','T2M9 28-day strength and the zero-SiC recommendation recorded; remaining rows and statistical tables not extracted.'),
  row('Figures','not yet extracted',null,'No visual review or graph-only series extraction.'),
  notAssessed,
  row('Uncertainty','not yet extracted',null,'Replicate counts and result uncertainty not established in inspected methods.')
 ],
 'biochar-replacement-and-exposure':[
  row('Methods','partial','§§2.1–2.3.6','Selected methods reused; mixing speed/time unresolved.'),
  row('Materials','ambiguous','§2.1','Biochar lot assay unqualified; a cited characterization paper does not establish this lot.'),
  row('Mix ledger','partial','§2.2; Table 2','Listed percentages reused; NaOH solution water fraction unresolved.'),
  row('Results','partial','Tables 2–5','Existing table data linked through recipe records; per-age valid-result counts unresolved.'),
  row('Figures','not yet extracted','Figure 12','Dimensional-change figure not digitized.'),
  notAssessed,
  row('Uncertainty','ambiguous',null,'Reported ± type not established.')
 ],
 'basalt-fiber-carbon-textile':[
  row('Methods','partial','§§2.1–2.2','Prism and textile-plate methods distinguished; matrix loading protocol unresolved.'),
  row('Materials','partial','§2.1','No material assay transfer. Textile pretension not quantified.'),
  row('Mix ledger','partial','§2.2; Tables 2–3','Existing matrix quantities referenced.'),
  row('Results','partial',null,'Existing matrix rows linked with their own locators; textile and impact series not extracted.'),
  row('Figures','not yet extracted',null,'No graph extraction.'),
  notAssessed,
  row('Uncertainty','ambiguous',null,'Matrix replicate counts and reported ± type unresolved.')
 ],
 'bn-hemp-nanofiber-slag':[
  row('Methods','partial','§§2.2–2.4.4','Total-mixture denominator, loading rates and furnace ramp/dwell/cooling located; dispersion and chemical modification protocol incomplete.'),
  row('Materials','partial','§2.1; Table 1','Selected identity facts checked; full material chemistry not extracted.'),
  row('Mix ledger','ambiguous','§2.3.1; Table 2','Solids basis and slag:sand mass ratio unresolved.'),
  row('Results','ambiguous','§3.2.4; §5; abstract','Unfavorable outcome and conflicting residual-strength claims captured; no numeric results imported.'),
  row('Figures','not yet extracted','Figures 1–25 (captions observed)','Not visually inspected or digitized.'),
  notAssessed,
  row('Uncertainty','partial','§2.3.2; §2.4.2','Selected specimen, curing and replicate details checked.')
 ],
 'metakaolin-slag-shrinkage-controls':[
  row('Methods','partial','§§3.1–3.3','Preparation, exposure and test standards recorded from indexed text.'),
  row('Materials','partial','§2.2','Assay and grade ledger incomplete.'),
  row('Mix ledger','ambiguous','§3.1; Table 3','Activator/binder values recorded; ratio basis and complete component masses unreconciled.'),
  row('Results','partial','Abstract; Table 3','Selected tradeoff direction recorded; complete table inventory pending.'),
  row('Figures','not yet extracted',null,'Not visually inspected or digitized.'),
  row('Supplements','not yet extracted',null,'Not fully assessed.'),
  row('Uncertainty','not yet extracted',null,'Replicate and variability audit incomplete.')
 ],
 'metakaolin-water-temperature':[
  row('Methods','partial','§2.2','Conditioning, mixing and cure schedule recorded; full instrument procedures incomplete.'),
  row('Materials','partial','§2.1','Precursor origin recorded; assay and grade ledger incomplete.'),
  row('Mix ledger','partial','§2.2; Table 1','Mass proportions recorded; stock-solution density and complete water accounting unknown.'),
  row('Results','partial','Conclusions','Unfavorable direction recorded; complete outcome inventory pending.'),
  row('Figures','not yet extracted',null,'Not visually inspected or digitized.'),
  row('Supplements','not yet extracted',null,'Not fully assessed.'),
  row('Uncertainty','not yet extracted',null,'Replicate and variability audit incomplete.')
 ],
 'metakaolin-freeze-thaw-design':[
  row('Methods','partial','§2.1; §§2.2.1–2.2.3','Mixing, curing, presaturation, cycling and compression procedure recorded.'),
  row('Materials','partial','§2.1; Table 1','Material identities recorded; assay basis not transcribed in this guide.'),
  row('Mix ledger','ambiguous','Table 2','Mass units and exact binder/water denominator unresolved.'),
  row('Results','not yet extracted',null,'Complete numerical outcomes not extracted.'),
  row('Figures','not yet extracted',null,'Figure inventory incomplete; no graph digitization.'),
  notAssessed,
  row('Uncertainty','partial','§§2.2.1–2.2.3','Six-specimen compression average and one MIP test per mortar recorded; uncertainty audit incomplete.')
 ],
 'fly-ash-slag-efflorescence-moisture':[
  row('Methods','partial','§§2.2–2.3; Figures 2–3','Cure, ageing, slicing and test procedures read; mixing time, speed and consolidation not stated.'),
  row('Materials','partial','§2.1; Table 1','Source, XRF oxides with LOI and D50 recorded in the source; not transcribed as canonical material records.'),
  row('Mix ledger','ambiguous','§§2.1–2.2','Blend, L/S and activator chemistry stated; specimen size conflicts between §2.2 and Figure 3.'),
  row('Results','partial','§3.2.1; §4','Text-stated strength values and outcome directions used; part-level figure values not extracted.'),
  row('Figures','not yet extracted','Figures 4–11','Page images viewed for methods; no graph digitization.'),
  notAssessed,
  row('Uncertainty','partial','§§2.2–2.3','Three replicate cylinders per regime and three strength replicates per part recorded; error-bar type not checked.')
 ],
 'one-part-admixture-compatibility':[
  row('Methods','partial','§3.2','Mixing sequence, fresh tests, cure and loading recorded.'),
  row('Materials','partial','§§2.1–2.3; Tables 1–4','Precursor sources, activator specifications and admixture identities recorded; SP solids contents not reported.'),
  row('Mix ledger','partial','§3.1; Table 5','All 18 single-admixture mixes defined by ratio; combined-admixture doses not restated in §4.3.'),
  row('Results','partial','§§4.1–4.3; Table 7; §5','Table 7 and text-stated percentages used; Table 6 and figure series not extracted.'),
  row('Figures','not yet extracted','Figures 1–4','No graph digitization.'),
  notAssessed,
  row('Uncertainty','partial','§3.2; Table 7','Six cubes per mix and Table 7 ± values noted; ± type not checked.')
 ],
 'metakaolin-slag-potassium-durability':[
  row('Methods','partial','§§2.2–2.3','Exposure, freeze–thaw, furnace and abrasion procedures recorded; curing temperature and RH not stated.'),
  row('Materials','ambiguous','§2.1; Tables 1–4','Silicate named metasilicate but listed near modulus 3.2; supplier data, not lot assays.'),
  row('Mix ledger','ambiguous','§2.2; Table 5','Mix percentages recorded; KOH solid versus solution basis and water correction unresolved.'),
  row('Results','partial','Abstract; §4','Outcome directions recorded; Tables 6–7 and strength values not extracted.'),
  row('Figures','not yet extracted',null,'Strength, weight and microstructure figures not digitized.'),
  notAssessed,
  row('Uncertainty','not yet extracted',null,'Replicate counts per test not recovered.')
 ],
 'carbonate-slag-hydroxide-balance':[
  row('Methods','partial','Methods','Mixing sequence, chamber conditions and strength ages recorded; specimen geometry, demolding and shrinkage protocol not recovered.'),
  row('Materials','not yet extracted',null,'Slag provenance, fineness and reagent purity not recovered in this review.'),
  row('Mix ledger','partial','Methods; Table 1','Component doses on a slag-mass basis recorded; purity and moisture qualification pending.'),
  row('Results','partial','Abstract and conclusions','Tradeoff directions recorded; no numeric outcomes extracted.'),
  row('Figures','not yet extracted',null,'Complete figure inventory not recovered.'),
  notAssessed,
  row('Uncertainty','not yet extracted',null,'Replicate counts and variability not recovered.')
 ]
};
// Counts only; no coverage percentage because no guide has an enumerated full-paper denominator.
export function inventorySummary(rows){
 const counts={};for(const r of rows)counts[r.state]=(counts[r.state]||0)+1;
 return inventoryStates.filter(s=>counts[s]).map(s=>`${counts[s]} ${s}`).join(' · ');
}
