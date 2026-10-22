import {deepDives} from './deep-dives.js';
import {literatureMixes} from './literature-mixes.js';
import {mixDesignReview04} from './mix-design-review-04.js';
import {mixDesignReview05} from './mix-design-review-05.js';
import {mixDesignReview06} from './mix-design-review-06.js';
import {depth200MixReviews} from './deep-dive-depth200-expansion.js';
import {buildMixDataSet,validateMixDataSet} from './mix-data-contract.js';
const doiOf=r=>(r.doi||r.url?.match(/10\.\d+\/[^?# ]+/)?.[0]||'').toLowerCase();
const criterion=(property,ageHours)=>({property,ageHours});
const selections={
 'biochar-replacement-and-exposure':{
  title:'MH-1 for the highest reported 28-day initial compression mean',
  choices:[{recipeId:'saccani-mh1',criterion:criterion('compressive',672),label:'28-day compression'}],
  notes:[
   {kind:'observed comparison',text:'MH-1 reports 29.6 MPa at 28 days versus 25.7 MPa for MH-0 and 28.9 MPa for MH-2. MH-2 is higher at 14 days, so the selected age matters.',locator:'Table 4 / MH-0, MH-1, MH-2'},
   {kind:'selection rationale',text:'MH-1 is selected for its highest observed 28-day mean, not as a statistically established or general optimum. The reported ± type remains unresolved.',locator:'Table 4; curated recipe evidence limits'},
   {kind:'mechanism not isolated',text:'Biochar replaces reactive metakaolin while activator quantities stay fixed. The comparison does not isolate pore filling, water demand and chemistry; more biochar is not automatically better.',locator:'Table 2; source-method limitations'}
  ]
 },
 'basalt-fiber-carbon-textile':{
  title:'Choose the matrix version by mechanical goal; textile plates are separate',
  choices:[{recipeId:'le-matrix-24mm-075',criterion:criterion('flexural',672),label:'Highest reported 28-day matrix flexure mean'},{recipeId:'le-matrix-12mm-075',criterion:criterion('compressive',672),label:'Highest reported 28-day matrix compression mean'}],
  notes:[
   {kind:'observed comparison',text:'24 mm / 0.75% basalt reports 14.10 MPa matrix flexure versus 11.78 MPa for the unreinforced control. The highest matrix compression mean is instead 83.77 MPa for 12 mm / 0.75%.',locator:'Table 3 / matrix variants and control'},
   {kind:'selection rationale',text:'Select by the required endpoint. Fiber length and dose vary together, reported spread type is unresolved, and these matrix values must not be assigned to carbon-textile plates.',locator:'Tables 2–3; matrix/assembly scope'},
   {kind:'mechanism not isolated',text:'The available comparison supports an observed performance tradeoff, not an isolated causal contribution of length, dispersion or crack bridging. Resolve the matrix loading protocol before reproduction.',locator:'Section 2.2; curated method limitations'}
  ]
 },
 'seawater-strength-versus-free-chloride':{
  title:'SW has the highest observed 28-day compression mean; chloride remains a separate constraint',
  choices:[{recipeId:'seawater-sw',criterion:criterion('compressive',672),label:'SW — compression comparison only'}],
  notes:[{kind:'observed comparison',text:'SW reports 54.22 MPa versus PW 51.16 and TW 49.62 MPa at 28 days. This ranking does not establish statistical superiority or reinforcement suitability.',locator:'§3.1 / 28-day water-source comparison'},
   {kind:'selection rationale',text:'Retain pure/tap-water controls and free-chloride measurements. The water condition changes several dissolved species, so this is not an isolated chloride mechanism or an overall durability winner.',locator:'§§2.1–2.2; free-chloride discussion'}]
 },
 'carbonate-slag-hydroxide-balance':{
  title:'C4M1 is a setting/shrinkage comparison condition, not a universal winner',
  choices:[{recipeId:'xie-c4m1',criterion:null,basis:'Qualitative reaction and shrinkage tradeoff; numerical ranking not extracted.',label:'C4M1 — Ca-rich auxiliary activator condition'}],
  notes:[{kind:'observed tradeoff',text:'Increasing calcium relative to magnesium accelerates reaction. Autogenous shrinkage increases while drying shrinkage decreases; select the endpoint before calling it better.',locator:'Results and conclusions'},
   {kind:'mechanism interpretation',text:'The authors connect calcium hydroxide dissolution with higher alkalinity and binding-gel formation. This interpretation does not establish an isolated cause or guarantee the same response for another slag.',locator:'Reaction-mechanism discussion'}]
 },
 'metakaolin-fly-ash-liquid-definition':{
  title:'FA10.49 is a workability/setting reference; maximum strength is not established here',
  choices:[{recipeId:'vogt-fa10-49',criterion:null,basis:'Source qualitative comparison at matched solution/precursor ratio, not numeric strength ranking.',label:'FA10.49 — matched liquid/solid comparison'}],
  notes:[{kind:'selection rationale',text:'Ten-percent ash substitution improves workability and delays setting without a general strength gain. Keep l/s fixed when comparing it with the metakaolin control; high fly-ash contents and different l/s change the outcome.',locator:'Conclusions; §2.3'},
   {kind:'mechanism interpretation',text:'Reduced water demand offers a processing explanation, while the reactivity of the ash also changes strength development. This condition is not claimed to outperform every other formulation.',locator:'Discussion and conclusions'}]
 },
 'ggbs-taguchi-mortar':{
  title:'T2M9 is a tested high-strength condition with unresolved source conflicts',
  choices:[{recipeId:'alameri-t2m9',criterion:criterion('compressive',672),label:'Tested T2M9 condition — incomplete ingredient ledger'}],
  notes:[{kind:'source conflict',text:'T2M9 reports 126 MPa at 28 days, but Table 5 includes SiC while the conclusion describes zero SiC. Activator and free-water quantities remain unresolved. This is not a complete scalable recipe or a reconciled optimum.',locator:'Table 5; conclusion; curated recipe limitations'}]
 }
};
export function relatedMixes(d){return literatureMixes.filter(r=>doiOf(r)===d.doi.toLowerCase());}
const make=d=>{
 const model=d.evidenceKind==='numerical-model-calibrated-on-prior-experiments',synthesis=d.evidenceKind==='comparative-synthesis-of-prior-experiments';
 const hold=d.doi.toLowerCase()==='10.3390/ma12030526';
 const variants=relatedMixes(d),selection=selections[d.id]||null;
 return {guideId:d.id,doi:d.doi,sourceTitle:d.sourceTitle,citation:d.citation,rights:d.license,licenseUrl:d.licenseUrl||null,checked:'2026-10-21',source:d.source,
  status:hold?'source-hold':model||synthesis?'no-independent-mix':variants.length?'source-mix-with-gaps':'source-review-needed',
  recipeAttribution:variants.map(r=>({id:r.id,title:r.sourceTitle||r.title,authors:r.authors,source:r.fullText||r.url,locator:r.locator,checked:r.checkedAt||null,license:r.license||null})),
  reviewBasis:variants.length?'Existing curated recipe records audited for identity and comparison; this does not newly verify complete source protocols.':'Existing guide and evidence limits audited; complete source recipe review remains pending.',
  selection,recipeIds:variants.map(r=>r.id),
  reportedConstraints:d.facts.map(f=>({text:f.text,locator:f.locator,source:d.source})),
  missing:hold?['Resolve the linked source correction before selecting an experiment recipe.']:
   model?['This is a numerical study calibrated on prior experiments. Obtain the original experimental mix and model parameter ledger separately; no new physical batch is claimed.']:
   synthesis?['This comparison reuses earlier studies. Trace the selected formulation to its original experimental source before supplying a batch.']:
   variants.length?[...new Set(variants.map(r=>r.limitations).filter(Boolean)),...d.holds]:[
    'Complete condition-specific ingredient quantities and their mass/volume denominators have not been extracted for a reproducible batch.',
    'Activator identity, concentration, solution-water contribution and any additive quantities need condition-level reconciliation.',
    'Preparation, material grades, specimen geometry, curing, test age and comparison results need a full protocol check.',...d.holds],
  protocolComplete:false
 };
};
const partialReviews={
 ...mixDesignReview06,
 ...depth200MixReviews,
 ...mixDesignReview04,
 ...mixDesignReview05,
"one-part-admixture-compatibility":{
  "title": "AN-PC1-S is a placement-time candidate, with a strength penalty against AN",
  "notes": "At three days, AN-PC1-S reports 37.5 MPa versus AN 44.6 MPa; initial set is 407 versus 169 min. It exceeds the paired borax combination in the source comparison but is not the maximum-strength option.",
  "ledger": [
    [
      "AN control precursor",
      "Fly ash 0.500 + slag 0.500 mass parts"
    ],
    [
      "AN solid activator",
      "Anhydrous sodium metasilicate 0.100 part"
    ],
    [
      "AN added tap water",
      "0.400 part"
    ],
    [
      "Combined PC1/sucrose doses",
      "Not reconciled from the combined-admixture series; do not copy a single-additive row"
    ]
  ],
  "preparation": "Dry powders/retarder 3 min low speed; add water, 2 min low; add SP, 8 min high. AN-PC1 is a different condition from AN-PC1-S.",
  "testing": "Sealed 60 °C/24 h, cool/demold, store 23 ± 3 °C; six 25 mm cubes, three-day compression at 20 ± 2 MPa/min, AS 1012.9. Initial set starts at water addition.",
  "locator": "§§3.1–3.2 / Table 5 / AN; combined-admixture comparison / Table 7",
  "gaps": [
    "Complete combined-admixture masses and solution water need confirmation.",
    "Commercial SP identity and present-day lot equivalence are separate checks; no complete recipe transfer."
  ]
},
"metakaolin-slag-potassium-durability":{
  "title": "Higher-MK mortar is the reported durability candidate; preserve mixed sodium/potassium chemistry",
  "notes": "Higher MK reduces losses in the reported durability comparisons. Strength alone does not establish the optimum across sulfate, acid, freeze–thaw and heat exposure.",
  "ledger": [
    [
      "First reported MK/GGBFS condition",
      "9.1 / 13.7 wt%"
    ],
    [
      "Reported water / KOH",
      "9.6 / 4.5 wt%"
    ],
    [
      "Sodium silicate solution / sand",
      "1.5 / 61.5 wt%"
    ],
    [
      "Rounding",
      "Listed entries total 99.9%; no forced normalization"
    ]
  ],
  "preparation": "KOH and silicate with tap water at 50 °C in a closed container; mixing water corrected for silicate-solution water. Exact ledger interpretation and mixer sequence pending.",
  "testing": "40×40×160 mm prisms and 50 mm cubes, uncovered laboratory cure 28 days; exact ambient temperature/RH unresolved. Durability exposures have separate conditioning schedules.",
  "locator": "Materials; mixture composition table / first blend; durability methods",
  "gaps": [
    "Reconcile water and KOH entries as supplied versus dissolved; avoid double-counting solution water.",
    "Full casting, test loading and exposure-specific recipe identity need extraction before replication."
  ]
},
"ambient-fly-ash-coating-process":{
  "title": "One-hour mixing is the authors’ process candidate; coating adhesion needs its own acceptance test",
  "notes": "The paper favors one-hour over ten-minute mixing for its fly-ash system. This does not establish an optimum for another ash, mixer or substrate.",
  "ledger": [
    [
      "Precursor",
      "West Burton fly ash supplied by CEMEX"
    ],
    [
      "Activator and ash quantities",
      "Condition-specific mass ledger not yet extracted"
    ],
    [
      "Substrate",
      "Concrete age and surface roughness remain part of the condition"
    ]
  ],
  "preparation": "Ash added to alkaline solution, manual spatula mixing then mechanical mixing; trowel onto concrete. Exact quantities and speed pending.",
  "testing": "Separate 28-day cures: laboratory 20 ± 2 °C / average 50% RH; chamber 20 ± 1 °C / 95% RH. Adhesion specimen/protocol still needs extraction.",
  "locator": "Synthesis procedure; §§3.2.3–3.2.4 / Table 3; mixing comparison",
  "gaps": [
    "Extract full activator ledger, coating thickness and substrate preparation before batching.",
    "Do not pool the two humidity regimes or infer bond from paste compression."
  ]
},
"starch-borax-retarder-screening":{
  "title": "Starch plus borax is a placement-time candidate within the tested precursor blends",
  "notes": "The combination lengthens setting while retaining the study’s mechanical requirements. An extended setting time is not necessarily a strength gain or a universal best dose.",
  "ledger": [
    [
      "Initial FA/GGBFS screen",
      "60/40 mass ratio"
    ],
    [
      "Other precursor comparisons",
      "50/50 and 40/60"
    ],
    [
      "Activator",
      "Sodium silicate + 10 M NaOH, reported 2:1; ratio basis unresolved"
    ],
    [
      "Starch feed",
      "Prepared with water at 1:1 additive/water; exact dose basis and total water unresolved"
    ]
  ],
  "preparation": "Activator prepared 24 h before casting; starch solution and powder borax are distinct additions. Full order/time not extracted.",
  "testing": "Vicat setting and mortar compression; ambient and 60 °C oven cures kept separate. Exact strengths/ages not extracted here.",
  "locator": "Materials and preparation; Table 2 / retarder combinations; conclusions",
  "gaps": [
    "Extract starch/borax doses, hydration form, activator mass ratio and full water accounting.",
    "Complete mold, cure, loading protocol and dose-specific results still pending."
  ]
},
"metakaolin-curing-temperature-grade":{
  "title": "Choose the metakaolin grade before selecting a curing-temperature condition",
  "notes": "MKW and MKB are different research materials. At 40/50 °C mixing became difficult through liquid loss; higher temperature is not a universal process improvement.",
  "ledger": [
    [
      "Metakaolin",
      "MetaMax MKW or ARGECO MKB; do not substitute one for the other"
    ],
    [
      "Sand/activator quantities",
      "Table 4 condition-specific ledger still to extract"
    ],
    [
      "Temperature sweep",
      "10, 15, 20, 30, 40, 50 °C"
    ]
  ],
  "preparation": "Molds, MK and sand approach target temperature for about 5–6 h; mix, plastic wrap, hold study temperature 72 h, then retain study temperature for storage.",
  "testing": "Appendices distinguish widths/heights, forces and strengths. The actual loading rate differs from cited-standard averages; one high-rate test and one defective specimen were excluded.",
  "locator": "§3.2; Table 4; Appendices A–B",
  "gaps": [
    "Extract grade-specific recipe ledger and loading rates before reproduction.",
    "Resolve specimen ages and excluded-test identities; no graph-derived maximum-strength ranking."
  ]
},
 'metakaolin-water-temperature':{
  title:'M0.6 is the lower-added-water reference; initial temperature stays part of the condition',
  notes:'Lower added water trades flow for higher hardened strength in this system. No universal best initial temperature or numerical age-specific winner is selected here.',
  ledger:[['Waste metakaolin','1.00 mass part'],['10 M NaOH stock solution','0.25 mass part'],['Added distilled water, M0.6','0.15 mass part; separate from solution water']],
  preparation:'Condition materials at selected 5/15/25/35 °C for 24 h; activator magnetic mix 30 min; paste 3 min at 140 rpm in 20 ± 1 °C room.',
  testing:'Selected hardened series: 70 mm cubes, covered, 80 °C/24 h then room storage. Age-specific compression results not extracted.',
  locator:'§2.2 / Table 1 / M0.6; hardened-specimen methods',
  gaps:['Resolve M versus MK naming and temperature-specific sample identity.','NaOH stock water content, full age-specific result and protocol review pending; no calculator transfer.']
 },
 'fly-ash-slag-efflorescence-moisture':{
  title:'Keep both activators and exposure regimes; no single durability winner selected',
  notes:'NHFS and NSFS differ in activator chemistry. Moisture transport and wrapping affect efflorescence, so a strength-only ranking would omit the study’s purpose.',
  ledger:[['Class F fly ash / slag','80/20 wt% of precursor'],['Activator/precursor','0.50 mass ratio; condition-specific activator chemistry unresolved']],
  preparation:'Dry mix powders then activator; exact mixer settings/time not extracted.',
  testing:'100×200 mm cylinders; 20 ± 1 °C / RH ≥95%, demold 24 h, cure 28 d. Exposure adds 28 d at 20 ± 1 °C / 60 ± 2% RH, base 2 ± 0.5 mm in DI water, refill daily. Covered/exposed/control arms remain separate.',
  locator:'§§2.1–2.3 / NHFS and NSFS; exposure regimes',
  gaps:['Reconcile activator preparation and all water contributions before scaling.','Controls continue moist cure; exposure is not an ordinary 56-day strength curve.']
 },
 'metakaolin-slag-shrinkage-controls':{
  title:'Choose strength and shrinkage targets together; the strongest blend is not automatically the best',
  notes:'MK replacement and NaOH concentration both vary; activator dosage also changes to meet flow. The study does not isolate blend effects at fixed water demand.',
  ledger:[['MK/GGBFS precursor','0/100, 50/50, 100/0 wt%'],['NaOH','6, 10 or 14 M'],['Activator amount','Adjusted for 110 ± 5% flow; complete solution masses not extracted']],
  preparation:'Mix 2–5 min, cast/seal 24 h at room temperature; demold to 23.2 ± 2 °C / 52 ± 3% RH.',
  testing:'28-day compression: 50 mm cubes, ASTM C109/C109M-20. Shrinkage: 25×25×285 mm bars, ASTM C157-75, initial reading after demolding.',
  locator:'§§3.2–3.3 / Table 2; test methods',
  gaps:['Source ratio headings use wt% while guide says molar: reconcile before calculating activator chemistry.','Exact activator ledger and strength–shrinkage optimum remain unresolved.']
 },
 'one-part-waste-sand-water-demand':{
  title:'MCT0.33: highest reported 28-day compression of this study’s mortars',
  notes:'CT 86 MPa exceeds W 79 and CA 70 MPa, but their W/B ratios differ (0.33 / 0.29 / 0.35). Aggregate identity and water demand are coupled; no isolated chemical cause is established.',
  ledger:[['BFS','100 g'],['Sodium metasilicate powder','10 g'],['CT waste sand, 63 µm–2 mm','200 g'],['Water','Unresolved: W/B 0.33 denominator must be reconciled before weighing']],
  preparation:'Solid precursor and activator; add water. Exact sequence, mixer settings and curing protocol not yet extracted.',
  testing:'28-day mortar compression; specimen and loading protocol still need extraction.',
  locator:'§§2.1–2.2 / Table 1 / MCT0.33; Table 6 / this-work rows',
  gaps:['Water/binder denominator and water mass unresolved; no gram scaling permitted.','Complete preparation, curing and test procedure still pending.']
 },
 'rap-geopolymer-grout-versus-composite':{
  title:'Grout D for strength; evaluate B when penetration and working time matter',
  notes:'Table 4: D (80/20 GGBS/FA, LS 0.27) reaches 108 MPa, but flow takes 608.6 s and set 13 min. B (40/20/20/20 GGBS/FA/MK/SF, LS 0.33) gives 67 MPa, 32.6 s flow and 65 min set. D failed adequate penetration at 54/62 vol% RAP; grout strength is not composite strength.',
  ledger:[['D dry binder fractions','80% GGBS / 20% FA'],['Activator','Geosil potassium silicate, 45% solids; solution quantity unresolved'],['LS','0.27 for D; full water/solution denominator unresolved']],
  preparation:'RAP skeleton 8–14 mm; grout poured about 30 cm above it. Grout mixing sequence/time not extracted.',
  testing:'Grout: 50 mm cubes, 28 days, polyethylene covered at 20 °C, reported BS EN 1015:11:1999.',
  locator:'§§2.2, 3.2–3.3, 4.2 / Table 4',
  gaps:['Complete liquid ledger and mixing procedure unresolved; no scaling.','§4.1 blend attribution conflicts with Table 4; use named table rows provisionally and reconcile before replication.']
 }
};
export const deepDiveMixDesigns=deepDives.map(d=>{const p=make(d),review=partialReviews[d.id];const packet=review?{...p,status:p.recipeIds.length?'source-mix-with-gaps':'partial-source-design',reviewBasis:'Selected primary methods and comparison rows reviewed by AI; ingredient ledger and protocol remain partial.',partialReview:review,missing:[...review.gaps,...d.holds]}:p;return {...packet,dataSet:buildMixDataSet(packet,d,relatedMixes(d))};});
export const mixDesignFor=id=>deepDiveMixDesigns.find(p=>p.guideId===id)||null;
export function mixVariant(id){return literatureMixes.find(r=>r.id===id)||null;}
export function proportionalExample(r,total=1000){
 if(!r?.scalable||!r.ingredients?.length)throw Error('Complete as-supplied proportions are not available for scaling.');
 if(!Number.isFinite(total)||total<=0)throw Error('A positive finite wet batch mass is required.');
 if(r.ingredients.some(x=>!Number.isFinite(x.mass)||x.mass<0))throw Error('Unknown quantities cannot be scaled.');
 const sum=r.ingredients.reduce((n,x)=>n+x.mass,0);if(sum<=0)throw Error('A positive source mass total is required.');
 return r.ingredients.map(x=>({name:x.name,massG:x.mass/sum*total,kind:'calculated proportional example',source:r.url,locator:r.locator}));
}
export function validateMixDesigns(records,guides){
 if(records.length!==guides.length)throw Error('Each deep dive needs a mix-design record.');const seen=new Set();
 for(const p of records){const d=guides.find(d=>d.id===p.guideId);if(!d||d.doi!==p.doi||seen.has(p.guideId))throw Error('Mix design identity mismatch.');seen.add(p.guideId);
  if(!['source-hold','no-independent-mix','source-mix-with-gaps','source-review-needed','partial-source-design'].includes(p.status))throw Error('Invalid mix-design status.');
  if(p.protocolComplete!==false)throw Error('No complete protocol has been verified in this audit.');
  validateMixDataSet(p.dataSet,d);
  if(!p.missing.length||!/^https:\/\//.test(p.source))throw Error('Missing protocol limits or source.');
  for(const id of p.recipeIds){const r=mixVariant(id);if(!r||doiOf(r)!==p.doi.toLowerCase())throw Error('Recipe/source mismatch.');}
  if(p.selection)for(const c of p.selection.choices){const r=mixVariant(c.recipeId);if(!p.recipeIds.includes(c.recipeId)||(!c.criterion?!c.basis:!r?.results.some(x=>x.property===c.criterion.property&&x.ageHours===c.criterion.ageHours)))throw Error('Unsupported selection endpoint.');}
 }
 return true;
}
export function mixDesignExport(){return {format:'geopolymer-deep-dive-mix-designs-v1',checked:'2026-10-21',notice:'Recipe audit, not a claim that all guide protocols are complete. Proportional examples preserve reported as-supplied masses; they do not reproduce unknown methods or predict performance.',records:deepDiveMixDesigns};}
