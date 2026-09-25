const { chromium } = require(
  process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
    ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + "/playwright"
    : "playwright",
);
const assert = require("node:assert/strict");
require("node:fs").mkdirSync(".qa", { recursive: true });
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH }
      : {}),
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:4173");
  await page.screenshot({ path: ".qa/home-desktop.png", fullPage: true });
  const routes = [
    "/",
    "/artists",
    "/shop?audience=artists",
    "/shop/texture-study-kit",
    "/shop/color-study-kit",
    "/materials",
    "/materials/metakaolin",
    "/materials/silicate-activators",
    "/research",
    "/research/mk-testing-2019",
    "/formulations",
    "/formulations/metakaolin-comparison",
    "/shop",
    "/shop/starter-kit",
    "/shop/classroom-kit",
    "/shop/casting-kit",
    "/shop/mk-sample",
    "/learn/beginners",
    "/learn/educators",
    "/tools",
    "/search",
    "/evidence",
  ];
  for (const route of routes) {
    await page.goto("http://localhost:4173/#" + route);
    await page.locator("h1").waitFor();
    assert.ok(
      !(await page
        .locator("h1")
        .innerText()
        .then((t) => t.includes("not here"))),
      route,
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      route,
    );
  }
  await page.goto("http://localhost:4173/#/tools");
  await page.locator("#target").fill("2.5");
  await page.locator("button[type=submit]").click();
  await page.getByText("2,500", { exact: false }).first().waitFor();
  assert.equal(
    await page.locator("tbody tr").first().locator("td").last().innerText(),
    "1,500",
  );
  await page.locator("#target").fill("-1");
  assert.ok(
    (await page.locator("#scale-error").innerText()).includes(
      "greater than zero",
    ),
  );
  assert.equal(await page.locator("tbody").count(), 0);
  await page.locator("#target").fill("2500");
  await page.locator("#unit").selectOption("g");
  assert.equal(
    await page.locator("tbody tr").first().locator("td").last().innerText(),
    "1,500",
  );
  await page.screenshot({ path: ".qa/scaler-desktop.png", fullPage: true });
  await page.goto("http://localhost:4173/#/search");
  await page.locator("#query").fill("metakaolin");
  assert.ok((await page.locator(".result").count()) >= 4);
  await page.getByRole("button", { name: "Research", exact: true }).click();
  assert.equal(await page.locator(".result").count(), 1);
  await page.locator("#query").fill("<script>");
  assert.equal(await page.locator(".result").count(), 0);
  assert.ok((await page.locator(".empty").innerText()).includes("No matches"));
  await page.goto(
    "http://localhost:4173/#/search?q=%22%3E%3Cimg%20src=x%20onerror=alert(1)%3E",
  );
  assert.equal(
    await page.locator("#query").inputValue(),
    '\"><img src=x onerror=alert(1)>',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of routes) {
    await page.goto("http://localhost:4173/#" + route);
    await page.locator("h1").waitFor();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "mobile " + route,
    );
  }
  await page.goto("http://localhost:4173/#/");
  await page.screenshot({ path: ".qa/home-mobile.png", fullPage: true });
  await page.goto("http://localhost:4173/#/shop/classroom-kit");
  await page.screenshot({ path: ".qa/product-mobile.png", fullPage: true });
  await page.goto("http://localhost:4173/#/");
  await page.reload();
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    "Skip to content",
  );
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement.id), "main");
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 22 routes desktop/mobile, search/filter/escaping, scaler/invalid inputs, keyboard skip link; no JS errors.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
