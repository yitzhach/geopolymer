// Fly ash / ladle-furnace slag geopolymer foam — Table 2 (mixes are columns) and unheated values in §3.1.
import {source,table,tableQuote,expect,sheetHeader,save} from './_common.mjs';
const G='pas-prefoam-volume-thermal',src=await source(G),t=table(src,2);
const row=label=>{const i=t.rows.findIndex(r=>r[0]===label);if(i<0)throw new Error(`Table 2 row "${label}" missing`);return i;};
const ab=row('Abbreviation');expect(t.rows[ab].slice(1),['G-0','G-1','G-2'],'Table 2 abbreviations');
const q=(label,col)=>tableQuote(t,[ab,row(label)],{cols:[0,col]});
const cell=(label,col)=>t.rows[row(label)][col];
expect([cell('Fly ash:Slag Ratio',1),cell('Sodium Hydroxide Concentration (M)',1),cell('Sodium Silicate:Sodium Hydroxide Ratio',1),cell('PAS Foam:Paste Ratio',1),cell('PAS Foam:Paste Ratio',2),cell('PAS Foam:Paste Ratio',3)],['80:20','8','1.5:1','0:0','1:1','2:1'],'Table 2 cells');
const mixes=[1,2,3].map(c=>{const id=t.rows[ab][c],foam=Number(cell('PAS Foam:Paste Ratio',c).split(':')[0]);
 return {id,control:c===1,form:c===1?'paste':'foam',cure:'c1',
  quantities:[{material:'fa',value:80,unit:'part',basis:'mass-parts',text:q('Fly ash:Slag Ratio',c)},{material:'lfs',value:20,unit:'part',basis:'mass-parts',text:q('Fly ash:Slag Ratio',c)},
   {material:'naoh',value:null,missing:'activator mass not given; only 8 M, solid:liquid 3:1 and silicate:hydroxide 1.5:1 are stated',text:q('Sodium Hydroxide Concentration (M)',c)},
   {material:'ss',value:null,missing:'activator mass not given; only solid:liquid 3:1 and silicate:hydroxide 1.5:1 are stated',text:q('Sodium Silicate:Sodium Hydroxide Ratio',c)},
   {material:'pas',value:foam,unit:'ratio',basis:'other',basisNote:"PAS foam-to-paste ratio by volume ('The foam, PAS and water were measured in volume (ml).'); PAS:water 1:10 by volume",text:q('PAS Foam:Paste Ratio',c)}],
  parameters:[{key:'hydroxide-molarity',value:8,text:q('Sodium Hydroxide Concentration (M)',c)},{key:'silicate/hydroxide',value:1.5,basisNote:'basis not stated',text:q('Sodium Silicate:Sodium Hydroxide Ratio',c)}],
  missing:['solid:liquid 3:1 (Table 2) is stated as solid:liquid, so no liquid/solid value is entered']};});
const an="unheated reference: tested after 1 d room + 1 d 60 °C cure and room storage before the heating programme ('After 28 ambient-curing days'); total age not stated";
const s1='G-0 had a bulk density of 2.09 g/cm3, water absorption of 7.4% and apparent porosity of 17.3%.';
const s2='foamed geopolymer (14.81% for G-1 and 15.94% for G-2) exhibited a greater total porosity than G-0 (10.45%)';
const s3='The addition of PAS foam decreased the thermal conductivity of G-0 from 1.05 W/(m∙K) to 0.70–0.81 W/(m∙K)';
const s4='The addition of PAS foam decreased the compressive strength of G-0 from 40.5 MPa to 26.3 MPa (G-1) and 21.5 MPa (G-2)';
const s5='only G-2 (compressive strength of 21.5 MPa, density of 1.69 g/cm3 and thermal conductivity of 0.7 W/(m∙K)) met the RILEM requirements for the application.';
const R=(mix,test,value,text,locator)=>({mix,test,ageDays:null,ageNote:an,value,text,locator});
await save({...sheetHeader(G,'10.3390/ma15124085',src,'The three Table 2 samples G-0 (unfoamed), G-1 and G-2 (PAS foam:paste 1:1 and 2:1 by volume) with the shared design ratios, and the unheated-state values stated in the text. Values after 200–1000 °C exposure are given only as ranges or in figures and are not transcribed.'),
 materials:[{id:'fa',family:'fly-ash',role:'precursor',name:'Fly ash',detail:'The low CaO content demonstrated that the fly ash was Class F fly ash based on ASTM C618.'},
  {id:'lfs',family:'steel-slag',role:'precursor',name:'ladle furnace slag',aliases:['Slag']},
  {id:'naoh',family:'sodium-hydroxide',role:'activator',name:'Sodium Hydroxide',detail:'Sodium hydroxide pellets (HmbG®, Sigma-Aldrich, Taufkirchen, Germany) and distilled water were mixed together to prepare a sodium hydroxide solution.'},
  {id:'ss',family:'sodium-silicate-solution',role:'activator',name:'Sodium Silicate',detail:'The main constituents of the sodium silicate solution (South Pacific Chemicals Industries Sdn. Bhd., Selangor, Malaysia) were 30.1% SiO2, 9.4% Na2O, and 60.5% H2O.'},
  {id:'pas',family:'foaming-agent',role:'additive',name:'PAS Foam',aliases:['PAS'],detail:'Polyoxyethylene alkyether sulphate (PAS) was utilised as a foaming agent to prepare geopolymer foam.'}],
 mixes,
 cures:[{id:'c1',category:'heat',temperatureC:60,duration:1,durationUnit:'d',sealed:null,humidityPercent:null,text:'The moulded mixture was placed at room temperature for 1 day, and it was further placed in an oven (60 °C) for another 1 day.'}],
 tests:[{id:'fc',property:'compressive-strength',unit:'MPa',specimen:'5 × 5 × 5 cm cubes, three per temperature',method:'Instron 5569'},
  {id:'rho',property:'density',unit:'g/cm3',specimen:'5 cm cubes',method:'bulk density, BS EN 12390-7'},
  {id:'wa',property:'water-absorption',unit:'%',specimen:'5 cm cubes',method:'ASTM C642'},
  {id:'por',property:'porosity',unit:'%',specimen:'5 cm cubes',method:'apparent porosity, ASTM C642'},
  {id:'xct',property:'porosity',unit:'%',specimen:'0.2 × 0.2 × 0.5 cm piece',method:'total porosity by synchrotron X-ray tomographic microscopy'},
  {id:'k',property:'thermal-conductivity',unit:'W/(m·K)',specimen:'5 cm cubes',method:'KD2 Pro transient line source (ASTM D5334)'}],
 results:[R('G-0','rho',2.09,s1,'§3.1 / Figure 3'),R('G-0','wa',7.4,s1,'§3.1 / Figure 3'),R('G-0','por',17.3,s1,'§3.1 / Figure 3'),
  R('G-1','xct',14.81,s2,'§3.1 / Figure 4'),R('G-2','xct',15.94,s2,'§3.1 / Figure 4'),R('G-0','xct',10.45,s2,'§3.1 / Figure 4'),
  R('G-0','k',1.05,s3,'§3.1 / Figure 5'),
  R('G-0','fc',40.5,s4,'§3.1 / Figure 6a'),R('G-1','fc',26.3,s4,'§3.1 / Figure 6a'),R('G-2','fc',21.5,s4,'§3.1 / Figure 6a'),
  R('G-2','rho',1.69,s5,'§3.1'),R('G-2','k',0.7,s5,'§3.1')],
 findings:[{goal:'Meets RILEM structural lightweight criteria (density, strength, conductivity)',mix:'G-2',text:s5}],
 notes:[{mix:'G-0',kind:'tradeoff',text:'G-0 lost compressive strength (2.2–8.7%) between 400 °C and 1000 °C, while foamed geopolymer gained compressive strength (4.2–68.6%) at the same temperature exposure.'},
  {mix:'G-1',kind:'observation',text:'An exception occurred in G-1 at 800 °C due to strength loss (4.6%).'}],
 gaps:['Mixes are columns in Table 2, so each table quote joins the Abbreviation row with the design row; shared values are single cells spanning G-0, G-1 and G-2 in the source.',
  'No absolute masses: fly ash:slag 80:20, 8 M NaOH, solid:liquid 3:1 and silicate:hydroxide 1.5:1 are ratios with unstated bases; activator mass, water and foam volume per batch are not given.',
  'G-1 water absorption, apparent porosity, density and thermal conductivity, and all heated-state values, appear only as ranges or in Figures 3–9.',
  'Cure recorded as heat (60 °C oven day); the first day was at room temperature and samples were stored 28 days at room temperature before heating, so test age is left null.',
  'Second review (26 Oct 2026): 0 value errors; see the batch audit.']});
