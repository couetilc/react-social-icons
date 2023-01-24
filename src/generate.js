import fs from "fs/promises";

export async function generateSocialIcons() {
  const iconsDirectory = new URL("../src/icons", import.meta.url);
  const dbDirectory = new URL("../db", import.meta.url);
  await fs.mkdir(iconsDirectory, { recursive: true });
  await fs.mkdir(dbDirectory, { recursive: true });
  const icons = await fs.readdir(dbDirectory);
  const modules = {};
  await Promise.all(icons.map(
    filename => import(`../db/${filename}`)
      .then(module => { modules[filename] = module.default; })
  ));
  const filenames = Object.keys(modules);
  const networks = [];

  await Promise.all(filenames.map(async filename => {
    const network = filename.replace(/\.(?:js|ts)/u, "");
    networks.push(network);
    await fs.writeFile(
      new URL(`./icons/${network}.ts`, iconsDirectory),
      `import { register } from "../component.tsx";\nregister(${JSON.stringify(network)}, ${JSON.stringify(modules[filename])})`
    );
  }));

  await fs.writeFile(
    new URL("./icons/index.ts", iconsDirectory),
    filenames.map(filename => `import './${filename}';`).join("\n"),
  );

  await fs.writeFile(
    new URL("./icons/types.ts", iconsDirectory),
    `export type Network = ${networks.map(JSON.stringify).join(" | ")};`,
  );
}

export function rollupPluginSocialIcons() {
  return {
    name: "rollup-plugin-social-icons",
    async resolveId(source, importer, options) {
      if (source === "./icons") {
        await generateSocialIcons();
        const resolution = await this.resolve(source, importer, {
          skipSelf: true,
          ...options
        });
        return resolution.id;
      }
      return null;
    },
  };
}
