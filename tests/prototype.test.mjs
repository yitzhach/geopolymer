import test from "node:test";
import assert from "node:assert/strict";
import { scaleBatch } from "../src/scaler.js";
import {
  materials,
  grades,
  papers,
  formulations,
  products,
  demoIngredients,
  search,
} from "../src/data.js";
test("scaling preserves proportions, converts kg and does not mutate reference data", () => {
  const before = JSON.stringify(demoIngredients);
  const result = scaleBatch(demoIngredients, 2.5, "kg");
  assert.equal(result.grams, 2500);
  assert.deepEqual(
    result.rows.map((x) => x.grams),
    [1500, 750, 250],
  );
  assert.equal(
    result.rows.reduce((n, x) => n + x.grams, 0),
    2500,
  );
  assert.equal(JSON.stringify(demoIngredients), before);
  assert.deepEqual(scaleBatch(demoIngredients, 2500, "g"), result);
  assert.equal(scaleBatch(demoIngredients, 0.001, "g").grams, 0.001);
});
test("invalid and extreme mass inputs cannot produce a batch", () => {
  for (const n of ["", " ", 0, -1, Infinity, NaN, "hello", 1e15, 1e-10])
    assert.throws(() => scaleBatch(demoIngredients, n));
  assert.throws(() => scaleBatch(demoIngredients, 1, "lb"));
  assert.throws(() => scaleBatch([], 1));
  assert.throws(() => scaleBatch([{ label: "bad", grams: 0 }], 1));
});
test("content relationships resolve and product concepts are not inventory", () => {
  const has = (items, id) => items.some((x) => x.id === id);
  for (const m of materials) {
    m.gradeIds.forEach((id) => assert.ok(has(grades, id)));
    m.paperIds.forEach((id) => assert.ok(has(papers, id)));
    m.productIds.forEach((id) => assert.ok(has(products, id)));
  }
  for (const f of formulations) {
    f.paperIds.forEach((id) => assert.ok(has(papers, id)));
    f.gradeIds.forEach((id) => assert.ok(has(grades, id)));
    f.productIds.forEach((id) => assert.ok(has(products, id)));
    assert.equal(f.masses, null);
  }
  for (const p of products) {
    assert.ok(has(materials, p.materialId));
    assert.ok(has(grades, p.gradeId));
    assert.equal(p.status, "concept");
  }
});
test("search spans entities, ignores case, handles empty and unmatched searches", () => {
  const results = search("METAKAOLIN");
  for (const type of ["Material", "Research", "Formulation", "Product concept"])
    assert.ok(results.some((x) => x.type === type));
  assert.equal(search("nonexistentzz").length, 0);
  assert.ok(search("").length > 10);
  assert.ok(
    search("classroom", "Product concept").every(
      (x) => x.type === "Product concept",
    ),
  );
  assert.ok(search("batch").some((x) => x.type === "Tool"));
});
