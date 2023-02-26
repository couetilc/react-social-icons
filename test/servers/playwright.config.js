/* eslint-env node */
import { devices } from "@playwright/test";
import getPort from "get-port";

const config = async () => {

  const port = await getPort();

  return {
    testDir: ".",
    timeout: 2_000,
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),

    webServer: {
      command: `node ./test_server.js ${port}`,
      timeout: 2_000,
      port,
      reuseExistingServer: !process.env.CI,
    },

    projects: [
      {
        use: devices["Desktop Chrome"],
      },
      {
        use: devices["Desktop Firefox"],
      },
      {
        use: devices["Desktop Safari"],
      },
    ],
  };
};

export default config();
