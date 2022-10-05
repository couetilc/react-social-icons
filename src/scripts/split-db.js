import _networksDb from '../_networks-db.js'
import fs from 'fs'
import path from 'path'

console.log('Splitting db')

const allImports = Object.entries(_networksDb).map(([key, value]) => {
  // replace names like 't.me' with 't_me'
  const varName = key.replace(/\./, '_')
  value['name'] = key
  const content = `const ${varName} = ${JSON.stringify(value, undefined, 2)};
  export default ${varName};`
  fs.writeFileSync(
    path.resolve(`${process.cwd()}/src/networks/${varName}.js`),
    content
  )
  return varName
})

const imports = allImports
  .map((imp) => `import ${imp} from './${imp}.js';`)
  .join('')

const exports = `export { ${allImports.join(',')} };`

const index = [imports, exports].join('\n')

fs.writeFileSync(path.resolve(`${process.cwd()}/src/networks/all.js`), index)
