// Original editorial notes; source papers remain with their publishers.
export const journalArticles = [
 {
  "id": "admixtures-and-precursors-need-controls",
  "date": "2026-10-10",
  "category": "Research briefing",
  "topic": "Mix design & chemistry",
  "title": "Before calling an addition an improvement, keep the control",
  "summary": "Two new studies illustrate why workability and precursor treatment belong beside strength in a formulation record.",
  "sources": [
    "research-silane-ternary",
    "research-treated-incinerator-bottom-ash"
  ],
  "paragraphs": [
    "Liu and colleagues report that KH-560 improved flow-related behavior in their ternary binder while reducing hardened performance. Easier placement alone therefore did not identify the better material in that study.",
    "Ahmad and colleagues compare untreated and water-treated incinerator bottom ash. Their findings make preparation history an essential part of the material description, rather than treating every ash with the same name as interchangeable.",
    "For our future formulation advisor, the editorial lesson is to retain a control, specify the desired property, and record precursor treatment and additive dose. Neither paper independently validates a user's recipe. This briefing supplies no strength timeline, flexural estimate or shear prediction."
  ]
},
 {
 id:'strength-is-not-one-number',date:'2026-10-10',category:'Research briefing',topic:'AI & modeling',title:'A virtual test needs more than one strength number',
 summary:'New modeling papers show why compressive strength, flexure and stiffness need separate evidence.',
 sources:['research-nano-models','research-hsom-strength','research-fem-review'],
 paragraphs:[
 'A useful formulation assistant should begin by asking what needs to be measured. Compression, flexure, shear, bond and deformation describe different behavior. A value for one property cannot silently stand in for another.',
 'Abdel Aziz and El-Sayed examine correlations in nanomaterial-modified composites and find important limits to estimates based on compressive strength alone. Teo and colleagues explore a hierarchical mapping model using measurements from 18 distinct mixtures. These are useful research directions, with boundaries set by their datasets.',
 'A separate finite-element review by Singh and colleagues highlights the need to calibrate structural models to experiments. Our editorial takeaway: record material chemistry, curing, age, specimen and method before presenting a prediction. Count independent mixtures separately from repeat tests.',
 'The recipe planner on this site currently finds matching literature measurements. It does not run an AI strength simulation. Future predictions should show model scope, uncertainty and missing inputs alongside a proposed physical test.'
 ]
 },
 {
 id:'one-part-binders-new-directions',date:'2026-10-10',category:'Research briefing',topic:'One-part binders',title:'One-part binders: three questions behind the dry blend',
 summary:'Recent papers explore waste-derived activators, calcium additions and ambient-cured phosphate chemistry.',
 sources:['research-ceramic-activator','research-cao-onepart','research-mgo-phosphate'],
 paragraphs:[
 'A dry blend can simplify the point of mixing, but the preparation of that blend still matters. Tayyab and colleagues investigate converting fired ceramic residue into a solid activator. Their work directs attention to activator chemistry and processing conditions, rather than treating waste powder as interchangeable filler.',
 'The metakaolin calcium-oxide study reports a non-monotonic strength response to increasing additions. That makes a useful database lesson: record the tested dose and its control mixture, instead of tagging an ingredient simply as a strength enhancer.',
 'Lin and colleagues investigate a different route involving metakaolin, magnesium oxide and phosphate at ambient temperature. It belongs in the research library, but should not be calculated as though it were a conventional alkaline system.',
 'For an experimental record, keep the activator production history, storage, water addition, working time and curing conditions together. “One-part” describes how components are supplied; it does not by itself establish handling requirements, durability or a carbon advantage.'
 ]
 },
 {
 id:'fibers-loading-and-curing',date:'2026-10-10',category:'Research briefing',topic:'Fibers & mechanics',title:'Fibers, curing and the question a test actually answers',
 summary:'Recent composite studies span impact resistance, tensile deformation and specialized carbon-fiber laminates.',
 sources:['research-pp-impact','research-tensile-curing','research-nickel-carbon'],
 paragraphs:[
 'Fiber studies can look similar in a search result while addressing very different applications. Cui and colleagues test rapid compression in polypropylene-reinforced slag mortar. Their impact results concern a different loading regime from a routine static compression test.',
 'Wang and colleagues examine tensile deformation in engineered fly ash composites. Their curing comparison highlights that a gain in strength need not mean a parallel gain in strain capacity.',
 'Jasiczek and colleagues investigate continuous nickel-coated carbon fibers in processed laminates. Fiber architecture and manufacturing are central to that system, so its findings should not become a drop-in mortar admixture recommendation.',
 'When planning a comparison, name the desired response first: crack control, tensile deformation, impact energy or residual strength. Then record fiber material, geometry, amount, dispersion, cure and the actual loading method. This is an editorial guide to reading the linked studies, not a qualified mixture design.'
 ]
 },
 {
 id:'inside-the-material-lab-reading-notes',date:'2026-10-10',category:'Podcast reading notes',topic:'Art, casting & fabrication',title:'Inside the material lab: from waste to a useful surface',
 summary:'A source-linked reading guide for a future conversation about volcanic ash, light-emitting coatings and particle size.',
 sources:['research-volcanic-graphene','research-brick-sand','research-mineralogy-wastes'],
 paragraphs:[
 'Reading notes for a future episode; no recording or guest interview has been published.',
 'Madeo and colleagues explore a volcanic-ash matrix, graphene additions and a separate photoluminescent coating. For artists, this suggests a useful distinction between the structural material and the layer that provides the visible effect.',
 'The recycled-brick study by Dieuhou and colleagues varies silica sand size. Its results challenge the assumption that ever-finer powder always improves a mixture. A mineralogy-focused review provides another reason to describe raw materials beyond a single oxide total.',
 'Questions for a future guest: Which properties come from the binder and which from the finish? What changes when a waste source or particle-size distribution changes? What evidence would be needed before moving a sample from a studio shelf to an outdoor installation?',
 'Readers can use the experiment notebook to keep substrate, thickness, finish and observations together. These reading notes report research topics and questions; they do not claim that the featured systems are commercially available or validated for a particular use.'
 ]
 }
];
export function filterJournal(query='',category='all'){
 const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 return journalArticles.filter(p=>(category==='all'||p.category===category)&&words.every(w=>`${p.title} ${p.summary} ${p.topic} ${p.paragraphs.join(' ')}`.toLowerCase().includes(w))).sort((a,b)=>b.date.localeCompare(a.date));
}
