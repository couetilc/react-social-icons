import { test as base, expect } from "@playwright/test";

class RenderToStringPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/render-to-string");
  }

  getComponent() {
    return this.page.getByRole("link");
  }
}

class RenderToPipeableStreamPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/render-to-pipeable-stream");
  }

  getComponent() {
    return this.page.getByRole("link");
  }
}

[
  {
    name: "render to string",
    test: base.extend({
      async page({ page: basePage }, use) {
        const page = new RenderToStringPage(basePage);
        await page.goto();
        await use(page);
      },
    }),
  },
  {
    name: "render to pipeable stream",
    test: base.extend({
      async page({ page: basePage }, use) {
        const page = new RenderToPipeableStreamPage(basePage);
        await page.goto();
        await use(page);
      },
    }),
  }
].forEach(({ test, name }) => {

  test.describe(name, () => {

    test("renders react-social-icon component", async ({ page }) => {
      await expect(await page.getComponent())
        .toHaveAttribute("aria-label", "pinterest");
      await expect(await page.getComponent())
        .toHaveCSS("width", "50px");
      await expect(await page.getComponent())
        .toHaveCSS("height", "50px");
    });

  });

});
