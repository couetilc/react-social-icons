import { rollupPluginSocialIcons as socialIcons } from "./src/generate";
// import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

export default (function config(){
  const plugins = [
    socialIcons(),
    resolve(),
    // babel({
    //   babelHelpers: 'runtime',
    // }),
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
      input: "./src/react-social-icons.js",
      plugins,
      external,
      output,
    },
    {
      input: "./src/component.jsx",
      plugins,
      external,
      output,
    },
    {
      input: "./src/db.js",
      plugins,
      external,
      output,
    },
  ];
}());
