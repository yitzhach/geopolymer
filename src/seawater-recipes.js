// Partial source-method extraction. Same study/dataset for all three conditions.
const doi='10.3390/ma13061467',url='https://doi.org/'+doi,fullText='https://pmc.ncbi.nlm.nih.gov/articles/PMC7143656/';
const row=(name,mass,role,comp={})=>({name,mass,role,include:true,comp});
export const seawaterRecipes=[['pw','Pure water',51.16],['tw','Tap water',49.62],['sw','West Sea seawater',54.22]].map(([id,water,strength])=>({
 id:'seawater-'+id,title:'Fly-ash paste · '+id.toUpperCase()+' water condition',doi,url,fullText,
 authors:'See linked original article for authorship',year:2020,type:'Journal article',family:'Water-source fly-ash paste series',activation:'sodium',form:'paste',
 sourceTitle:'Mechanical Properties, Microstructure, and Chloride Content of Alkali-Activated Fly Ash Paste Made with Sea Water',checkedAt:'2026-10-21',
 locator:'§§2.1–2.2; §3.1 / '+id.toUpperCase()+' / 28 days',strength,age:'28 days',scalable:true,status:'As-supplied masses; partial protocol',
 system:'Class F fly ash · 9 M NaOH / sodium silicate · '+water,
 summary:id.toUpperCase()+' · '+water+': one water-source comparison, not independent replications. Chloride limits transfer to reinforced applications.',
 basis:'§2.1: nominal 1 L paste uses 1197 g ash + 598 g activator. Equal solution masses give 598/2 = 299 g each (derived). Target activator/ash 0.5 differs slightly from rounded reported masses; retain masses.',
 ingredients:[row('Dangjin Class F fly ash',1197,'precursor'),row('9 M NaOH solution prepared with '+water,299,'activator'),row('Sodium silicate solution',299,'activator',{SiO2:29,Na2O:10,H2O:61})],
 parameters:[['Water condition',water+' for NaOH solution'],['Reported silicate modulus','2.9; do not reinterpret as whole-activator modulus']],
 preparation:'§2.1: activator solutions combined 1:1 by mass; cool 24 h, then mix with ash. Mixer speed/time unresolved.',
 curing:'§2.1: 50 mm cubes, plastic sealed, 60 °C for 24 h; then open laboratory until testing.',
 method:'§2.2: compression, ASTM C109 guidelines, 1000 N/s; three-specimen means. Only the 28-day endpoint extracted here.',
 limitations:'Exact ambient temperature/RH, independent batches and NaOH solution water/density unresolved. No dry-NaOH mass calculation. Free-chloride risk prevents treating seawater as a universal recommendation; no statistical superiority inferred.',
 results:[{property:'compressive',value:strength,unit:'MPa',ageHours:672,kind:'source-reported',context:id.toUpperCase()+' paste cubes, heat cured; not reinforced concrete',locator:'§3.1 / '+id.toUpperCase()+' / 28 days'}],
 license:{label:'CC BY 4.0',url:'https://creativecommons.org/licenses/by/4.0/',evidenceUrl:fullText,notice:'© 2020 the authors; selected factual extraction with attribution. No endorsement.'},
 evidenceLimits:'Partial AI text review, not visual table verification, complete inventory or domain review. Current direct publisher retrieval returned 429; indexed primary passages rechecked. License evidence was observed in the earlier source review.',
 tweaks:[{kind:'Study comparison',text:'Keep PW/TW controls and chloride measurements; changing water or ash requires new measurements. Source strengths are not forecasts.',related:['seawater-pw','seawater-tw','seawater-sw']}]
}));
