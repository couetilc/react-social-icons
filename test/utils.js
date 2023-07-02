import fs from "fs";

export function readIcon(network) {
  return JSON.parse(
    fs.readFileSync(
      new URL(
        `../db/${network}.json`,
        import.meta.url,
      )
    )
  )
}

export function randString() {
  return Math.random().toString(36).substr(2, 12)
}
