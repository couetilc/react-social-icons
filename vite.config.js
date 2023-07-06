import { defineConfig } from 'vite'
import socialIcons from './rollup-plugin-social-icons.js'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import { config as rollupConfig } from './rollup.config.js'

export default defineConfig(() => {
  return {
    build: {
      write: false,
    },
    plugins: [
      socialIcons(),
      resolve(),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        targets: 'defaults and supports es6-module',
      }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/unit/setup.js',
    },
  }
})
