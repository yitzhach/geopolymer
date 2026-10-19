// Original editorial analysis; source excerpts and proposed experiments are distinct.
export const controlDeepDives = [{
 id:'metakaolin-slag-shrinkage-controls',
 title:'Metakaolin and slag: testing shrinkage without losing the strength comparison',
 summary:'Read a nine-composition experiment through its flow adjustment, curing history and two competing performance targets.',
 sourceTitle:'A Study on the Shrinkage and Compressive Strength of GGBFS and Metakaolin Based Geopolymer under Different NaOH Concentrations',
 doi:'10.3390/ma17051181', citation:'Yen-Chun Chen, Wei-Hao Lee, Ta-Wui Cheng and Yeou-Fong Li. Materials 17(5), 1181 (2024).',
 checked:'2026-10-19',source:'https://www.mdpi.com/1996-1944/17/5/1181',sourceLabel:'Read the source article',relatedStudy:'/studies/ke-b08-016',
 license:'Authors © 2024; CC BY 4.0 in the PMC article-specific copyright notice. Original editorial adaptation with selected facts; no complete tables or figures reproduced.',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',
 accessNote:'Partial AI review of indexed publisher/PMC methods and selected results. Direct publisher request returned 429; PDF retrieval failed. No visual figure verification. Publisher Correction Statement records a title-only correction and says scientific content is unaffected; PMC retains “Base” in its title.',
 glossary:'MK = metakaolin; GGBFS = ground granulated blast-furnace slag; A/B = activator-to-binder ratio. Matching fresh flow is a different experimental constraint from holding activator quantity fixed.',
 highlights:['Read strength and dimensional stability together; a composition can improve one while worsening the other.','The flow-matched comparison changes activator quantity with composition. Interpret it as performance under that constraint, not an isolated chemical substitution effect.','A fitted response surface describes the tested design space; proposed settings need new confirmation batches.'],
 facts:[
 {title:'Design and activator',locator:'§2.2; §3.2/Table 2',text:'MK substitution: 0/50/100%; NaOH: 6/10/14 M. Activator also contains sodium silicate and sodium aluminate; reported molar SiO₂/Na₂O 1.28 and Al₂O₃/SiO₂ 0.02.'},
 {title:'Flow constraint',locator:'§3.1; Table 3',text:'A/B adjusted to flow 110 ± 5%. At 6 M, A/B is 0.36 for MK0 and 1.28 for MK100.'},
 {title:'Preparation and exposure',locator:'§3.3',text:'Mix 2–5 min; cast and seal 24 h at room temperature. Demold into 23.2 ± 2°C and 52 ± 3% RH.'},
 {title:'Tests and reference time',locator:'§3.1',text:'Compression: 50 mm cubes at 28 days, ASTM C109/C109M-20. Length change: 25×25×285 mm bars, ASTM C157-75; initial reading immediately after demolding.'},
 {title:'Tradeoff',locator:'Abstract; Table 3',text:'At low NaOH concentration, increasing MK reduces shrinkage but also strength. This is not evidence of a universal best blend.'}
 ],
 arithmetic:{intro:'The following calculations explain the experiment’s constraints; they do not supply an executable activator recipe.',rows:[
 ['Activator contrast','1.28 / 0.36 ≈ 3.56','At the two cited endpoints, solution demand per binder differs substantially. Equal binder mass does not imply equal alkali or water dosage.'],
 ['Conditional 1 kg binder','A/B 0.36 → 360 g activator; A/B 1.28 → 1280 g','Assumes a mass ratio. Confirm its basis and solution recipe before weighing; the compositions are different source groups.'],
 ['Length-change conversion','Percentage strain × 10,000 = microstrain','For example, an illustrative −0.10% equals −1000 µε. Preserve source sign and reference age; this is not a digitized measurement.']
 ],notes:['Total water includes water inside the activator. Molarity alone cannot determine solution water mass without a complete concentration/density ledger.','The first length reading occurs after the initial sealed period. Earlier deformation is outside that reference interval; do not call the result total shrinkage since mixing.']},
 checklist:[
 ['Set joint acceptance criteria','Specify strength, age and maximum dimensional change before testing. Define which exposure and specimen geometry matter for the intended use. Avoid choosing a target after seeing the results.'],
 ['Qualify the two precursors','Record material lot, oxide assay basis, amorphous content where available, fineness and moisture. A replacement of commercial grades creates an adaptation, not a reproduction.'],
 ['Recover the activator ledger','Obtain the original sodium silicate and sodium aluminate specifications, hydroxide preparation and water masses. Keep stock molarity, oxide ratios and whole-binder chemistry separate.'],
 ['Choose the comparison constraint','For reproduction, follow the source flow criterion and record every solution adjustment. For a proposed mechanistic follow-up, add a separate fixed-activator series; do not merge the two series as if conditions were identical.'],
 ['Prepare labeled batches','Document actual mixing duration, speed, temperature, cast time and sealing. Use independent batches to assess batch variability; multiple cubes from one batch are not independent formulation replications.'],
 ['Start the length record consistently','Record comparator zero, reference bar, gauge length and specimen orientation. Read all bars at a defined temperature. Distinguish specimen overall length from the measurement gauge length.'],
 ['Track cure and moisture history','Log chamber temperature and humidity, mass changes, demolding and reading times. Avoid replacing air storage with immersion or sealed storage without labeling a new experiment.'],
 ['Analyse failures and confirm','Report each specimen, not only a fitted optimum. Retain cracked, untestable and poorly flowing batches with their reasons. Confirm candidate blends in new batches before claiming transfer to a coating or structural application.']
 ],
 holds:['Complete activator component masses, ratio basis and material specifications must be reconciled before batch transfer.','Full table/figure inventory and uncertainty audit are incomplete; no new canonical observations or scalable recipe.','Title-only correction is documented, not a comprehensive source-status clearance. Verify exact version when retrieving a full copy.']
},{
 id:'metakaolin-water-temperature',
 title:'Metakaolin paste: separating added water, dilution and starting temperature',
 summary:'Use a temperature-and-water experiment to build a clear mass ledger and avoid confusing preparation temperature with curing temperature.',
 sourceTitle:'The Impact of the Amount of Water Used in Activation Solution and the Initial Temperature of Paste on the Rheological Behaviour and Structural Evolution of Metakaolin-Based Geopolymer Pastes',
 doi:'10.3390/su12198216',citation:'Laura Vitola, Ina Pundiene, Jolanta Pranckeviciene and Diana Bajare. Sustainability 12(19), 8216 (2020).',
 checked:'2026-10-19',source:'https://www.mdpi.com/2071-1050/12/19/8216',sourceLabel:'Read the source article',relatedStudy:'/studies/ke-b08-008',
 license:'Authors © 2020; Riga Technical University’s article record links this DOI to CC BY 4.0. Original editorial adaptation and selected factual notes; no complete tables or figures reproduced.',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',
 accessNote:'Partial AI review of indexed publisher methods. Publisher landing page returned 429 and publisher PDF was inaccessible. Article-specific license checked at https://research.rtu.lv/en/publications/the-impact-of-the-amount-of-water-used-in-activation-solution-and/ . No visual or graph extraction.',
 glossary:'MK = metakaolin. “Added water/10 M NaOH” compares added water mass with stock solution mass; it is not total water/binder, nor the molarity of the diluted solution.',
 highlights:['Changing added water at fixed stock-solution mass changes both liquid content and concentration. It is not a pure workability adjustment.','Keep material conditioning, actual paste temperature, room temperature and curing temperature in separate fields.','Improved flow alone is insufficient: evaluate the resulting strength and pore structure under a matched conditioning history.'],
 facts:[
 {title:'Precursor and stock solution',locator:'§2.1',text:'Waste MK from Stikloporas, Lithuania; generated during foam-glass processing. Activation uses 10 M NaOH stock diluted with distilled water.'},
 {title:'Mass proportions',locator:'§2.2; Table 1',text:'MK:stock-solution mass = 1:0.25. Added water spans 0.15–0.45 per MK mass; added-water/stock ratio 0.6–1.8.'},
 {title:'Preparation temperatures',locator:'§2.2',text:'Materials conditioned 24 h at 5/15/25/35°C. Activator magnetic mixing: 30 min. Paste mixing: 3 min at 140 rpm in a 20 ± 1°C room.'},
 {title:'Cure and test schedule',locator:'§2.2',text:'Selected hardened-property series MK0.6/MK1.0/MK1.4: 70 mm cubes, plastic-covered, immediately cured 80°C for 24 h; subsequent room-temperature storage. Density, UPV and compression assessed after heat cure and at 7/14/28/56 days.'},
 {title:'Unfavorable direction',locator:'Conclusions',text:'Higher added water trades easier flow for lower hardened strength and higher apparent porosity in the studied system.'}
 ],
 arithmetic:{intro:'Scale only the reported component masses. These examples are editorial arithmetic, not a qualified complete reproduction.',rows:[
 ['Illustrative 1 kg MK, ratio 0.6','1000 g MK + 250 g stock solution + 150 g added water','150/250 = 0.6; total 1400 g. Stock-solution water remains additional to the 150 g.'],
 ['Illustrative 1 kg MK, ratio 1.4','1000 g MK + 250 g stock solution + 350 g added water','350/250 = 1.4; total 1600 g. It is not a water/binder ratio of 1.4.'],
 ['Combined liquid/MK','(250 + 150)/1000 = 0.40; (250 + 350)/1000 = 0.60','Liquid mass is not pure water mass. No unverified solution-density conversion is applied.'],
 ['Diluted molarity','Mfinal = moles NaOH / measured final solution volume','Mass dilution ratios alone do not give final molarity. Do not assume additive volumes or use the stock label for the diluted solution.']
 ],notes:['A source mass recipe does not qualify substitute MK. Particle size, reactive fraction and moisture can change liquid demand.','Temperature-controlled starting ingredients do not guarantee a constant paste temperature during mixing. Log the actual temperature rather than assigning the chamber setting to every measurement.']},
 checklist:[
 ['Define the water question','Decide whether the experiment studies added water at fixed alkali mass or concentration at fixed liquid content. These are different designs. State the constraint before assigning sample codes.'],
 ['Document materials','Record the MK origin, lot, moisture and fineness. Verify stock hydroxide concentration, preparation date and temperature with an approved laboratory procedure. Do not infer a stock preparation recipe from a weighed solution mass.'],
 ['Build a separate water ledger','Keep dry precursor, stock solution and added water as separate quantities. Record stock-solution composition before deriving total water or oxide ratios; otherwise leave those fields unknown.'],
 ['Condition and measure temperatures','Reproduce the reported conditioning interval if reproducing the study. Measure ingredients and fresh paste before and after mixing; record room temperature and time outside the chamber.'],
 ['Measure fresh behavior consistently','Define the delay between mixing and each viscosity, conductivity or spread measurement. Record instrument limits and any readings that exceed them rather than extrapolating missing values.'],
 ['Cast and track heat cure','Identify each mold and sealing condition. Log oven temperature, time to insertion, specimen mass and any evaporation. Keep the initial paste-temperature factor distinct from the common heat-cure step.'],
 ['Preserve later storage history','Record transfer from oven to room conditions and test-age origin. Compare specimens only at matched age and moisture state; do not treat warm and cooled samples as equivalent by default.'],
 ['Assess tradeoffs in fresh batches','Compare workability with strength, density and porosity. Record poor setting, cracking and test failures. Confirm a selected recipe using independent batches before applying it to ambient-only curing or a different precursor.']
 ],
 holds:['Full instrument procedures, complete outcome inventory and uncertainty/replicate audit remain incomplete. No graph values or canonical measurements added.','Stock density and complete water accounting are required for molar or oxide calculations; no ready-to-run activator preparation is supplied.','A heat-cured result does not establish ambient-only performance. Source-status search found no specific notice, not comprehensive clearance.']
}];
