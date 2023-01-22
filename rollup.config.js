import { rollupPluginSocialIcons as socialIcons } from "./src/generate.js";
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';

export default (function config(){
  const plugins = [
    socialIcons(),
    resolve(),
    typescript(),
    babel({
      babelHelpers: 'runtime',
    }),
  ];

  const external = id => {
    if (id === "react") return true;
    if (id === "react-dom") return true;
    // if (/@babel\/runtime/.test(id)) return true;
    if (id === "../db") return true;
    return false;
  };

  const output = [
    {
      format: "es",
      preserveModules: true,
      dir: "./dist",
    },
  ];

  return [
    {
      input: "./src/react-social-icons.ts",
      plugins,
      external,
      output,
    },
    {
      input: "./src/component.tsx",
      plugins,
      external,
      output,
    },
  ];
}());
