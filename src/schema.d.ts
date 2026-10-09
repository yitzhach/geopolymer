export type Evidence =
  | "literature-reported"
  | "internally-reproduced"
  | "independently-tested"
  | "illustrative";
export interface Material {
  id: string;
  title: string;
  category: string;
  role: string;
  summary: string;
  gradeIds: string[];
  paperIds: string[];
  productIds: string[];
}
export interface Grade {
  id: string;
  materialId: string;
  title: string;
  status: string;
  supplier: string | null;
  lotId: string | null;
  sourceId: string | null;
}
export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  doi: string;
  url: string;
  access: string;
  publication: string;
  summary: string;
  limitation: string;
  reviewedAt: string;
}
export interface Formulation {
  id: string;
  title: string;
  version: string;
  evidence: Evidence;
  paperIds: string[];
  gradeIds: string[];
  productIds: string[];
  summary: string;
  masses: null | { label: string; grams: number }[];
}
export interface Product {
  audience?: "artists";
  id: string;
  title: string;
  category: string;
  materialId: string;
  gradeId: string;
  targetPrice: number | null;
  status: "concept";
  pack: string;
  summary: string;
  included: string[];
  required: string[];
}
export interface Test {
  id: string;
  formulationId: string;
  evidence: Evidence;
  scope: string;
  date: string;
  method: string;
  result: number | null;
  unit: string | null;
}

// Browser-local notebook v1. Calculator snapshots retain the calculator v1 payload.
// IDs connect trials; sourceType is not a review/validation badge.
export interface NotebookSpecimen { id: string; label: string; geometry: string; }
export interface NotebookCuring {
  id: string; startHours: number | null; durationHours: number | null;
  temperatureC: number | null; humidityPct: number | null; condition: string;
}
export interface NotebookObservation {
  id: string; date: string; ageHours: number | null; specimenId: string;
  category: string; text: string; imageUrl: string; caption: string;
}
export interface NotebookResult {
  id: string; property: string; value: number; unit: string; ageHours: number | null;
  specimenId: string; method: string; sourceType: 'own' | 'literature';
  source: string; notes: string;
}
export interface NotebookExperiment {
  id: string; title: string; question: string; createdAt: string;
}
export interface NotebookTrial {
  id: string; experimentId: string; parentId: string | null; title: string;
  variable: string; createdAt: string;
  snapshot: { version: 1; recipe: unknown; baseline: unknown; targets: unknown; study: unknown };
  actualMasses: (number | null)[];
  preparation: { castAt: string; mixing: string; deviations: string };
  specimens: NotebookSpecimen[]; curing: NotebookCuring[];
  observations: NotebookObservation[]; results: NotebookResult[];
}
export interface ExperimentNotebook {
  format: 'geopolymer-notebook-v1'; experiments: NotebookExperiment[]; trials: NotebookTrial[];
}
