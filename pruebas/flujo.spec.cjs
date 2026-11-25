const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const url = pathToFileURL(path.resolve(__dirname, "../index.html")).href;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("estado inicial: el comprobante está oculto", async ({ page }) => {
  await expect(page.getByTestId("ver-comprobante")).toBeVisible();
  await expect(page.getByTestId("ver-comprobante")).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByTestId("comprobante")).toBeHidden();
  await expect(page.getByTestId("referencia")).toBeHidden();
  await expect(page.getByTestId("importe")).toBeHidden();
});

test("al abrir: muestra la referencia y el importe", async ({ page }) => {
  await page.getByTestId("ver-comprobante").click();

  await expect(page.getByTestId("comprobante")).toBeVisible();
  await expect(page.getByTestId("referencia")).toHaveText("REF-2026-000036");
  await expect(page.getByTestId("importe")).toHaveText("$ 125.000,00");
});
