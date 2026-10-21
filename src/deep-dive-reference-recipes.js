// Goal-qualified reference conditions, not numeric strength optima.
const row=(name,mass,role='precursor',comp={})=>({name,mass,role,include:true,comp});
const rights=evidenceUrl=>({label:'CC BY 4.0',url:'https://creativecommons.org/licenses/by/4.0/',evidenceUrl,notice:'Selected factual extraction, reformatted with attribution; no endorsement.'});
export const deepDiveReferenceRecipes=[{
 id:'xie-c4m1',title:'Xie and Liu · C4M1 carbonate-activated slag',authors:'Lilan Xie and Kaiwei Liu',year:2022,type:'Journal article',doi:'10.3390/ma15051687',url:'https://doi.org/10.3390/ma15051687',fullText:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8911503/',
 sourceTitle:'Properties and Microstructure of Na₂CO₃-Activated Binders Modified with Ca(OH)₂ and Mg(OH)₂',checkedAt:'2026-10-21',family:'Carbonate slag auxiliary-activator series',activation:'sodium',form:'paste',strength:null,age:'Not numerically extracted',scalable:true,status:'Source mass ledger; partial protocol',system:'Slag · sodium carbonate · calcium/magnesium hydroxides',
 summary:'C4M1 accelerates reaction relative to Mg-rich variants; autogenous and drying shrinkage respond differently.',
 basis:'Table 1 / C4M1, grams. Water/slag = 0.50; hydroxides are additional to slag, not slag replacement.',
 ingredients:[row('Source GBFS',100),row('Sodium carbonate',10,'activator'),row('Calcium hydroxide',4,'activator'),row('Magnesium hydroxide',1,'activator'),row('Water',50,'water',{H2O:100})],
 parameters:[['Condition','C4M1 versus C1M4 and carbonate-only C0']],
 preparation:'§2: dry mix slag/solid activators 4 min, then water and paste mixer 4 min.',
 curing:'Glass-covered molds, 20 ± 1 °C moisture chamber; RH printed ≥95 ± 2%. Demolding/sealing chronology unresolved.',
 method:'30 mm cubes for compression; 20×20×80 mm prisms for length changes. Loading rate, replicate counts and full shrinkage protocols pending.',
 limitations:'No numerical optimum or strength assigned. More calcium accelerates reaction but raises autogenous shrinkage while reducing drying shrinkage. Chemical grades and complete protocols need reconciliation.',
 results:[],locator:'§2 / Table 1 / C4M1; results and conclusions',license:rights('https://pmc.ncbi.nlm.nih.gov/articles/PMC8911503/'),
 evidenceLimits:'Partial AI text review, not visual figure verification or domain review. Indexed primary CC BY 4.0 statement observed; direct PMC open encountered browser check.',
 tweaks:[{kind:'Study comparison',text:'Include C0 and C1M4 controls before choosing a setting/shrinkage compromise. No universal best condition.'}]
},{
 id:'vogt-fa10-49',title:'Vogt et al. · FA10.49 metakaolin/fly-ash paste',authors:'Oliver Vogt, Neven Ukrainczyk, Conrad Ballschmiede and E. A. B. Koenders',year:2019,type:'Journal article',doi:'10.3390/ma12213485',url:'https://doi.org/10.3390/ma12213485',fullText:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6862292/',
 sourceTitle:'Reactivity and Microstructure of Metakaolin Based Geopolymers: Effect of Fly Ash and Liquid/Solid Contents',checkedAt:'2026-10-21',family:'Vogt fly-ash replacement / liquid-solid series',activation:'potassium',form:'paste',strength:null,age:'Not numerically extracted',scalable:true,status:'Derived source proportions; partial protocol',system:'Quartz-rich MK / Class F ash · potassium silicate',
 summary:'10% ash is a workability/setting comparison candidate, not an established maximum-strength recipe.',
 basis:'§2.3 defines FA10.49: 10 wt% ash in precursor, solution/precursor 0.49. On a calculated 100-part precursor basis: MK 90, ash 10, solution 49. This is a derived mass ledger, not a source batch size.',
 ingredients:[row('Source quartz-rich metakaolin',90),row('Source Class F fly ash',10),row('Industrial potassium silicate solution',49,'activator',{H2O:55})],
 parameters:[['Silicate specification (§2.1)','45% solids; molar SiO₂/K₂O 1.5; density 1.51 g/cm³']],
 preparation:'§2.3: dry mix powders; add silicate, planetary mix 10 min. Cast 160×40×40 mm prisms; vibrate until visible bubbles stop.',
 curing:'Demold after one day, aluminum adhesive tape wrapping; 21 °C / 50% RH to characterization.',
 method:'§2.5: 80×40×40 mm half-prism compression, DIN EN 196-1, 2.4 kN/s. No graph-derived strength entered.',
 limitations:'Dry mixing duration, mixer speed, initial-day conditions and independent batches unresolved. Ten-percent substitution improves workability/retards setting without a general strength gain; endpoint and liquid ratio matter.',
 results:[],locator:'§§2.1, 2.3, 2.5; conclusions',license:rights('https://pmc.ncbi.nlm.nih.gov/articles/PMC6862292/'),
 evidenceLimits:'Partial AI primary-text review; CC BY 4.0 observed at article copyright heading. No figure digitization, complete inventory or domain review.',
 tweaks:[{kind:'Study comparison',text:'Compare MK.49 and FA10.49 at matched solution/precursor ratio, then assess workability and strength separately.'}]
}];
