import {basaltMatrixRecipes,carbonTextileRecipes,hempBasaltFoamRecipes} from './fiber-recipes.js';
// Published design references. These two variants are one study, not replications.
const source='https://www.frontiersin.org/journals/materials/articles/10.3389/fmats.2021.773103/full';
export const novelRecipeAdditions=[
 ...[['pt5','PT5',1.5,46.4,672],['pt6','PT6',1.8,44.7,168]].map(([id,mix,cnt,value,hours])=>({
  id:'meng-'+id,title:'Meng et al. · '+mix+' PVA / carbon nanotubes',authors:'Tao Meng, Xiufen Yang, Yue Yu, Hongming Yu and Miaozhou Huang',year:2021,type:'Journal article',family:'Meng PVA/CNT series',activation:'sodium',form:'paste',
  url:source,doi:'10.3389/fmats.2021.773103',locator:'Table 3, '+mix+'; Mix Proportions and Curing Methods; mixed-group Compressive Strength discussion',checkedAt:'2026-10-15',
  strength:value,age:hours/24+' days',system:'Sodium activation · metakaolin / PVA / CNT',status:'Partial recipe · no mass scaling',scalable:false,
  summary:mix+' hybrid-fiber design reference. Quantities remain incomplete.',
  basis:'PVA: kg/m³. CNT: per mille of metakaolin mass. Full batch unresolved.',ingredients:[],
  parameters:[['PVA', '1.2 kg/m³'],['CNT',cnt+'‰ of metakaolin mass']],
  curing:'Demold at 24 h; 20 ± 2 °C, >95% RH.',method:'Compression of broken 40 × 40 × 160 mm prisms; 40 × 40 mm loaded face.',
  limitations:'Activator/water quantities unresolved. No calculator transfer. Flexure age unresolved; no numeric flexural entry. No shear, substrate-bond or density claim.',
  results:[{property:'compressive',value,unit:'MPa',ageHours:hours,context:mix+'; broken prism',kind:'source-reported',locator:'Mixed-group Compressive Strength discussion (Figure 4 narrative)'}],
  tweaks:[{kind:'Proposed experiment',text:'Resolve the batch and dispersion procedure before comparing a control, each additive separately, and their combination.'}],
  license:{label:'CC BY 4.0',url:'https://creativecommons.org/licenses/by/4.0/',evidenceUrl:source,notice:'© 2021 Meng, Yang, Yu, Yu and Huang. Selected factual data reformatted; no author endorsement.'},
  evidenceLimits:'Partial AI source check; not independent replication. Figures were not digitized.'
 }))
];
// These labels indicate study scope, never a guaranteed benefit.
export const recipeFocus={
 ...Object.fromEntries(basaltMatrixRecipes.map(m=>[m.id,['compressive','flexural','workability']])),
 ...Object.fromEntries(carbonTextileRecipes.map(m=>[m.id,['flexural','workability']])),
 ...Object.fromEntries(hempBasaltFoamRecipes.map(m=>[m.id,['flexural','lightweight']])),
 'nematollahi-pp0':['compressive','flexural','bond','workability'], 'nematollahi-pp1':['compressive','flexural','bond','workability'],
 'vogt-gp0':['compressive'], 'vogt-gp6':['compressive'], 'vogt-gp75':['compressive'], 'vogt-gp9':['compressive'],
 'bong-na-n-25':['compressive','flexural','bond','workability'], 'bong-k-ka20-25':['compressive','workability'],
 'alameri-t2m9':['compressive'], 'meng-pt5':['compressive','flexural'], 'meng-pt6':['compressive']
};
export const novelRecipeGroups=[
 {id:'hemp-basalt-foam',title:'Hemp & basalt foams',focus:'Bending and thermal-insulation study',recipes:hempBasaltFoamRecipes.map(m=>m.id),note:'Five same-study designs. Batch and numerical-result mapping remain unresolved; scaling is disabled.'},
 {id:'basalt-mortar',title:'Chopped basalt in mortar',focus:'Compression, flexure and workability',recipes:basaltMatrixRecipes.map(m=>m.id),note:'Three matrix variants with mass scaling. Fiber dose is relative to geopaste; these results do not describe carbon-textile plates.'},
 {id:'carbon-textile',title:'Carbon textile + basalt',focus:'Textile assembly and bending behavior',recipes:carbonTextileRecipes.map(m=>m.id),note:'Two geometry-dependent assemblies. Textile quantity is unresolved; no matrix strength is copied to the plate.'},
 {id:'polypropylene',title:'Polypropylene + cellulose modifier',focus:'Bending behavior, printability and interlayer bond',recipes:['nematollahi-pp0','nematollahi-pp1'],note:'Control proportions can scale. The fiber design keeps its volume basis and cannot yet transfer to a gram batch. Both fiber and CMC change.'},
 {id:'hybrid-fibers',title:'PVA fibers + carbon nanotubes',focus:'Compression; flexure needs further extraction',recipes:['meng-pt5','meng-pt6'],note:'Partial published designs. Compare only the stated ages; neither is a complete mass recipe.'},
 {id:'silica-fume',title:'Silica fume additions',focus:'Compression and early-age tradeoffs',recipes:['vogt-gp0','vogt-gp6','vogt-gp75','vogt-gp9'],note:'One study with a control. More additive is not a guarantee of better performance.'},
 {id:'printing-admixes',title:'Borax + cellulose modifier',focus:'Printability, flexure and interlayer bond',recipes:['bong-na-n-25','bong-k-ka20-25'],note:'Printed interlayer tension is different from shear or adhesion to an existing substrate.'},
 {id:'steel-fibers',title:'Steel fibers + silica fume',focus:'Compression in a heat-cured mortar',recipes:['alameri-t2m9'],note:'Published design has unresolved source discrepancies. Scaling remains disabled.'}
];
export const novelRecipeIds=new Set(novelRecipeGroups.flatMap(g=>g.recipes));
export const focusLabels={compressive:'Compression',flexural:'Flexure',shear:'Shear',bond:'Bond',lightweight:'Lighter weight',workability:'Workability'};
export const focusOf=m=>recipeFocus[m.id]||[...new Set(m.results.map(r=>r.property))];
