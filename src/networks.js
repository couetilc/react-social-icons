import DB from './_networks-db.js'

export const DEFAULT_KEY = 'sharethis'
export const KEYS = Object.keys(DB)
const KEYS_REGEX = /(?:https?:\/\/)?(?:.*\.)?(?<key>.*?)\..*?($|\/)/;

export function keyTo(key, { icon, mask, color }) {
  DB[key] = { icon, mask, color };
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

  if (url.startsWith('mailto:')) {
    return 'mailto'
  }

  const { groups } = url.match(KEYS_REGEX);
  return groups && KEYS.includes(groups.key) ? groups.key : DEFAULT_KEY
}

export function keysFor(urls) {
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return []
  }

  return urls.map(keyFor)
}
