import { test as base, expect } from "@playwright/test";
import { readIcon } from "../utils.js";
import hexRgb from "hex-rgb";
import { RenderToStringPage, RenderToPipeableStreamPage } from "./pages.js";

const pinterest = readIcon("pinterest");

const toRgb = hex => {
  const rgb = hexRgb(hex);
  return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
};

const extendTest = PageClass => base.extend({
  async page({ page: basePage }, use) {
    const page = new PageClass(basePage);
    await page.goto();
    await use(page);
  }
});

const testPages = [
  {
    name: "render to string",
    test: extendTest(RenderToStringPage),
  },
  {
    name: "render to pipeable stream",
    test: extendTest(RenderToPipeableStreamPage),
  }
];

testPages.forEach(({ test, name }) => {
  test.describe(name, () => {

    test("renders react-social-icon component", async ({ page }) => {
      await expect(await page.getComponent())
        .toHaveAttribute("aria-label", "pinterest");
      await expect(await page.getComponent())
        .toHaveCSS("width", "50px");
      await expect(await page.getComponent())
        .toHaveCSS("height", "50px");
      await expect(await page.getSvg())
        .toHaveAttribute("viewBox", "0 0 64 64");
      await expect(await page.getSvgMask())
        .toHaveCSS("fill", toRgb(pinterest.color));
    });

  });
});
