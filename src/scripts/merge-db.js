import fs from 'fs'
import path from 'path'

async function main() {
  console.log('Merging db')
  const netowrksPath = path.join(process.cwd(), 'src', 'networks')
  console.log(netowrksPath)

  const allIcons = fs.readdirSync(netowrksPath)

  console.log({ allIcons })

  const imports = await Promise.all(
    allIcons.map(async (fileName) => {
      const imp = await import(`../networks/${fileName}`).catch((err) => {
        console.error(`Could not import ${fileName}`, err)
      })
      let iconName = fileName.replace(/\.js$/, '')
      if (iconName.includes('play'))
        console.log([iconName, iconName.replace(/_/g, '.')])
      iconName = iconName.replace(/_/g, '.')
      if (iconName.includes('play'))
        console.log([iconName, iconName.replace(/_/g, '.')])
      return [iconName, imp.default.default]
    })
  )
  const files = imports.reduce(
    (acc, [key, content]) => ({
      ...acc,
      [key]: content,
    }),
    {}
  )

  fs.writeFileSync(
    path.join(process.cwd(), 'src', '_networks-db_all.js'),
    `export default ${JSON.stringify(files, undefined, 2)}`
  )
}

main()
