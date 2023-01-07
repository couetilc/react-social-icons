import fs from 'fs/promises';

export async function generateSocialIcons() {
  const iconsDirectory = new URL('../src/icons', import.meta.url);
  const dbDirectory = new URL('../db', import.meta.url);
  await fs.mkdir(iconsDirectory, { recursive: true });
  await fs.mkdir(dbDirectory, { recursive: true });
  const icons = await fs.readdir(dbDirectory);
  const modules = {};
  await Promise.all(icons.map(
    filename => import(`../db/${filename}`)
      .then(async module => { modules[filename] = module.default })
  ));
  const filenames = Object.keys(modules)
  const networks = [];

  await Promise.all(filenames.map(async filename => {
    const network = filename.replace(/\.(js|ts)/, '')
    networks.push(network);
    await fs.writeFile(
      new URL(`./icons/${network}.js`, iconsDirectory),
      `import { register } from "../db.ts";register(${JSON.stringify(network)}, ${JSON.stringify(modules[filename])})`
    );
    // const { icon, mask, color } = icons[name];
    // await fs.writeFile(
    //   new URL(`./db/${name}.js`, dbDirectory),
    //   `export default {\n  icon: ${JSON.stringify(icon)},\n  mask: ${JSON.stringify(mask)},\n  color: ${JSON.stringify(color)},\n}`
    // );
  }));

  await fs.writeFile(
    new URL(`./icons/index.js`, iconsDirectory),
    filenames.map(filename => `import './${filename}';`).join('\n'),
  );
  await fs.writeFile(
    new URL(`./icons/index.ts`, iconsDirectory),
    filenames.map(filename => `import './${filename}';`).join('\n'),
  );

  await fs.writeFile(
    new URL(`./icons/types.ts`, iconsDirectory),
    `export type Network = ${networks.map(JSON.stringify).join(' | ')};`,
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
