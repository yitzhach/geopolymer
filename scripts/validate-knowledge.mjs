import {pilot} from '../src/knowledge-pilot.js';
import {library} from '../src/research-library.js';
import {validateKnowledge,publicKnowledge} from '../src/knowledge-core.js';
const errors=validateKnowledge(pilot,library);if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(JSON.stringify({publications:library.length,studies:pilot.studies.length,mixes:pilot.mixes.length,observations:pilot.observations.length,censored:pilot.observations.filter(o=>o.value===null).length,publicObservations:publicKnowledge(pilot,library).observations.length},null,2));
