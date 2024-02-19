/* eslint-disable no-await-in-loop */
import * as fsp from 'node:fs/promises'

import { URL } from 'node:url'
import { optimize } from 'svgo'
import { resolve } from 'node:path'

const DIRNAME = new URL('.', import.meta.url).pathname
const DB_DIR = resolve(DIRNAME, 'db')

const main = async () => {
  const files = await fsp.readdir(DB_DIR)
  for (const file of files) {
    const svgPath = resolve(DB_DIR, file)
    const svgInfo = JSON.parse(
      (await fsp.readFile(svgPath, 'utf-8')).toString(),
    )
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <path d="${svgInfo.path}"/>
    </svg>`
    const result = optimize(svgString, {
      path: `${svgPath}.svg`,
      multipass: true,
    })
    const path = result.data
      .replace(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="',
        '',
      )
      .replace('"/></svg>', '')
    svgInfo.path = path
    await fsp.writeFile(
      svgPath,
      `${JSON.stringify(svgInfo, null, '  ')}\n`,
      'utf-8',
    )
  }
}

await main()
