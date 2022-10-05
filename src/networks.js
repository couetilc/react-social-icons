let DB = {}

export const DEFAULT_KEY = 'sharethis'
export let KEYS = Object.keys(DB)
let sortLongestFirst = (arr) =>
  arr.sort((pre, post) => post.length - pre.length)
let KEYS_REGEX = new RegExp(
  '(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?(' +
    sortLongestFirst(KEYS).join('|') +
    ').*'
)

export function init(db) {
  DB = db
  KEYS = Object.keys(DB)
  KEYS_REGEX = new RegExp(
    '(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?(' +
      sortLongestFirst(KEYS).join('|') +
      ').*'
  )
}

export function keyTo(key, { icon, mask, color }) {
  DB[key] = { icon, mask, color }
}

export function iconFor(key) {
  return DB[key] ? DB[key].icon : null
}

export function maskFor(key) {
  return DB[key] ? DB[key].mask : null
}

export function colorFor(key) {
  return DB[key] ? DB[key].color : null
}

export function keyFor(url) {
  if (!url) {
    return DEFAULT_KEY
  }
  const key = url.replace(KEYS_REGEX, '$1')
  return key === url ? DEFAULT_KEY : key
}

export function keysFor(urls) {
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return []
  }

  return urls.map(keyFor)
}
