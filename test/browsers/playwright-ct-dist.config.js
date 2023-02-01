import { config as baseConfig } from "./playwright-ct-base.config.js";

async function config() {
  const base = await baseConfig();
  base.use.ctTemplateDir = "playwright-dist";
  return base;
}

export default config();
