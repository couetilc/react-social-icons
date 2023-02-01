import { config as baseConfig } from "./playwright-ct-base.config.js";

async function config() {
  const base = await baseConfig();
  base.use.ctTemplateDir = "playwright-src";
  return base;
}

export default config();
