import {depth20DeepDives} from './deep-dive-depth20-expansion.js';
import {followupDeepDives} from './deep-dive-followup-expansion.js';
import {readingExpansionDeepDives} from './deep-dive-reading-expansion.js';
import {expansion1000DeepDives} from './deep-dive-expansion-1000.js';
import {expansion800DeepDives} from './deep-dive-expansion-800.js';
import {expansion500DeepDives} from './deep-dive-expansion-500.js';
import {durabilityDeepDives} from './deep-dive-durability.js';
import {controlDeepDives} from './deep-dive-controls.js';
import {hempDeepDive} from './deep-dive-hemp.js';
import {deepDiveAdditions} from './deep-dive-additions.js';
import {deepDiveInventories} from './deep-dive-inventory.js';
import {ownerPdfDeepDives} from './deep-dive-owner-pdfs.js';
// Original editorial synthesis; published facts and proposed replication steps stay separate.
export const deepDives = [{
 id:'ggbs-taguchi-mortar', title:'GGBS mortar: from Taguchi screening to a reproducible experiment',
 summary:'Read the reported method, inspect the mix arithmetic and separate a tested formulation from a statistical recommendation.',
 glossary:'B = binder; GGBS = ground granulated blast-furnace slag; SiC = silicon carbide; SP = superplasticizer; AAS = alkaline activator solution; PS/PH = potassium silicate/potassium hydroxide ratio; W/B = total water/binder.',
 relatedRecipe:'/formulations/alameri-t2m9',
 sourceTitle:'Optimising GGBS-based ultra high-performance geopolymer mortar: an orthogonal array approach',
 doi:'10.1080/13287982.2024.2375468', checked:'2026-10-17',
 citation:'Alameri, Joseph, Mohamed Ali, Elchalakani & Sheikh. Australian Journal of Structural Engineering 26(2), 95–110 (2025); online 25 July 2024.',
 source:'https://digital.library.adelaide.edu.au/server/api/core/bitstreams/f9cdc382-4b62-414d-8035-1b16b5e1aa17/content',
 license:'CC BY 4.0, printed page 95. Original editorial adaptation; source tables and figures are not reproduced in full.',
 highlights:[
  'Use the experiment to learn which variables deserve controlled follow-up, rather than treating a fitted model as a universal strength predictor.',
  'Keep total water, free water, activator solution and admixture solids in separate ledger columns.',
  'The tested-row and recommended-combination identities must be reconciled before claiming a replicated optimum.',
 ],
 facts:[
  {title:'Design and outcome',locator:'§§3.3–4.1; conclusion',text:'Two L9 arrays. T2M9: 126 MPa at 28 days. Recommended SiC/B: zero; T2M9 contains SiC.'},
  {title:'Materials',locator:'§3.2',text:'GGBS; silica fume; SiC; quartz sand (0.075–1.18 mm); 13.95 M KOH; potassium silicate modulus 1.5; demineralised water; ViscoCrete-10 (41.7% solids); hooked 35×0.55 mm and straight 13×0.2 mm steel fibers.'},
  {title:'Tested T2M9',locator:'Table 5',text:'kg/m³: GGBS 511.1; silica fume 196.6; SiC 78.6; sand 1100.7; SP 37.7; hooked fibers 157; straight fibers 78.5. AAS/B 0.38; PS/PH 3; W/B 0.28.'},
  {title:'Reported sequence',locator:'§3.4; Figure 3',text:'Dry blend 3 min → 90% free water plus SP, 10 min → fibers, up to 2 min → activator plus remaining water, 2 min.'},
  {title:'Casting, cure and test',locator:'§3.4',text:'100×200 mm cylinders; three layers, 25 rod strokes each. Covered moulds: 100°C water bath, 24 h; then 100% RH fog room. Grind tops. ASTM C39; 7/28 days; 20 MPa/min.'},
 ],
 arithmetic:{"intro": "Taking the three listed binder components together gives B = 511.1 + 196.6 + 78.6 = 786.3 kg/m³. On that basis:", "rows": [["SiC/B", "78.6 / 786.3 ≈ 0.10", "The tested row is not zero-SiC."], ["SP solids/B", "37.7 × 0.417 / 786.3 ≈ 2.00%", "As-supplied SP/B is about 4.79%; confirm the intended dose basis."], ["Total water target", "0.28 × 786.3 = 220.164 kg/m³", "This is not free water to pour into the mixer."], ["Activator total", "0.38 × 786.3 = 298.794 kg/m³", "Conditional on this binder basis; solution split and water accounting need qualification."]], "notes": ["Free water = target total water − water in activator solutions − water in admixture − applicable aggregate moisture contribution. Document every term; do not replace unknown terms with zero.", "For a proposed 10 L batch, a listed kg/m³ quantity is multiplied by 0.010 m³: GGBS would be 5.111 kg. This is proportional arithmetic only; it does not establish yield, full batch quantities or expected strength. A nominal 100 mm × 200 mm cylinder occupies about 1.571 L before handling losses.", "Fiber volume fraction is not binder mass percentage. Keep the two fiber geometries separate and use qualified density/yield data when converting between mass and volume."]},
 checklist:[
  ['Define the question','Choose either a reproduction of a named table row or a new comparison. Give each adaptation its own ID. A different precursor, activator, cure or fiber is a changed experiment.'],
  ['Qualify materials and equipment','Obtain supplier certificates, SDS, moisture and solution composition. Confirm mixer capacity, suitable moulds, a controlled curing system and a compression laboratory. Handle concentrated alkali under a laboratory SOP with splash protection and compatible equipment; use enclosed dust handling. Have trained staff manage hot-water curing and compression testing.'],
  ['Resolve the batch ledger','Confirm the binder denominator and whether PS/PH compares as-supplied solutions. Obtain activator water fractions and density/purity information. Do not infer solution composition from molarity or silicate modulus alone. Measure aggregate moisture and document its correction.'],
  ['Choose batch size','Specify the number of specimens at each test age before batching. Include independent repeat batches if studying reproducibility; multiple cylinders from one batch measure a different source of variability. Allow separately documented handling losses.'],
  ['Prepare a signed weighing sheet','Use the arithmetic below only for the listed components. Leave unresolved activator/free-water fields blank. A second person or independent calculation should check units, totals and container labels before mixing.'],
  ['Mix and observe','Follow the reported sequence only after the ledger is complete. Log actual addition times, mixer speed, temperature, flow, fiber clumping and initial setting behavior. Record failed or unworkable batches instead of silently adding water. Any rescue addition creates a revised formulation.'],
  ['Cast and cure with traceability','Label every specimen with batch, formulation and test age. Record casting time, actual consolidation, curing temperature history and transfer times. Use the reported cure for a reproduction; ambient curing is a separate test arm, not an equivalent substitute.'],
  ['Test and retain raw measurements','Have a qualified laboratory apply the appropriate current test procedure and record dimensions, end preparation, peak load, failure mode and individual results. Keep paper-specific loading conditions visible if they differ from the laboratory standard.'],
  ['Analyse and confirm','Compare individual results, mean and spread without inventing missing source uncertainty. Randomise practical run order and document batch/day effects. An L9 design screens main effects; it does not independently resolve all interactions. Test the selected combination in fresh confirmation batches before calling it an optimum.'],
 ],
 holds:[
  'Source conflict: Table 5 T2M9 and the conclusion’s zero-SiC combination are not the same composition. No separately verified confirmation batch has been established in this review.',
  'Free-water mass and complete activator solution composition remain unresolved. No one-click calculator transfer or ready-to-run batch is provided.',
  'SP/B basis needs explicit confirmation. The solids calculation below explains the apparent percentage mismatch but is an inference, not a source correction.',
  'Replicate counts and result uncertainty were not established in the inspected methods. Graph-only series, all mixture rows and the statistical tables have not been fully extracted.',
  'Partial AI text review, not human/domain review. Exact-DOI status search found no specific correction notice; this is not comprehensive clearance. Publisher page returned 403; the university copy supplied the methods.',
 ],
}];

deepDives.push(...deepDiveAdditions);

deepDives.push(hempDeepDive);

for(const d of deepDives)if(d.relatedRecipe)d.licenseUrl="https://creativecommons.org/licenses/by/4.0/";

deepDives.push(...controlDeepDives);

deepDives.push(...durabilityDeepDives);

deepDives.push(...ownerPdfDeepDives);

for(const d of deepDives)d.inventory=deepDiveInventories[d.id];
deepDives.push(...expansion500DeepDives);
deepDives.push(...expansion800DeepDives);
deepDives.push(...expansion1000DeepDives);

deepDives.push(...readingExpansionDeepDives);

deepDives.push(...followupDeepDives);

deepDives.push(...depth20DeepDives);
