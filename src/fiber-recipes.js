// Selected designs from two studies, not ten independent replications.
const row=(name,mass,role='precursor',comp={})=>({name,mass,role,include:role!=='aggregate',comp});
const leUrl='https://doi.org/10.3390/polym13050751';
const lePdf='https://pdfs.semanticscholar.org/9828/de233e60ca20ada95dd8648c207ba4c8dbe1.pdf';
const cc='https://creativecommons.org/licenses/by/4.0/';
const leTitle='Investigation on Flexural Behavior of Geopolymer-Based Carbon Textile/Basalt Fiber Hybrid Composite';
const leBase={authors:'Chi Hiep Le, Petr Louda, Katarzyna Ewa Buczkowska and Iva Dufkova',year:2021,type:'Journal article',activation:'sodium',family:'Le basalt / carbon-textile study',url:leUrl,doi:'10.3390/polym13050751',fullText:lePdf,sourceTitle:leTitle,checkedAt:'2026-10-15',
 license:{label:'CC BY 4.0',url:cc,evidenceUrl:lePdf,notice:'© 2021 the authors. Selected facts reformatted; no endorsement.'},
 evidenceLimits:'Partial AI extraction. PDF parser duplicates review headers; no visual table QA. Same-study variants are not replications.'};
// Table 2: fiber is percent of geopaste (cement + activator), not all mortar.
const leIngredients=dose=>[row('Commercial metakaolin-based geocement',1),row('Sodium silicate activator',0.8,'activator',{H2O:66.68}),row('Rough quartz sand',1.5,'aggregate'),row('Micro-milled quartz sand',0.2,'aggregate'),row('Silica fume',0.1),...(dose?[row('Chopped basalt fiber',1.8*dose/100,'aggregate')]:[])];
const matrixSpecs=[['control',0,0,79.56,3.32,11.78,0.48],['6mm-050',6,0.5,77.01,3.13,13.43,0.85],['24mm-075',24,0.75,78.51,2.25,14.10,0.77]];
export const basaltMatrixRecipes=matrixSpecs.map(([id,length,dose,compression,cSpread,flexure,fSpread])=>({
 ...leBase,id:'le-matrix-'+id,title:'Le et al. · '+(dose?length+' mm basalt / '+dose+'%':'unreinforced control')+' mortar',form:'mortar',
 strength:compression,age:'28 days',status:'Published mass proportions',scalable:true,system:'Sodium activation · commercial geocement / silica fume'+(dose?' / basalt':''),
 summary:(dose?length+' mm / '+dose+'% basalt':'Control')+' matrix specimen; excludes carbon textile.',locator:'Table 2 and footnote; Table 3 / '+(dose?length+' mm, '+dose+' wt%':'0.00 control')+'; §2.2',
 basis:'Mass parts per geocement. Basalt mass derived as dose/100 × (1 + 0.8) geopaste; not percent of total mortar.',ingredients:leIngredients(dose),
 parameters:[['Basalt dose',dose+' wt% of geopaste'],['Fiber length',dose?length+' mm':'No fiber']],
 curing:'Plastic-covered, laboratory temperature, 28 days.',method:'30 × 30 × 150 mm matrix prisms; Table 3. Detailed matrix loading protocol unresolved; do not substitute the textile test method.',
 limitations:'Commercial cement is not pure metakaolin. Missing assays stay unknown. Scaling preserves mass only, not dispersion or performance. Reported ± spread type unresolved. Matrix results do not describe textile plates.',
 results:[['compressive',compression,cSpread],['flexural',flexure,fSpread]].map(([property,value,spread])=>({property,value,spread,spreadKind:'reported ±; type unresolved',unit:'MPa',ageHours:672,kind:'source-reported',context:'Matrix only',locator:'Table 3 / '+(dose?length+' mm / '+dose+' wt%':'0.00 control')})),
 tweaks:[{kind:'Study comparison',text:'Check workability and geometry before comparing these variants; changing length and dose together does not isolate either effect.',related:['le-matrix-control','le-matrix-6mm-050','le-matrix-24mm-075']}]
}));
export const carbonTextileRecipes=[['control',0],['6mm-050',0.5]].map(([id,dose])=>({
 ...leBase,id:'le-textile-'+id,title:'Le et al. · carbon textile '+(dose?'+ 6 mm basalt':'reference'),form:'textile composite',
 strength:null,age:'28 days; numerical textile results not extracted',status:'Assembly design · no mass scaling',scalable:false,system:'Carbon textile / sodium geomortar'+(dose?' / basalt':''),
 summary:(dose?'Basalt hybrid':'Reference')+' textile assembly; matrix strength is not inherited.',locator:'§2.2 / TRG preparation; Tables 1–2; §2.3',
 basis:'Matrix mass parts per geocement; textile is a separate geometric reinforcement.',ingredientUnit:'Matrix parts only; excludes carbon textile',ingredients:leIngredients(dose),
 parameters:[['Carbon textile','One layer; HTC 10/15–40'],['Basalt',dose?dose+' wt% of geopaste; 6 mm':'None'],['Plate','400 × 100 × 15 mm; textile above 5 mm bottom layer']],
 curing:'Covered 24 h, then demolded and rewrapped; 22 °C / 55% RH to 28 days.',method:'Textile plates: four-point bending; separate Charpy specimens. No numeric values transferred between specimen types.',
 limitations:'Textile mass and full assembly/yield accounting unresolved. No gram transfer. Fiber clustering and workability require review; no general bond or shear claim.',results:[],
 tweaks:[{kind:'Study comparison',text:'Compare the reference and hybrid assembly with the same textile placement. Their mortar controls are separate records.',related:['le-textile-control','le-textile-6mm-050']}]
}));
const foamUrl='https://ceramics.onlinelibrary.wiley.com/doi/full/10.1111/jace.70158';
const foamRights='https://experts.illinois.edu/en/publications/sodium-based-geopolymer-foamed-composites-reinforced-with-phospha-2/';
export const hempBasaltFoamRecipes=[['control','',0],['1hf','hemp',1],['5hf','hemp',5],['1bf','basalt',1],['5bf','basalt',5]].map(([id,fiber,dose])=>({
 id:'sbi-foam-'+id,title:'Sbi et al. · '+(fiber?dose+'% '+fiber:'unreinforced')+' foam',authors:'Sanae Sbi, Andrew Stumpf, Abdelilah Aboulayt, Nawal Semlal, Jones Alami, Youssef Tamraoui and Waltraud M. Kriven',year:2025,type:'Journal article',activation:'sodium',family:'Sbi hemp / basalt foam study',form:'foam',
 sourceTitle:'Sodium-based, geopolymer foamed composites reinforced with phosphate mine waste particulates and hemp/basalt fibers',doi:'10.1111/jace.70158',url:foamUrl,fullText:foamUrl,checkedAt:'2026-10-15',locator:'§§2.1.1, 2.1.3, 2.2–2.3; zero-WP series',
 strength:null,age:'Test age unresolved; dried to stable mass',results:[],status:'Partial foam design · no mass scaling',scalable:false,
 system:'Sodium waterglass · Metamax metakaolin / peroxide'+(fiber?' / '+fiber:''),summary:(fiber?dose+'% '+fiber:'Control')+' zero-waste-powder comparison; no numerical properties assigned.',
 basis:'Binder molar design and separate fiber mass dose; full constituent batch unresolved.',ingredients:[],
 parameters:[['Binder target','Na₂O·Al₂O₃·4SiO₂·13H₂O'],['Waste powder','0 wt%'],['Fiber',fiber?dose+' wt% of slurry; 12.7 mm; '+(fiber==='hemp'?'untreated hemp':'silane-coated basalt'):'None'],['Foamer','30 wt% H₂O₂ solution; dose 0.5 wt% (source basis wording differs)']],
 curing:'50 °C / 24 h sealed; ambient storage through day 3; then dried to stable mass.',method:'Bending and thermal tests; exact test age unresolved.',
 limitations:'Activator/MK mass split unresolved. Foamer denominator differs between §§2.1.1 and 2.2; retain rather than infer. Table 3 uses S1 IDs versus methods WP IDs: numeric mapping held. Fiber coating differs between families. No calculator transfer.',
 license:{label:'CC BY 4.0',url:cc,evidenceUrl:foamRights,notice:'© 2025 the authors. License linked by Illinois Experts. Selected facts reformatted; no endorsement.'},
 evidenceLimits:'Partial AI review; no digitized figures or assigned thermal values. Five designs belong to one study.',
 tweaks:[{kind:'Study comparison',text:'Use the zero-fiber control and matched doses. Resolve the batch and result identifiers before testing or numerical comparisons.',related:['sbi-foam-control','sbi-foam-1hf','sbi-foam-5hf','sbi-foam-1bf','sbi-foam-5bf']}]
}));
export const fiberRecipes=[...basaltMatrixRecipes,...carbonTextileRecipes,...hempBasaltFoamRecipes];
