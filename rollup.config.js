/* eslint-env node */
import socialIcons from "./rollup-plugin-social-icons.js";
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";

export async function config() {

  const networks = (await fs.promises.readdir(new URL("db", import.meta.url)))
    .map(filename => filename.replace(".json", ""));

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

    plugins: [
      socialIcons(),
      resolve(),
      typescript(),
      babel({
        babelHelpers: "runtime",
        exclude: "**/node_modules/**",
      }),
    ],
    // "emitDeclarationOnly": true,
    // "declaration": true,
    // "outDir": "dist",

    external(id) {
      if (id === "react") return true;
      if (id === "react-dom") return true;
      if (id === "react/jsx-runtime") return true;
      if (/@babel\/runtime/u.test(id)) return true;
      return false;
    },

    output: [
      {
        format: "es",
        dir: "./dist",
        entryFileNames: "[name].js",
      },
    ],

  };

}

export default config();
