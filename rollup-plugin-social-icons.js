/* eslint-env node */
import fs from 'fs'

const IMPORT_PREFIX = '\0social-icons'

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
      if (source.startsWith('social-icons')) {
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
          return `${file}import 'social-icons:${network}';`
        }, '')
        return { code, moduleSideEffects: true }
      }

      const network = id.replace(`${IMPORT_PREFIX}:`, '')
      return `import { register } from './src/component.jsx';register(${JSON.stringify(
        network
      )}, ${JSON.stringify(db.get(network))})`
    },
  }
}
