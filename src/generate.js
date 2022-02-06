import fs from 'fs/promises';
import icons from '../src/_networks-db.js'

export async function generateSocialIcons() {
  const iconsDirectory = new URL('../src/icons', import.meta.url);
  await fs.mkdir(iconsDirectory, { recursive: true });
  const imports = [];
  await Promise.all(Object.keys(icons).map(async name => {
    imports.push(`import './${name}.js';`);
    await fs.writeFile(new URL(`./icons/${name}.js`, iconsDirectory), `
      import { register } from '../db';
      register(${JSON.stringify(name)}, ${JSON.stringify(icons[name])});
    `);
  }));
  await fs.writeFile(new URL(`./icons/index.js`, iconsDirectory), imports.join('\n'));
}

export function rollupPluginSocialIcons() {
  return {
    name: 'rollup-plugin-social-icons',
    async resolveId(source, importer, options) {
      if (source === './icons') {
        await generateSocialIcons();
        const resolution = await this.resolve(source, importer, {
          skipSelf: true,
          ...options
        });
        return resolution.id;
      }
      return null;
    },
  }
}
