import fs from "fs";

export function readIcon(network) {
  return JSON.parse(
    fs.readFileSync(
      new URL(
        `../db/${network}.json`,
        import.meta.url,
      )
    )
  );
}
