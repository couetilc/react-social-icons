/* eslint-env node */
import fs from "fs/promises";
import path from "path";
import url from "url";

async function run() {
  const dbDirectory = new URL("./db", import.meta.url);
  const filenames = await fs.readdir(dbDirectory);
  const icons = await Promise.all(filenames.map(filename => {
    return import(
      "./" +
      path.relative(
        process.cwd(),
        path.join(url.fileURLToPath(dbDirectory), filename)
      )
    ).then(
      ({ default: icon }) => {
        return fs.writeFile(
          new URL(`./db/${filename.replace('.js', '.json')}` , import.meta.url),
          JSON.stringify(icon, null, '\t'),
        );
      }
      // ({ icon, name: filename.replace('.js', '') })
    );
  }));
}

run();
