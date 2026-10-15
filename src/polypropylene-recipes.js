const row=(name,mass,role='precursor',comp={})=>({name,mass,role,include:role!=='aggregate',comp});
const url='https://doi.org/10.3390/ma11122352';
export const polypropyleneRecipes=[
 ...[['pp0','PP0',0.040,0],['pp1','PP1.00',0.004,1]].map(([id,mix,cmc,fiber])=>({
  id:'nematollahi-'+id,title:'Nematollahi et al. · '+mix+' printing mortar',authors:'Behzad Nematollahi, Praful Vijay, Jay Sanjayan, Ali Nazari, Ming Xia, Venkatesh Naidu Nerella and Viktor Mechtcherine',year:2018,type:'Journal article',family:'Nematollahi PP/CMC series',activation:'sodium',form:'mortar',
  url,fullText:'https://pdfs.semanticscholar.org/95d9/13e9485891c93605cb6f84df43b12c435179.pdf',doi:'10.3390/ma11122352',checkedAt:'2026-10-15',locator:'Tables 2–3; §§2.1–2.3, 3.4',
  strength:null,age:'1 day reported; after heat cure and cooling',results:[],
  system:'Fly ash · sodium activator / CMC'+(fiber?' / polypropylene':''),
  status:fiber?'Mixed quantity bases · no mass scaling':'Published mass proportions',scalable:!fiber,
  summary:mix+' comparison reference; no numerical strength extracted.',
  basis:'Mass parts per fly ash; fiber separately in vol%. Activator split calculated from silicate/NaOH solution mass ratio 2.5.',
  ingredientUnit:'Mass parts per fly ash; excludes separately stated fiber',
  ingredients:[row('Gladstone fly ash',1),row('8 M NaOH solution',0.467/3.5,'activator'),row('N-grade sodium silicate',0.467*2.5/3.5,'activator',{H2O:62.4}),row('CS sand',1.135,'aggregate'),row('FS sand',0.365,'aggregate'),row('Sodium CMC',cmc,'additive')],
  parameters:[['PP fiber',fiber+' vol%'],['Cure','Sealed 60 °C / 24 h, then cooling']],
  curing:'Sealed 60 °C for 24 h; laboratory cooling/storage at 23 ± 3 °C.',method:'Printed specimens; direction-dependent compression/flexure and interlayer tension.',
  limitations:(fiber?'Fiber mass unresolved; rows exclude fiber. No calculator transfer. ':'Proportional scaling only. Unknown assays remain unknown. ')+ 'CMC also changes between variants; do not isolate a fiber effect. No ambient-cure, shear or substrate-adhesion inference.',
  tweaks:[{kind:'Study comparison',text:'Compare the control and fiber design while retaining their CMC difference; qualify volume-to-mass conversion before adapting the fiber mix.',related:['nematollahi-pp0','nematollahi-pp1']}],
  license:{label:'CC BY 4.0',url:'https://creativecommons.org/licenses/by/4.0/',evidenceUrl:url,notice:'© 2018 the authors. Selected facts reformatted; no endorsement.'},
  evidenceLimits:'Partial AI review; no figure digitization. Publisher-indexed proportions checked against the repository PDF.'
 }))
];
