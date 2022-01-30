import fs from 'fs/promises';
import path from 'path';
import icons from '../src/_networks-db.js'

(async function generateRegistrationFiles() {
  const iconsDirectory = new URL('../src/_icons', import.meta.url);
  await fs.mkdir(iconsDirectory, { recursive: true });
  const imports = [];
  await Promise.all(Object.keys(icons).map(async name => {
    imports.push(`import './${name}.js';`);
    await fs.writeFile(new URL(`./_icons/${name}.js`, iconsDirectory), `
      import { register } from '../db';
      register(${JSON.stringify(name)}, ${JSON.stringify(icons[name])});
    `);
  }));
  await fs.writeFile(new URL(`./_icons/index.js`, iconsDirectory), imports.join('\n'));
})();
