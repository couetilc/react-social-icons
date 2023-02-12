/* eslint-env node */
import socialIcons from "./rollup-plugin-social-icons.js";
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import fs from "fs";
import copy from "rollup-plugin-copy";

export async function config() {

  const networks = (await fs.promises.readdir(new URL("db", import.meta.url)))
    .map(filename => filename.replace(".json", ""));

  return {

    input: {
      "react-social-icons": "src/react-social-icons.js",
      component: "src/component.jsx",
      "icons/index": "social-icons",
      ...networks.reduce((inputMap, network) => {
        inputMap[`icons/${network}`] = `social-icons:${network}`;
        return inputMap;
      }, {}),
    },

    plugins: [
      socialIcons(),
      resolve(),
      babel({
        babelHelpers: "runtime",
        exclude: "**/node_modules/**",
      }),
      copy({
        targets: [{
          src: "src/react-social-icons.d.ts",
          dest: "dist/"
        }]
      }),
    ],

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
