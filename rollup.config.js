/* eslint-env node */
import socialIcons from './rollup-plugin-social-icons.js'
import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import fs from 'fs'
import copy from 'rollup-plugin-copy'
import packagejson from './package.json' assert { type: 'json' }

export async function config() {

  const networks = (await fs.promises.readdir(new URL('db', import.meta.url)))
    .map(filename => filename.replace('.json', ''))

  const external = id => {
    if (id === 'react') return true
    if (id === 'react-dom') return true
    if (id === 'react/jsx-runtime') return true
    if (/@babel\/runtime/u.test(id)) return true
    return false
  }

  return [
    {
      input: {
        'react-social-icons': 'src/react-social-icons.js',
        component: 'src/component.jsx',
        'icons/index': 'social-icons',
        ...networks.reduce((inputMap, network) => {
          inputMap[`icons/${network}`] = `social-icons:${network}`
          return inputMap
        }, {}),
      },
      output: [
        {
          format: 'es',
          dir: './dist',
          entryFileNames: '[name].js',
        },
      ],
      plugins: [
        socialIcons(),
        resolve(),
        babel({
          babelHelpers: 'runtime',
          exclude: '**/node_modules/**',
          targets: 'defaults and supports es6-module',
        }),
        copy({
          targets: [
            {
              src: 'src/react-social-icons.d.ts',
              dest: 'dist/'
            },
          ]
        }),
        {
          name: 'update-package-json-exports',
          closeBundle: async () => {
            const exports = {}
            for (const network of networks) {
              exports[network] = `./dist/icons/${network}.js`
            }
            packagejson.exports = {
              component: './dist/component.js',
              ...exports
            }
            await fs.promises.writeFile(
              './package.json',
              JSON.stringify(packagejson, null, 2),
            )
          }
        }
      ],
      external,
    },
    {
      input: {
        'react-social-icons': 'src/react-social-icons.js',
      },
      output: {
        format: 'cjs',
        dir: './dist',
        entryFileNames: '[name].cjs',
        name: 'ReactSocialIcons',
      },
      plugins: [
        socialIcons(),
        resolve(),
        babel({
          babelHelpers: 'runtime',
          exclude: '**/node_modules/**',
          targets: 'maintained node versions',
        }),
      ],
      external,
    },
  ]
}

export default config()
