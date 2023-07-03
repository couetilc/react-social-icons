import { defineConfig } from 'vite'
// import react from "@vitejs/plugin-react";
// import { resolve } from "path";
// import socialIcons from "./rollup-plugin-social-icons.js";
// import dts from "vite-plugin-dts";
import { config as rollupConfig } from './rollup.config.js'

export default defineConfig(async () => {

  // I think I can just used this, the build options is specific in the config
  // already, so should be treated separate, need to test out.
  // if (command === 'build') {
  // return {
  //   root: '.',
  //   plugins: [
  //     socialIcons(),
  //     react(),
  //     // dts({
  //     //   entryRoot: './src/',
  //     //   outputDir: './dist/',
  //     //   include: ['./src/react-social-icons.ts', './src/component.ts'],
  //     //   // rollupTypes: true,
  //     // }),
  //   ],
  //   build: {
  //     manifest: true,
  //     rollupOptions:
  //       // [
  //       {
  //         external: {
  //           'react': 'React',
  //           'react-dom': 'ReactDOM'
  //         },
  //         input: './src/react-social-icons.ts',
  //         preserveModules: true,
  //         exclude: [/node_modules/],
  //         include: ['./src/react-social-icons.ts'],
  //       },
  //       // {
  //       //   external: {
  //       //     'react': 'React',
  //       //     'react-dom': 'ReactDOM'
  //       //   },
  //       //   input: './src/component.tsx',
  //       // },
  //     // ],
  //     lib: {
  //       name: 'react-social-icons',
  //       // how do I resolve multiple entries?
  //       // entry: resolve(
  //       //   // new URL(
  //       //     './src/react-social-icons.ts',
  //       //     // import.meta.url
  //       //   // ).toString()
  //       // ),
  //       formats: ['es', 'umd'],
  //       fileName: (fmt) => `react-social-icons.${fmt}.ts`,
  //       dir: './dist',
  //     }
  //   }
  // }
  // }

  return {
    ...await rollupConfig(),
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/unit/setup.js',
    },
  }
})
