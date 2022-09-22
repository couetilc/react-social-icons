import fs from 'fs/promises';
import icons from '../src/_networks-db.js'

export async function generateSocialIcons() {
  const iconsDirectory = new URL('../src/icons', import.meta.url);
  await fs.mkdir(iconsDirectory, { recursive: true });
  const names = Object.keys(icons);

  await Promise.all(names.map(async name => {
    await fs.writeFile(
      new URL(`./icons/${name}.ts`, iconsDirectory),
      `import { register } from "../db.ts";register(${JSON.stringify(name)}, ${JSON.stringify(icons[name])})`
    );
  }));

  await fs.writeFile(
    new URL(`./icons/index.ts`, iconsDirectory),
    names.map(name => `import './${name}.ts';`).join('\n'),
  );

  await fs.writeFile(
    new URL(`./icons/types.ts`, iconsDirectory),
    `export type Network = ${names.map(JSON.stringify).join(' | ')};`,
  );
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
