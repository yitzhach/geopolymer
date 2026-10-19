// Original editorial guides from owner-supplied publisher PDFs; source facts are selective and located.
const cc='https://creativecommons.org/licenses/by/4.0/';
const pdfNote='Partial AI review of an owner-supplied publisher PDF (text layer plus page images). The PDF is not retained in the repository. No graph digitization or canonical measurement extraction.';
export const ownerPdfDeepDives=[{
 id:'fly-ash-slag-efflorescence-moisture',title:'Fly ash/slag efflorescence: control the moisture path before judging the activator',
 summary:'One cylinder, one wet base and two surface conditions show where alkalis leave the paste and which slice loses strength.',
 sourceTitle:'Relationship between Moisture Transportation, Efflorescence and Structure Degradation in Fly Ash/Slag Geopolymer',
 doi:'10.3390/ma13235550',checked:'2026-10-19',citation:'Shuaikang Zhou, Suhua Zhou, Jiuchang Zhang, Xin Tan and Deng Chen. Materials 13(23), 5550 (2020).',
 source:'https://www.mdpi.com/1996-1944/13/23/5550',sourceLabel:'Read the source article',relatedStudy:'/studies/ke-b14-002',
 license:'© 2020 by the authors; CC BY 4.0 stated on the article PDF. Original editorial synthesis; no figures or complete tables reproduced.',licenseUrl:cc,
 accessNote:pdfNote+' The PDF version carries overlapping text layers, so methods were checked against page images.',
 glossary:'NHFS = NaOH-activated paste; NSFS = sodium silicate-activated paste. Covered = plastic film on the curved surface; exposed = unwrapped. Parts 1/2/3 are slices from top to bottom. L/S = liquid/solid mass ratio.',
 highlights:['Where a specimen dries, and where it meets water, decides where efflorescence forms and which part loses strength.','Equal alkalinity (OH⁻ concentration) between activators is not equal composition; silicate also changes pore structure.','A whole-specimen average hides the weakest slice. Test by position.'],
 facts:[
 {title:'Materials',locator:'§2.1; Table 1',text:'Class F fly ash (Xuzhou Guohua Power Station) and granulated blast-furnace slag (Wuhu Hailuo Cement). XRF oxides and LOI in Table 1. D50: fly ash 14.71 µm; slag 12.31 µm.'},
 {title:'Activators',locator:'§2.1',text:'8 mol/L NaOH from 96% pellets. Sodium silicate: commercial solution (SiO₂ 32.6 wt%, Na₂O 10.4 wt%) plus NaOH to molar SiO₂/Na₂O 1.2; (Na₂O + SiO₂) solids 31.3%, set to match the OH⁻ concentration of the NaOH solution.'},
 {title:'Paste and cure',locator:'§2.2',text:'80 wt% fly ash + 20 wt% slag dry-mixed, then activator at L/S 0.50. Cure 20 ± 1 °C, RH ≥ 95%; demold at 24 h; cure to 28 days. Controls continue the same cure for another 28 days.'},
 {title:'Efflorescence ageing',locator:'§2.2; Figure 2',text:'Covered and exposed cylinders stand with the base 2 ± 0.5 mm deep in deionized water, 28 days at 20 ± 1 °C and RH 60 ± 2%. Water refilled every 24 h. Three replicate cylinders per mixture per regime.'},
 {title:'Slicing and tests',locator:'§2.3; Figure 3',text:'Three 32 mm slices (Parts 1–3, top to bottom). Strength: three replicates per part. Water absorption: dried at 105 °C to constant mass, then immersed > 24 h. Free alkali: 2.0 ± 0.5 mm granules leached 24 h at 1:50 solid/water, supernatant pH.'},
 {title:'Unfavorable outcomes',locator:'§3.2.1; §4',text:'Efflorescence reduced strength and raised water absorption. Exposed NHFS Part 3 (bottom) fell to 24.7 MPa against a 32.2–34.5 MPa control range. Covered specimens effloresced only on the top face.'}
 ],
 arithmetic:{intro:'Illustrative batch and exposure calculations from the stated ratios. Not a qualified recipe: the specimen size conflict below must be resolved first.',rows:[
 ['1 kg dry blend at L/S 0.50','800 g fly ash + 200 g slag + 500 g activator solution','Assumes L/S is solution mass over fly ash + slag mass. Water inside the two activators differs, so total water is not equal between NHFS and NSFS.'],
 ['Cylinder volume conflict','π × 0.05² × 0.2 m ≈ 1.571 L versus π × 0.025² × 0.1 m ≈ 0.196 L','§2.2 states 100 mm diameter × 200 mm; Figure 3 shows 50 mm diameter × 100 mm and §2.3 slices a 100 mm height. The batch volume differs about eightfold.'],
 ['Slice budget','3 × 32 mm + 2 × 3 mm gaps = 102 mm','Close to the 100 mm height in Figure 3; consistent with the smaller specimen. Confirm before cutting.'],
 ['Exposed NHFS Part 3 retention','24.7 / 34.5 ≈ 72% to 24.7 / 32.2 ≈ 77%','Range uses the stated control range, not a part-matched control value. Not a canonical observation.']
 ],notes:['Equal OH⁻ concentration was the design constraint between activators. Silicate content, solution density and water mass still differ; record them before comparing efflorescence between activators.','Part-specific results are position-dependent. Report the slice, not just a specimen mean.']},
 checklist:[
 ['Resolve the specimen size','Confirm which cylinder size was tested before buying moulds or sizing a batch. Record the decision and its basis.'],
 ['Qualify precursors','Record fly ash and slag source, oxide assay with LOI, fineness and moisture. A different ash or slag creates a new experiment.'],
 ['Prepare matched activators','Make the NaOH solution and the modulus-1.2 silicate under a laboratory alkali SOP. Measure solution density and record water mass so total water can be compared.'],
 ['Mix, cast and cure','Use the stated blend and L/S. Log mixing time, temperature and consolidation (not reported in the inspected methods). Seal-cure at high humidity, demold at 24 h, continue to 28 days.'],
 ['Set three regimes','Keep matched controls in the curing condition. Wrap the curved surface of the covered group. Leave the exposed group unwrapped.'],
 ['Run the wet-base exposure','Stand cylinders upright in a 2 mm water layer. Check the level daily; log refills, chamber temperature and humidity for 28 days.'],
 ['Record efflorescence by location','Photograph each face under fixed lighting. Mark the drying line if present. Collect deposits for identification separately from the specimen.'],
 ['Slice and test by position','Cut the planned slices, label top to bottom, and test strength, absorption and leachate pH per slice. Keep individual results.'],
 ['Compare within the design','Compare each slice with its matched control at the same total age. Do not transfer the 60% RH laboratory result to field service life.']
 ],holds:['Specimen geometry conflict: §2.2 states 100 × 200 mm cylinders; Figure 3 and §2.3 describe 50 × 100 mm. No batch sheet until resolved.','Mixing time, speed and consolidation are not stated in the inspected methods.','Graph values (pH, part-level strength and absorption) were not digitized; only text-stated values are used. No canonical observations added.','Correction/retraction status not comprehensively checked.']
},{
 id:'one-part-admixture-compatibility',title:'One-part fly ash/slag: check admixture compatibility against the activator first',
 summary:'The same superplasticizer helped one solid activator and hurt another. Screen each admixture with your activator before relying on it.',
 sourceTitle:'Efficiency of Different Superplasticizers and Retarders on Properties of ‘One-Part’ Fly Ash-Slag Blended Geopolymers with Different Activators',
 doi:'10.3390/ma12203410',checked:'2026-10-19',citation:'Shin Hau Bong, Behzad Nematollahi, Ali Nazari, Ming Xia and Jay Sanjayan. Materials 12(20), 3410 (2019).',
 source:'https://www.mdpi.com/1996-1944/12/20/3410',sourceLabel:'Read the source article',relatedStudy:'/studies/ke-b14-017',
 license:'© 2019 by the authors; CC BY 4.0 stated on the article PDF. Original editorial synthesis; commercial product names cited as the source identifies them; no figures reproduced.',licenseUrl:cc,
 accessNote:pdfNote,
 glossary:'AN = anhydrous sodium metasilicate powder (molar SiO₂/Na₂O 0.9); GD = GD Grade sodium silicate powder (2.0). SP = superplasticizer; RT = retarder. W/GP-solids = water (including powder-bound water) / (precursors + activator solids).',
 highlights:['Admixture performance depended on the solid activator: PC1 raised AN spread 72% before the drop, but no SP improved GD workability.','With GD, polycarboxylate SPs cut strength by up to 35% and retarders by up to 46%.','Combining PC1 with a retarder extended setting but cost 16–26% strength.'],
 facts:[
 {title:'Precursors and activators',locator:'§§2.1–2.2; Tables 1–2',text:'Class F fly ash (Cement Australia) and GGBS (Building Products Supplies). AN: SiO₂ 46%, Na₂O 51%, bound H₂O 3%. GD: SiO₂ 54%, Na₂O 27%, bound H₂O 18% (supplier averages).'},
 {title:'Admixtures',locator:'§2.3; Tables 3–4',text:'Three modified polycarboxylate SPs (PC1–PC3), two naphthalene SPs (N1, N2); retarders sucrose, anhydrous borax and a commercial OPC retarder (liquid).'},
 {title:'Mix design',locator:'§3.1; Table 5',text:'Per precursor mass: fly ash/slag 1.0; activator 0.10; water 0.400 (AN) or 0.379 (GD); one admixture 0.010. W/GP-solids 0.367 in all 18 mixes.'},
 {title:'Mixing and tests',locator:'§3.2',text:'Dry mix 3 min low speed (powders + any retarder); add tap water, 2 min low; add SP, 8 min high. Mini-slump ASTM C1437; Vicat setting AS/NZS 2350.4 from water addition. Six 25 mm cubes per mix.'},
 {title:'Cure and age',locator:'§3.2',text:'Sealed, 60 °C oven 24 h; cool, demold, store 23 ± 3 °C. Compression at 3 days, 20 ± 2 MPa/min (AS 1012.9). Not an ambient-only cure.'},
 {title:'Combined admixtures',locator:'§4.3; Table 7',text:'AN-PC1-S: initial set 407 min vs 169 for AN; strength 37.5 vs 44.6 MPa. AN-PC1-B: 32.8 MPa. Spread with combined admixtures was below PC1 alone.'}
 ],
 arithmetic:{intro:'These checks reproduce the stated design ratios from the stated components. They do not qualify a batch for a different activator grade or cure.',rows:[
 ['1 kg precursor, AN-PC1','500 g fly ash + 500 g slag + 100 g AN + 400 g water + 10 g PC1','Admixture as supplied; its water is not counted in W/GP-solids.'],
 ['AN W/GP-solids check','(400 + 100 × 0.03) / (1000 + 100 × 0.97) = 403 / 1097 ≈ 0.367','Matches the stated 0.367 when powder-bound water counts as water.'],
 ['GD W/GP-solids check','(379 + 100 × 0.18) / (1000 + 100 × 0.82) = 397 / 1082 ≈ 0.367','Explains why GD mixes use less added water.'],
 ['Combined admixture tradeoff','407 / 169 ≈ 2.41 (+141% initial set); 37.5 / 44.6 ≈ 0.84 (−16% strength)','From Table 7 means; standard deviations reported there are not propagated.']
 ],notes:['Admixture dose basis is mass of product per precursor mass. Solids content of the liquid SPs was not used; the same dose with a different product is a different solids dose.','Results are for a 60 °C 24 h cure and 3-day testing. Ambient cure is a separate test arm.']},
 checklist:[
 ['Fix the activator first','Choose and document the solid activator grade, modulus, Na₂O and bound water. Treat a different grade as a new compatibility question.'],
 ['Build the ledger','Record precursor, activator, added water and admixture masses. Compute W/GP-solids with bound water; record admixture solids separately if known.'],
 ['Run a no-admixture control','Mix the plain paste in every session. All admixture effects are relative to it.'],
 ['Screen one admixture at a time','Keep dose and sequence fixed. Add retarders with the dry powders and SPs after water, as the source did, or record the change.'],
 ['Measure fresh properties immediately','Do the mini-slump spread before and after drops, then Vicat setting timed from water addition. Log paste temperature.'],
 ['Cast, cure and test as specified','Use sealed 25 mm cubes for a reproduction. State the cure (60 °C or ambient) and test age; do not mix them.'],
 ['Reject incompatible products','Record admixtures that reduce strength or fail to improve flow. Those are results, not failed batches.'],
 ['Confirm combinations separately','Test SP + retarder pairs as new mixes; their effects did not add.']
 ],holds:['Commercial product formulations are proprietary; a product with the same name may change. Re-screen before relying on it.','Combined-admixture doses are not restated in §4.3; confirm they match the single-admixture 0.010 ratio before reproducing.','Graph-only values (Figures 1–4) were not digitized; only text and Table 7 values are used. No canonical observations added.','Heat-cured 3-day results do not establish ambient performance or long-term strength.']
},{
 id:'metakaolin-slag-potassium-durability',title:'MK/GGBFS mortar with KOH: read a durability battery mix by mix',
 summary:'A potassium-dominated activator, fixed liquids and a shifting MK:slag ratio, with six exposures. More slag lowered strength here.',
 sourceTitle:'Durability of Non-Heat-Cured Geopolymer Mortars Containing Metakaolin and Ground Granulated Blast Furnace Slag',
 doi:'10.3390/min14080776',checked:'2026-10-19',citation:'Burak Işıkdağ and Hidayet Alper Mutlu. Minerals 14(8), 776 (2024).',
 source:'https://www.mdpi.com/2075-163X/14/8/776',sourceLabel:'Read the source article',relatedStudy:'/studies/ke-b14-005',
 license:'© 2024 by the authors; CC BY 4.0 stated on the article PDF. Original editorial synthesis; no figures or complete tables reproduced.',licenseUrl:cc,
 accessNote:pdfNote+' The PDF version carries overlapping text layers, so methods were checked against page images.',
 glossary:'MK = metakaolin; GGBFS = ground granulated blast-furnace slag; GM = geopolymer mortar. Table 5 percentages are by weight of the whole mortar mix, not of binder.',
 highlights:['The activator is mostly potassium: KOH is 4.5% of the mix against 1.5% silicate solution.','The silicate is named sodium metasilicate, but its listed composition is a high-modulus solution. Check the identity before sourcing.','Strength fell as slag replaced MK in this system, the opposite of many slag-blend expectations.'],
 facts:[
 {title:'Materials',locator:'§2.1; Tables 1–4',text:'MK and GGBFS (supplier XRF, Table 1), CEN standard sand. Silicate solution: Na₂O 8.75%, SiO₂ 27.43%, density 1.371 g/mL at 20 °C. KOH 92%.'},
 {title:'Activator preparation',locator:'§§2.1–2.2',text:'Reported as Na₂SiO₃ 0.65 M and KOH 8 M. KOH and silicate mixed with tap water at 50 °C in a closed container. Mixing water corrected for water in the silicate solution.'},
 {title:'Mixes',locator:'§2.2; Table 5',text:'Mortar wt%: water 9.6, KOH 4.5, silicate solution 1.5, sand 61.5 fixed. MK/GGBFS: 9.1/13.7, 6.8/16.0, 4.5/18.2, 2.3/20.5.'},
 {title:'Specimens and cure',locator:'§2.2',text:'108 specimens, 40 × 40 × 160 mm and 50 × 50 × 50 mm (TS EN 196-1, ASTM C267-01). Stored uncovered in laboratory conditions for 28 days; temperature and RH not stated.'},
 {title:'Exposures',locator:'§§2.3; 3',text:'5% Na₂SO₄, 5% MgSO₄, 1.5 M and 2 M HCl for 10 weeks, renewed every 2 weeks. Freeze–thaw +20/−20 °C at 6 h intervals, 60 cycles in 30 days. Furnace 600–800 °C, 10 °C/min, 1 h hold. Böhme abrasion, 16 cycles of 22 turns.'},
 {title:'Outcomes',locator:'Abstract; §4',text:'28-day strength reached 55 MPa. Higher GGBFS lowered strength. Higher MK reduced sulfate strength loss and improved freeze–thaw, abrasion and 800 °C resistance.'}
 ],
 arithmetic:{intro:'Illustrative scaling and composition checks from Table 5 and the supplier tables. The KOH entry basis is ambiguous, so alkali figures are conditional.',rows:[
 ['1 kg mortar, mix 1','91 g MK + 137 g GGBFS + 96 g water + 45 g KOH + 15 g silicate solution + 615 g sand','Sums to 999 g; table rows are rounded.'],
 ['MK share of precursor','9.1/22.8 ≈ 40%; 6.8/22.8 ≈ 30%; 4.5/22.7 ≈ 20%; 2.3/22.8 ≈ 10%','Precursor total stays ≈ 22.8% of the mix while the ratio changes.'],
 ['Silicate modulus','27.43 / 8.75 ≈ 3.13 by mass → ≈ 3.24 molar','Sodium metasilicate is about 1. The listed solution is not metasilicate composition; confirm the product.'],
 ['K versus Na (if KOH is solid flakes)','45 g × 0.92 → ≈ 34.8 g K₂O ≈ 0.37 mol; 15 g × 0.0875 → ≈ 1.3 g Na₂O ≈ 0.021 mol','≈ 95% of alkali moles are potassium. Invalid if Table 5 lists KOH solution mass.'],
 ['Freeze–thaw schedule','60 cycles × (6 h + 6 h) = 720 h = 30 days','Consistent with the stated 30 days.']
 ],notes:['Molarity stated for a silicate solution is unusual; the 0.65 M and 8 M figures cannot be turned into masses without the solution recipe.','Whether the 9.6% water is net added water or total water depends on the correction described in §2.2. Keep the water ledger open until confirmed.']},
 checklist:[
 ['Identify the silicate','Obtain the product data sheet. Decide whether to match the listed composition or the name; record which and why.'],
 ['Resolve the KOH basis','Confirm whether Table 5 lists KOH flakes or KOH solution. Build the alkali and water ledger only after that.'],
 ['Qualify MK, GGBFS and sand','Record source, oxide assay and moisture. Use CEN sand or record the substitute grading.'],
 ['Prepare the activator','Dissolve under a laboratory alkali SOP in a closed vessel; log temperature and time before use.'],
 ['Cast the specimen set','Plan prisms and cubes per exposure and control. Label every specimen with mix, exposure and test age.'],
 ['Record the cure','Log laboratory temperature and RH for the 28-day uncovered storage; the source does not state them.'],
 ['Run exposures with controls','Keep age-matched unexposed controls. Log solution renewals, freeze–thaw cycles and furnace profile.'],
 ['Report every outcome','Record mass change, strength, cracking and color change for each mix. Keep the higher-slag strength loss visible.']
 ],holds:['KOH entry basis (solid or solution) and the meaning of 0.65 M for the silicate are unresolved; no reproducible weighing sheet.','The material named sodium metasilicate has a listed composition near modulus 3.2. Product identity unresolved.','Curing temperature and RH not stated; replicate counts per test not recovered.','Table 6–7 and figure values not extracted; no canonical observations added. Correction status not comprehensively checked.']
}];
