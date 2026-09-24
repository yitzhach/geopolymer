export function scaleBatch(ingredients, target, unit = "g") {
  if (!["g", "kg"].includes(unit))
    throw new Error("Choose grams or kilograms.");
  const mass =
    typeof target === "number"
      ? target
      : String(target).trim()
        ? Number(target)
        : NaN;
  if (!Number.isFinite(mass) || mass <= 0)
    throw new Error("Enter a finite batch mass greater than zero.");
  const grams = mass * (unit === "kg" ? 1000 : 1);
  if (grams < 0.001 || grams > 1e9)
    throw new Error("Choose a batch from 0.001 g to 1,000,000 kg.");
  if (
    !ingredients.length ||
    ingredients.some((x) => !Number.isFinite(x.grams) || x.grams <= 0)
  )
    throw new Error("Every component needs a positive reference mass.");
  const base = ingredients.reduce((sum, x) => sum + x.grams, 0);
  if (!Number.isFinite(base)) throw new Error("Reference mass is too large.");
  return {
    grams,
    factor: grams / base,
    rows: ingredients.map((x) => ({
      label: x.label,
      grams: (x.grams / base) * grams,
      percent: (x.grams / base) * 100,
    })),
  };
}
