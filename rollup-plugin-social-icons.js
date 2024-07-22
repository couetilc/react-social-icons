/* eslint-env node */
import fs from 'fs'
import { optimize } from 'svgo'

const VIRTUAL_PKG = 'social-icons'
const IMPORT_PREFIX = `\0${VIRTUAL_PKG}`

export default function rollupPluginSocialIcons() {
  const db = new Map()

  return {
    name: 'social-icons',

    async buildStart() {
      const dbFiles = await fs.promises.readdir(
        new URL('./db', import.meta.url),
      )
      await Promise.all(
        dbFiles.map((filename) =>
          fs.promises
            .readFile(new URL(`./db/${filename}`, import.meta.url))
            .then((icon) => {
              const network = filename.replace('.json', '')
              const json = JSON.parse(icon.toString())
              json.path = optimizePath(json.path)
              db.set(network, json)
            }),
        ),
      )
    },

    resolveId(source) {
      if (source.startsWith(VIRTUAL_PKG)) {
        return `\0${source}`
      }
      return null
    },

    load(id) {
      if (!id.startsWith(IMPORT_PREFIX)) {
        return null
      }

      if (id === IMPORT_PREFIX) {
        const code = Array.from(db.keys()).reduce((file, network) => {
          return `${file}export { default as ${JSON.stringify(
            network.replace(/\W/u, ''),
          )} } from '${VIRTUAL_PKG}:${network}';`
        }, '')
        return { code, moduleSideEffects: true }
      }

      const network = id.replace(`${IMPORT_PREFIX}:`, '')

      return `
        import { register } from './src/component.jsx';
        export default register(${JSON.stringify(network)}, ${JSON.stringify(
          db.get(network),
        )});
      `
    },
  }
}

function optimizePath(path) {
  return optimize(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="${path}"/></svg>`,
    {
      multipass: true,
    },
  )
    .data.replace(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="',
      '',
    )
    .replace('"/></svg>', '')
}
