/* eslint-env node */
import fs from 'fs'

const VIRTUAL_PKG = 'social-icons'
const IMPORT_PREFIX = `\0${VIRTUAL_PKG}`

export default function rollupPluginSocialIcons() {
  const db = new Map()

  return {
    name: 'social-icons',

    async buildStart() {
      const dbFiles = await fs.promises.readdir(
        new URL('./db', import.meta.url)
      )
      await Promise.all(
        dbFiles.map((filename) =>
          fs.promises
            .readFile(new URL(`./db/${filename}`, import.meta.url))
            .then((icon) => {
              const network = filename.replace('.json', '')
              db.set(network, JSON.parse(icon.toString()))
            })
        )
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
          return `${file}import '${VIRTUAL_PKG}:${network}';`
        }, '')
        return { code, moduleSideEffects: true }
      }

      const network = id.replace(`${IMPORT_PREFIX}:`, '')

      return `
        import { register } from './src/component.jsx';
        export default register(${
          JSON.stringify(network)
        }, ${
          JSON.stringify(db.get(network))
        });
      `
    },
  }
}
