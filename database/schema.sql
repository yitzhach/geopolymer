-- Geopolymer knowledge database, schema v1.
-- Generated into data/geopolymer.sqlite by scripts/build-database.mjs from the
-- validated JavaScript sources. Those sources remain canonical; this file is derived.
--
-- Plain SQLite DDL with no vendor extensions, so it can also be applied to D1.
-- Original cell strings and source locators are kept unchanged. Structured provenance
-- is stored as JSON so nothing is lost when a field is not a typed column.
--
-- Not applied here: rights gating, correction holds and public allowlists. Use the
-- publicKnowledge() boundary in src/knowledge-core.js before serving data publicly.

CREATE TABLE schema_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE publications (
  id TEXT PRIMARY KEY,
  doi TEXT UNIQUE,
  year INTEGER,
  title TEXT NOT NULL,
  journal TEXT,
  type TEXT,
  topic TEXT,
  url TEXT,
  checked TEXT,
  access TEXT,
  extraction TEXT,
  verification TEXT,
  editorial TEXT,
  library_json TEXT NOT NULL,
  reference_json TEXT
);

CREATE TABLE assets (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL REFERENCES publications(id),
  version TEXT,
  url TEXT,
  sha256 TEXT,
  rights_holder TEXT,
  license TEXT,
  license_url TEXT,
  rights_evidence_url TEXT,
  checked TEXT,
  policy_version TEXT,
  attribution TEXT,
  export_decision TEXT CHECK (export_decision IN ('allowed', 'denied', 'unknown')),
  operations_json TEXT NOT NULL
);

CREATE TABLE studies (
  publication_id TEXT PRIMARY KEY REFERENCES publications(id),
  asset_id TEXT REFERENCES assets(id),
  dataset_family_id TEXT,
  access TEXT,
  extraction TEXT,
  verification TEXT,
  editorial TEXT,
  coverage_note TEXT,
  source_hash TEXT,
  methods_json TEXT,
  method_provenance_json TEXT,
  limitations_json TEXT,
  inventory_json TEXT,
  tables_json TEXT
);

CREATE TABLE materials (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL REFERENCES publications(id),
  family TEXT,
  source TEXT,
  grade TEXT,
  lot TEXT,
  lot_missing_reason TEXT,
  record_type TEXT,
  supplier_offering_id TEXT,
  store_sku TEXT,
  qualification_json TEXT,
  provenance_json TEXT NOT NULL
);

CREATE TABLE mixes (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL REFERENCES publications(id),
  original_id TEXT,
  dataset_family_id TEXT,
  binder TEXT,
  activation TEXT CHECK (activation IN ('sodium', 'potassium', 'mixed-na-k', 'phosphate', 'unknown')),
  slag_percent REAL,
  slag_basis TEXT,
  calculator_eligible INTEGER NOT NULL CHECK (calculator_eligible IN (0, 1)),
  calculator_blocker TEXT,
  provenance_json TEXT NOT NULL,
  derivation_json TEXT
);

CREATE TABLE mix_quantities (
  mix_id TEXT NOT NULL REFERENCES mixes(id),
  seq INTEGER NOT NULL,
  material TEXT NOT NULL,
  original_text TEXT,
  value REAL,
  unit TEXT,
  basis TEXT,
  PRIMARY KEY (mix_id, seq)
);

CREATE TABLE mix_materials (
  mix_id TEXT NOT NULL REFERENCES mixes(id),
  material_id TEXT NOT NULL REFERENCES materials(id),
  PRIMARY KEY (mix_id, material_id)
);

CREATE TABLE tests (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL REFERENCES publications(id),
  property TEXT,
  geometry TEXT,
  method TEXT,
  cure TEXT,
  n,
  direction TEXT,
  substrate TEXT,
  provenance_json TEXT NOT NULL
);

CREATE TABLE observations (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL REFERENCES publications(id),
  mix_id TEXT NOT NULL REFERENCES mixes(id),
  test_id TEXT NOT NULL REFERENCES tests(id),
  property TEXT NOT NULL,
  original_text TEXT,
  value REAL,
  unit TEXT,
  age_days REAL,
  age_origin TEXT,
  exposure_days REAL,
  missing_reason TEXT,
  qualifier TEXT NOT NULL CHECK (qualifier IN ('reported', 'below-detection', 'estimated', 'less-than', 'greater-than')),
  uncertainty REAL,
  uncertainty_reason TEXT,
  verification TEXT,
  specimen_id TEXT,
  -- 1 for graph-digitized estimates (digitization present or qualifier 'estimated').
  is_estimate INTEGER NOT NULL CHECK (is_estimate IN (0, 1)),
  digitization_json TEXT,
  provenance_json TEXT NOT NULL
);

CREATE INDEX observations_by_mix ON observations (mix_id);
CREATE INDEX observations_by_publication ON observations (publication_id);
CREATE INDEX observations_by_property_age ON observations (property, age_days);

CREATE TABLE findings (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL REFERENCES publications(id),
  direction TEXT,
  text TEXT NOT NULL,
  claim_type TEXT,
  verification TEXT,
  provenance_json TEXT NOT NULL
);

CREATE TABLE finding_mixes (
  finding_id TEXT NOT NULL REFERENCES findings(id),
  mix_id TEXT NOT NULL REFERENCES mixes(id),
  PRIMARY KEY (finding_id, mix_id)
);

CREATE TABLE relationships (
  id TEXT PRIMARY KEY,
  publication_id TEXT NOT NULL REFERENCES publications(id),
  type TEXT,
  related_publication_id TEXT REFERENCES publications(id),
  evidence_ids_json TEXT,
  scope TEXT,
  verification TEXT
);

-- Exact numeric search rule: a reported, non-censored value that is not a graph estimate.
-- This view does not apply rights or correction holds.
CREATE VIEW exact_numeric_observations AS
SELECT * FROM observations
WHERE value IS NOT NULL AND qualifier = 'reported' AND is_estimate = 0;
