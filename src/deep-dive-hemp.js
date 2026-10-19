// Original editorial notes; indexed primary-source excerpts, not a complete extraction.
export const hempDeepDive = {
 id:'bn-hemp-nanofiber-slag',
 title:'BN-modified hemp nanofibers: dose accounting and a replication plan',
 summary:'An electrospun PVA/boron-nitride/hemp reinforcement study, distinct from hemp-shiv insulation. Follow the mass denominator and unresolved controls before designing a reproduction.',
 sourceTitle:'Boron Nitride-Modified Hemp Nanofiber Reinforced Slag-Based Geopolymer Composites: Mechanical, Microstructural and Fire Resistance Performance',
 doi:'10.3390/polym18111288',
 citation:'Ahmet Filazi, İsmail Melih Tezcan, Reyhan Akat, Deniz Doğan and Ümit Erdem. Polymers 18(11), 1288 (24 May 2026).',
 checked:'2026-10-18',
 source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC13259237/',
 sourceLabel:'Read the source article',
 relatedStudy:'/studies/ke-b07-025',
 license:'Authors © 2026; CC BY stated in indexed PMC Copyright and License information. License version/link not verified in the retrieved excerpt. Original selected factual notes and editorial planning; no copied tables or figures.',
 accessNote:'Partial AI review of indexed publisher/PMC text. Direct publisher access returned 429, PMC returned a browser challenge and the publisher PDF was inaccessible. No challenge bypass, raw-file retention or visual figure verification.',
 glossary:'GGBFS = ground granulated blast-furnace slag; PVA = polyvinyl alcohol; BN = boron nitride. A hybrid reinforcement percentage is not a pure-hemp percentage.',
 highlights:[
  'The key practical question is whether a benefit survives a controlled comparison with the same matrix, processing history and test geometry.',
  'Do not substitute raw hemp fiber or shiv for an electrospun hybrid and call it a reproduction.',
  'Treat strength, processability and thermal integrity as separate acceptance criteria. A promising mechanism is not a building fire classification.'
 ],
 facts:[
  {title:'Material system',locator:'§2.1 and Table 1',text:'Slag, standard quartz sand, NaOH and sodium silicate; PVA/mBN/hemp hybrid reinforcement.'},
  {title:'Dose denominator',locator:'§2.2, paragraph defining total mixture weight',text:'0, 0.5, 1, 2 and 4 wt% of all components, including reinforcement.'},
  {title:'Activator and mixing',locator:'§2.3.1',text:'12 M NaOH; activator/solid 0.8; silicate/NaOH 2.25. Dry-blend slag/sand, then mechanically mix with activator. Ratio bases need clarification.'},
  {title:'Nanofiber processing',locator:'§2.2',text:'Chemical modification precedes electrospinning: 15 kV, 15 cm, 1 mL/h; heat treatment 80°C for 135 minutes.'},
  {title:'Specimens and cure',locator:'§2.3.2; §2.4.2',text:'40×40×160 mm prisms; 50 mm thermal-test cubes. Oven cure 80/110°C, 24 h; room-temperature storage; tests at 7/28 days; three replicates, mean ± SD.'},
  {title:'Mechanical loading',locator:'§2.4.2',text:'Three-point bending at 50 N/s; compression of broken half-prisms at 2.4 kN/s; TS EN 196-1.'},
  {title:'Thermal exposure procedure',locator:'§2.4.4',text:'50 mm cubes heated from approximately 23 ± 2°C at 5°C/min; one-hour target dwell; natural cooling inside the furnace. This is a laboratory exposure, not a standard building fire curve.'},
  {title:'Limits of mechanism evidence',locator:'§3.2.3 and Table 3',text:'Compression and ultrasonic velocity decline with reinforcement. Quantitative dispersion and porosity measurements were outside scope; proposed agglomeration/porosity mechanisms remain indirect interpretations.'},
  {title:'Unfavorable thermal outcome',locator:'§3.2.4',text:'After 28 days, thermal exposures lasted one hour. At 1200°C all specimens collapsed; subsequent strength testing was impossible.'}
 ],
 arithmetic:{
  intro:'Let B be the mass of everything except reinforcement, F the hybrid reinforcement mass, and p its fraction of final mass. F/(B+F)=p, therefore F=pB/(1−p). These illustrative calculations do not supply the missing constituent proportions.',
  rows:[
   ['Fixed final mass: 1000 g at 1%','F = 0.01 × 1000 = 10 g; B = 990 g','The remaining 990 g still needs a source-qualified slag, sand, solution and water ledger.'],
   ['Fixed base mass: 1000 g at 1%','F = 0.01 × 1000 / 0.99 ≈ 10.101 g','Adding 10 g to a 1000 g base gives about 0.9901%, not exactly 1%.'],
   ['Fixed base mass: 1000 g at 4%','F = 0.04 × 1000 / 0.96 ≈ 41.667 g','The denominator includes the addition; changing dose changes final mass.'],
   ['Pure-hemp fraction','Hybrid dose × hemp fraction within the recovered hybrid','Unknown until the recovered hybrid composition is established; feed-solution percentages alone do not determine it.']
  ],
  notes:[
   'A solution-to-solution mass ratio cannot be substituted for an oxide ratio or a volume ratio. Define every numerator and denominator before allocating grams.',
   'Residual-strength comparisons need two denominators: exposed strength divided by the same mix’s unheated strength measures retention; reinforced exposed strength divided by unreinforced exposed strength compares load capacity after exposure. Better retention can coexist with lower exposed strength. This mathematical possibility does not resolve the paper’s conflict. Match geometry, cure and age before calculating either ratio.',
   'Molarity is moles per litre of final solution. Record concentration, solution temperature, density, preparation history and water separately; this page is not an activator preparation instruction.'
  ]
 },
 checklist:[
  ['Choose the question','Separate reproduction from adaptation. For a reproduction, obtain the complete original mass ledger and reinforcement specification. For an adaptation, name each departure and retain a matching untreated control.'],
  ['Qualify materials and equipment','Record slag lot chemistry, grading, moisture and surface area; sand grading and moisture; activator specifications; and reinforcement composition. Electrospinning and chemical modification require trained operators, suitable laboratory controls and approved procedures.'],
  ['Close the mass and water ledger','Define the solids denominator, slag:sand ratio and activator masses. Account for solution water, additional water, material moisture and any carrier liquid. Calculate hybrid addition using the final-mass denominator above; do not fill unknown cells with typical values.'],
  ['Separate reinforcement manufacture from mortar manufacture','Obtain a complete chemical modification protocol and assess its hazards before work. Record recovered dry yield, residual solvent, conditioning and morphology. Confirm whether the material is added as a mat, chopped material or a dispersion. Do not improvise missing chemical doses.'],
  ['Design controls that can answer the question','Keep a matrix-only control. If attributing a benefit to BN or hemp, propose PVA-only and appropriate component controls, with consistent total reinforcement and processing. These are proposed experiments, not reported source groups.'],
  ['Run a pilot mixing trial','Once source gaps are resolved, document addition order, mixer geometry, speed, time, temperature and elapsed time to casting. Measure flow and density; log visible clumping, entrained air and rejected batches. Keep mixing changes explicit instead of silently changing water.'],
  ['Track each specimen history','Assign batch, mold, cure and exposure IDs. Specify sealing, demolding time, storage humidity and test-age origin. Randomize positions and test order where feasible; distinguish separate batches from multiple specimens cast from one batch.'],
  ['Compare unheated and exposed specimens','Use matched geometry, age and conditioning for thermal and unheated controls. Use the sourced thermal schedule above for a reproduction and document actual temperature history, dwell start and weighing procedures. Keep thermal cubes separate from broken mechanical-test prisms. Record collapse as an untestable outcome with its reason, never as an invented zero-MPa measurement.'],
  ['Evaluate tradeoffs and repeat','Publish individual results and variability alongside means. Check workability, density, strength and residual integrity together. Confirm any selected composition in independent fresh batches; do not infer field service limits from a short furnace exposure.']
 ],
 holds:[
  'Unresolved: slag:sand mass ratio, precise “solid” basis, addition/dispersion details, complete chemical modification charges. Furnace ramp/cooling are now located in §2.4.4.',
  'Source conflict: abstract suggests improved residual strength; §3.2.4 describes lower strength with increasing reinforcement. Resolve by mix, temperature and cure before recommending a dose.',
  'Preliminary optimization and G0 have different matrices (§5); do not pool their strengths.',
  'Tables, figures, supplements and status review remain incomplete. No graph points, canonical measurements or scalable formulation added.'
 ]
};
