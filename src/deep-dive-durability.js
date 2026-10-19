// Original editorial planning guidance; source facts are intentionally selective.
export const durabilityDeepDives = [{
 id:'metakaolin-freeze-thaw-design',title:'Metakaolin freeze–thaw: design the exposure before comparing strength',
 summary:'Separate saturation, cycle history and catastrophic damage from a simple retained-strength number.',
 sourceTitle:'Compositional Dependence of Pore Structure, Strengthand Freezing-Thawing Resistance of Metakaolin-Based Geopolymers',
 doi:'10.3390/ma13132973',checked:'2026-10-19',citation:'Dongming Yan, Lingjun Xie, Xiaoqian Qian, Shaoqin Ruan and Qiang Zeng. Materials 13(13), 2973 (2020).',
 source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7372425/',sourceLabel:'Read the source article',relatedStudy:'/studies/ke-b14-004',
 license:'Authors © 2020, CC BY 4.0, stated in the PMC article. Original editorial synthesis; no figures or complete tables reproduced.',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',
 accessNote:'Partial AI review of accessible PMC full text. No graph digitization or canonical measurement extraction. Complete outcome inventory and Table 2 unit reconciliation remain pending.',
 glossary:'MK = metakaolin; SSD = saturated surface dry; MIP = mercury intrusion porosimetry. A laboratory cycle count is not a service-life prediction.',
 highlights:['A dry specimen and a saturated specimen do not answer the same durability question.','Specimens destroyed during exposure must remain visible in the outcome report.','Six specimens from one batch do not establish between-batch reproducibility.'],
 facts:[
 {title:'Materials and design',locator:'§2.1; Tables 1–2',text:'Metamax MK, sodium silicate, NaOH and sand. Five mixes vary Si/Al and Na/Al. Reported water/binder 0.62; sand/binder 3. Table 2 mass units remain unresolved.'},
 {title:'Mixing and curing',locator:'§2.1',text:'Activator rests 12 h. Mix liquids/MK 3 min, then sand 3 min. Cast 40×40×160 mm; vibrate and cover. Cure 20±1°C, 90% RH; demold at 2 days, continue to 28 days.'},
 {title:'Exposure',locator:'§2.2.2',text:'Presaturate 4 days. Water covers specimens by 20 mm. Cycle −17 to 8°C: freezing 1.5–2.5 h, thawing 1–1.5 h, total 2.5–4 h. Assess after 50 cycles.'},
 {title:'Failure and sampling',locator:'§§2.2.1–2.2.3',text:'Compression: 2.4 kN/s, six-specimen average. Completely damaged specimens lack mass/strength measurements. MIP: one test per mortar.'}
 ],
 arithmetic:{intro:'These are reporting calculations and exposure-time bounds, not extracted performance measurements or a complete batch recipe.',rows:[
 ['Programmed cycling time','50 × (2.5–4 h) = 125–200 h','Excludes presaturation, interruptions and handling; log actual chamber history.'],
 ['Strength retention','100 × exposed strength / matched unexposed strength','Use an age- and moisture-matched control. An untestable specimen has no measured strength value; do not silently insert zero.'],
 ['Mass change','100 × (post-exposure SSD mass − initial SSD mass) / initial SSD mass','This editorial signed-change convention must be distinguished from a source definition of positive mass loss.']
 ],notes:['The water/binder denominator and Table 2 units must be reconciled before weighing a reproduction batch. Oxide-equivalent composition is not automatically physical water content.','Do not infer pore-volume precision from one MIP specimen. Report specimen sampling and test uncertainty separately.']},
 checklist:[
 ['Define the comparison','Select a named source mix only after resolving its complete mass ledger. For a new experiment, assign separate IDs to changes in alkali content, precursor lot or aggregate.'],
 ['Qualify the inputs','Record dry precursor moisture, sand grading and solution certificates. Reconcile actual water with oxide-equivalent chemistry; use laboratory alkali-handling procedures.'],
 ['Plan independent batches','Allocate exposed and unexposed specimens from each independently mixed batch. Prespecify test age, moisture condition and an explicit category for destroyed specimens.'],
 ['Control preparation','Log activator age, mixing sequence, speed, temperature and consolidation. Record deviations and failed batches instead of quietly changing water content.'],
 ['Track curing','Record casting time, sealing, demolding and chamber history. Label every specimen so its exposure history can be traced back to the mix.'],
 ['Saturate consistently','Apply the selected presaturation method to all applicable specimens. Define the surface-drying procedure used before weighing; retain original mass readings.'],
 ['Log the complete cycle','Record actual specimen or representative internal temperature alongside chamber temperature. Document dwell times, water cover, interruptions and the number of completed cycles.'],
 ['Retain unfavorable outcomes','Photograph damage under a consistent scale and lighting procedure. Record untestable specimens and the reason. Report survivors and failures together rather than presenting only the surviving strength average.'],
 ['Compare within the design','Use matched controls and batch-level uncertainty. Treat field exposure, other saturation histories and different cycle programs as separate validation questions.']
 ],holds:['Table 2 units and the exact binder/water accounting require resolution before a reproducible weighing sheet can be issued.','Complete numerical outcomes, figure inventory and uncertainty audit remain incomplete. No graph points or new canonical observations added.','Laboratory durability is conditional on saturation and temperature history; field lifetime is not established.']
},{
 id:'carbonate-slag-hydroxide-balance',title:'Carbonate-activated slag: balance early reaction against two kinds of shrinkage',
 summary:'Read a slag-based denominator correctly and separate autogenous shrinkage from drying shrinkage.',
 sourceTitle:'Properties and Microstructure of Na2CO3-Activated Binders Modified with Ca(OH)2 and Mg(OH)2',
 doi:'10.3390/ma15051687',checked:'2026-10-19',citation:'Lilan Xie and Kaiwei Liu. Materials 15(5), 1687 (2022).',source:'https://www.mdpi.com/1996-1944/15/5/1687',sourceLabel:'Read the source article',relatedStudy:'/studies/ke-b14-025',
 license:'Authors © 2022; indexed PMC article states CC BY 4.0. Original editorial synthesis; no complete tables or figures reproduced.',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',
 accessNote:'Partial AI review of indexed primary text. PMC browser challenge and failed publisher PDF retrieval recorded. No access bypass, raw-paper retention or graph extraction.',
 glossary:'Slag is the stated water/binder denominator. Ca(OH)2 = calcium hydroxide; Mg(OH)2 = magnesium hydroxide. Autogenous and drying shrinkage require different exposure controls.',
 highlights:['A fixed water/slag ratio is not a fixed water/all-powders ratio when activator solids change.','Faster reaction is not sufficient evidence of better dimensional stability.','A reduction in drying shrinkage can coexist with an increase in autogenous shrinkage.'],
 facts:[
 {title:'Component basis',locator:'Methods; Table 1',text:'Na2CO3: 10% of slag mass. Combined Ca(OH)2/Mg(OH)2: 5%, with mass ratios 1:4, 2:3, 3:2 and 4:1. C0 has carbonate only. Water/slag: 0.50.'},
 {title:'Preparation and tests',locator:'Methods',text:'Dry mixing 4 min; add water and mix 4 min. Moisture chamber: 20±1°C; RH printed as ≥95±2%. Strength ages: 1/3/7/28 days.'},
 {title:'Unfavorable tradeoff',locator:'Abstract and conclusions',text:'Increasing Ca(OH)2 relative to Mg(OH)2 accelerates reaction and increases autogenous shrinkage while decreasing drying shrinkage. Carbonate-only C0 develops strength later.'}
 ],
 arithmetic:{intro:'Illustrative scaling of reported components to 1 kg slag. This is derived arithmetic, not an experimentally qualified recipe.',rows:[
 ['C1M4 component ledger','1000 g slag + 100 g Na2CO3 + 10 g Ca(OH)2 + 40 g Mg(OH)2 + 500 g water','5% auxiliary solids = 50 g; the 1:4 split gives 10 g and 40 g.'],
 ['C1M4 water/all powders','500 / (1000 + 100 + 10 + 40) ≈ 0.435','The source water/slag remains 0.50. Keep both denominator labels.'],
 ['C0 water/all powders','500 / (1000 + 100) ≈ 0.455','The change in total powder mass is part of the comparison.'],
 ['Fixed auxiliary total','Ca(OH)2 + Mg(OH)2 = 50 g per illustrative kg slag','Varying the split preserves auxiliary mass, but not chemical equivalence or reaction kinetics.']
 ],notes:['These masses assume the stated dry-component basis; purity, moisture and lot qualification remain necessary.','C0 is a useful carbonate-only control. Additional component-isolation controls would be proposed experiments, not source results.']},
 checklist:[
 ['Choose the question','Specify whether the objective is early strength, setting, autogenous shrinkage or drying shrinkage. Prespecify how competing outcomes will be evaluated.'],
 ['Qualify powders','Record slag provenance, moisture and fineness plus carbonate/hydroxide grade and purity. Follow laboratory chemical and dust-control procedures.'],
 ['Write two denominators','Maintain water/slag and water/all-powders columns. Verify the hydroxide split sums to the fixed auxiliary mass before preparing containers.'],
 ['Resolve missing methods','Obtain specimen geometry, demolding time, shrinkage reference age and exposure details before claiming reproduction. Do not substitute a familiar standard without recording the change.'],
 ['Prepare separate batches','Plan independent repetitions with carbonate-only controls. Randomize preparation order where practical and retain a record of delays or failed setting.'],
 ['Mix and monitor','Follow the reported dry/wet sequence after the ledger is qualified. Log fresh temperature, working time and any additions; added water creates a revised formulation.'],
 ['Separate shrinkage exposures','Use distinct specimen tracking for sealed/autogenous and drying measurements. Verify the source protocols before selecting humidity, gauge length and first-reading time.'],
 ['Report tradeoffs','Compare age-matched strength with both shrinkage measures. Keep cracks, poor setting and low early strength visible. Do not call a material universally improved from one favorable response.']
 ],holds:['Specimen geometry, demolding, shrinkage exposure details and complete outcome/figure inventory were not recovered; reproduction remains on hold.','No graph points, canonical observations or qualified recipe added. The component ledger is editorial arithmetic only.','Indexed primary access supports these selected facts, not a complete methodological or correction-status review.']
}];
