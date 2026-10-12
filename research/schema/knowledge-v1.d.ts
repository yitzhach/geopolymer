/** Runtime validator: src/knowledge-core.js. Version 1 keeps original evidence immutable. */
export type Decision = 'allowed'|'denied'|'unknown';
export type Review = 'unchecked'|'automated'|'source-checked-ai'|'human-source-checked'|'domain-reviewed';
export interface Provenance { assetId:string; locator:string; basis:string; checkedBy:string; checkedAt:string }
export interface Operation { decision:Decision; reason:string }
export interface Asset {
 id:string; publicationId:string; version:string; url:string; sha256:string;
 rightsHolder:string|null; license:string|null; licenseUrl:string|null;
 rightsEvidenceUrl:string; checked:string; policyVersion:string; attribution:string;
 operations:Record<'access'|'download'|'processing'|'rawRetention'|'aiTransmission'|'embedding'|'publicDisplay'|'export',Operation>;
}
export interface Quantity { material:string; originalText:string; value:number; unit:string; basis:string }
export interface Mix {
 id:string; publicationId:string; originalId:string; datasetFamilyId:string;
 binder:string; activation:'sodium'|'potassium'|'mixed-na-k'|'phosphate'|'unknown';
 slagPercent:number|null; slagBasis:string|null; quantities:Quantity[]; materialIds:string[];
 provenance:Provenance; calculatorEligible:boolean; calculatorBlocker:string;
 derivation?:{expression:string;inputs:number[];version:string;assumptions:string};
}
export interface Observation {
 id:string; publicationId:string; mixId:string; testId:string; property:string;
 originalText:string; value:number|null; unit:string; ageDays:number|null;
 ageOrigin:string; exposureDays:number|null; missingReason:string|null;
 qualifier:'reported'|'below-detection'|'estimated'|'less-than'|'greater-than';
 uncertainty:number|null; uncertaintyReason:string; verification:Review; provenance:Provenance;
}
export interface InventoryItem {
 locator:string;kind:'table'|'figure'|'method'|'supplements';
 state:'not-applicable'|'not-reported'|'not-yet-extracted'|'ambiguous'|'extracted'|'verified';note:string;
}
// Sources remain separate from store SKUs, personal notebook trials and predictions.
// This pilot has no predictions, commercial offerings, fuzzy auto-merge or external model context.
