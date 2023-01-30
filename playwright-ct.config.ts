/* eslint-env node */
import type { PlaywrightTestConfig } from "@playwright/experimental-ct-react";
import { devices } from "@playwright/experimental-ct-react";
import { config as rollupConfig } from "./rollup.config.js";

async function config(): Promise<PlaywrightTestConfig> {
  return {
    // // useful test settings
    // headless: false,
    // workers: 1,

    testDir: ".",
    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    snapshotDir: "__snapshots__",
    /* Maximum time one test can run for. */
    timeout: 10_000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: Boolean(process.env.CI),
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: "on-first-retry",

      /* Port to use for Playwright component endpoint. */
      ctPort: 3100,

      /* vite config additions */
      ctViteConfig: await rollupConfig(),
    },

    /* Configure projects for major browsers */
    projects: [
      {
        name: "chromium",
        use: {
          ...devices["Desktop Chrome"],
        },
      },
      {
        name: "firefox",
        use: {
          ...devices["Desktop Firefox"],
        },
      },
      {
        name: "webkit",
        use: {
          ...devices["Desktop Safari"],
        },
      },
    ],
  };
}

export default config();
