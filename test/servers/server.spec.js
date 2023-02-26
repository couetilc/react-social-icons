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

const test = base.extend({
  async pageRTS({ page: basePage }, use) {
    const page = new RenderToStringPage(basePage);
    await page.goto();
    await use(page);
  },
  async pageRTPS({ page: basePage }, use) {
    const page = new RenderToPipeableStreamPage(basePage);
    await page.goto();
    await use(page);
  },
});

test(
  "RTS renders react-social-icon component",
  async ({ pageRTS: page }) => {
    await page.goto();
    await expect(await page.getComponent())
      .toHaveAttribute("aria-label", "pinterest");
    await expect(await page.getComponent())
      .toHaveCSS("width", "50px");
    await expect(await page.getComponent())
      .toHaveCSS("height", "50px");
  }
);

test(
  "RTPS renders react-social-icon component",
  async ({ pageRTPS: page }) => {
    await page.goto();
    await expect(await page.getComponent())
      .toHaveAttribute("aria-label", "pinterest");
    await expect(await page.getComponent())
      .toHaveCSS("width", "50px");
    await expect(await page.getComponent())
      .toHaveCSS("height", "50px");
  }
);
