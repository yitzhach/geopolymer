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
