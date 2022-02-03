import DB from './db';

export const DEFAULT_KEY = 'sharethis'
export const KEYS = Object.keys(DB.icons) // TODO remove this export.
export const getKeys = () => Object.keys(DB.icons);
const sortLongestFirst = arr => arr.sort((pre, post) => post.length - pre.length)
// TODO make this from a function? and make it a singleton?
const KEYS_REGEX = new RegExp(
  '(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?(' + sortLongestFirst(KEYS).join('|') + ').*'
)

export function keyTo(key, { icon, mask, color }) {
  DB.icons[key] = { icon, mask, color };
}

export function iconFor(key) {
  return DB.icons[key] ? DB.icons[key].icon : null
}

export function maskFor(key) {
  return DB.icons[key] ? DB.icons[key].mask : null
}

export function colorFor(key) {
  return DB.icons[key] ? DB.icons[key].color : null
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
