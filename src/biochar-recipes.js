// Saccani et al., CC BY 4.0. Five variants from one study, not replication.
const url='https://doi.org/10.3390/ma18030486';
const pdf='https://cris.unibo.it/retrieve/18a88cc9-e847-4171-b93c-8b7d2c5eae67/materials-18-00486.pdf';
const row=(name,mass,role='precursor',comp={})=>({name,mass,role,include:true,comp});
// Table 2 wet-batch percentages; Table 4 compression means and reported ±.
const data=[
 [0,56.02,0,'23.6','3.0','26.6','2.9','25.7','2.7'],
 [1,55.46,0.56,'28.3','3.0','30.0','2.4','29.6','2.8'],
 [2,54.90,1.12,'27.6','2.8','30.4','2.8','28.9','2.9'],
 [5,53.22,2.80,'21.1','2.8','23.6','2.2','24.2','2.0'],
 [8,51.54,4.48,'18.2','2.6','19.2','2.5','20.1','2.7']
];
export const biocharRecipes=data.map(([dose,mk,char,...cells])=>({
 id:'saccani-mh'+dose,title:'Saccani et al. · MH-'+dose+' hardwood biochar paste',
 authors:'Andrea Saccani, Luca Baldazzi and Stefania Manzi',year:2025,type:'Journal article',
 family:'Saccani hardwood biochar series',activation:'sodium',form:'paste',doi:'10.3390/ma18030486',url,fullText:pdf,
 sourceTitle:'Effects of Biochar Addition on the Properties of Alkali-Activated Materials',checkedAt:'2026-10-15',
 locator:'Table 2, p. 7; Table 4, p. 12 / MH-'+dose+'; §§2.1–2.3.4',
 strength:Number(cells[4]),age:'28 days',scalable:true,status:'Published mass percentages',
 system:'Argicem metakaolin / hardwood biochar · 8 M NaOH + Reoflux B sodium silicate',
 summary:dose+'% metakaolin replacement series; hardwood biochar, not coffee ash. One study; no general optimum inferred.',
 basis:'Table 2 percentages of total wet batch. MH-'+dose+' replaces '+dose+'% of the original metakaolin mass; this is not '+dose+'% of the wet batch. Activator entries are solutions, not dry chemicals.',
 ingredients:[row('Argicem metakaolin',mk),...(char?[row('Prepared hardwood biochar',char,'additive')]:[]),row('Reoflux B sodium silicate solution',21.29,'activator',{H2O:56}),row('8 M sodium hydroxide solution',21.29,'activator'),row('Added water',1.4,'water',{H2O:100})],
 parameters:[['Biochar replacement',dose+' wt% of original metakaolin'],['Biochar preparation (§2.1)','Peach/grapevine hardwood; slow pyrolysis to 550 °C at 10–15 °C/min, hold 30 min; dry 55 °C for 72 h, grind and sieve 0.5 mm'],['Activator (§2.1)','8 M NaOH solution; Reoflux B water 56 wt%, stated SiO₂/Na₂O ratio 2.07 (basis not assigned here)'],['Commercial identities','Historical study materials; current availability and substitute equivalence unverified']],
 preparation:'§2.2: combine metakaolin and prepared biochar, add the premixed activator solutions, then added water. Mixing speed and duration are not specified.',
 curing:'§2.2: room-temperature bag-sealed first 24 h, then demold cylinders into hermetic containers. §2.3.4 reports room temperature and 60 ± 10% RH; internal container humidity and exact temperature are unknown.',
 method:'§2.3.4: 27 mm diameter × 55 mm cylinders, 100 kN Wolpert apparatus, 5 mm/min; EN 196-1 with explicitly nonstandard specimen dimensions. Initial compression at 7, 14 and 28 days. Per-age replicate count unresolved.',
 limitations:'Scaling uses solution masses only. NaOH solution water fraction/density and qualified precursor assays are missing, so calculator ratios and total water need review. Fixed activator quantities while replacing metakaolin confound chemistry with biochar dose. Reported ± type unresolved. Do not infer adhesion, flexure or shrinkage from compression. Forty-day results involve water exposure and drying; not included as ordinary age progression.',
 results:[7,14,28].map((days,i)=>({property:'compressive',value:Number(cells[i*2]),spread:Number(cells[i*2+1]),original:cells[i*2]+' ± '+cells[i*2+1],spreadKind:'reported ±; type unresolved',unit:'MPa',ageHours:days*24,kind:'source-reported',context:'Initial cured cylinders; not post-capillary exposure',locator:'Table 4, p. 12 / MH-'+dose+' / '+days+' days'})),
 license:{label:'CC BY 4.0',url:'https://creativecommons.org/licenses/by/4.0/',evidenceUrl:pdf,notice:'© 2025 the authors. Selected facts reformatted with source links; no endorsement.'},
 evidenceLimits:'Partial AI source review: Tables 2 and compression columns of Table 4 checked in rendered PDF. Other properties, figures and exposure results remain unextracted. Five variants belong to one dataset.',
 tweaks:[{kind:'Study comparison',text:'Compare all five doses, including the lower-strength high-dose mixes. Keep feedstock, pyrolysis, grading and activator fixed; a different char needs new controls.',related:data.map(([d])=>'saccani-mh'+d)}]
}));
