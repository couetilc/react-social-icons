import type { PlaywrightTestConfig } from "@playwright/experimental-ct-react";
import { config as baseConfig } from "./playwright-ct-base.config.ts";

async function config(): Promise<PlaywrightTestConfig> {
  const base = await baseConfig();
  base.use.ctTemplateDir = "playwright-dist";
  return base;
}

export default config();
