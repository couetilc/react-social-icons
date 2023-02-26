class SocialIconPage {
  constructor(page) {
    this.page = page;
  }

  getComponent() {
    return this.page.getByRole("link");
  }

  getSvg() {
    return this.page.getByLabel("pinterest social icon");
  }

  getSvgIcon() {
    return this.page.locator(".social-svg-icon");
  }

  getSvgBackground() {
    return this.page.locator(".social-svg-background");
  }

  getSvgMask() {
    return this.page.locator(".social-svg-mask");
  }
}

export class RenderToStringPage extends SocialIconPage {
  async goto() {
    await this.page.goto("/render-to-string");
  }
}

export class RenderToPipeableStreamPage extends SocialIconPage {
  async goto() {
    await this.page.goto("/render-to-pipeable-stream");
  }
}
