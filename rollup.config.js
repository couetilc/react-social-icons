/* eslint-env node */
import { rollupPluginSocialIcons as socialIcons } from "./src/generate.js";
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "fs/promises";

export async function config() {

  const networks = (await fs.readdir(new URL("db", import.meta.url)))
    .map(filename => filename.replace(".json", ""));

  const plugins = [
    socialIcons(),
    resolve(),
    typescript(),
    babel({
      babelHelpers: "runtime",
      exclude: "**/node_modules/**",
    }),
  ];

  const external = id => {
    if (id === "react") return true;
    if (id === "react-dom") return true;
    if (id === "react/jsx-runtime") return true;
    if (/@babel\/runtime/u.test(id)) return true;
    return false;
  };

  const output = [
    {
      format: "es",
      dir: "./dist",
      entryFileNames: "[name].js",
    },
  ];

  return {
    input: {
      "react-social-icons": "src/react-social-icons.ts",
      component: "src/component.tsx",
      "icons/index": "social-icons",
      ...networks.reduce((inputMap, network) => {
        // eslint-disable-next-line no-param-reassign
        inputMap[`icons/${network}`] = `social-icons:${network}`;
        return inputMap;
      }, {}),
    },
    plugins,
    external,
    output,
  };

}

export default config();
