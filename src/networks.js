import DB from './db.js';

export const DEFAULT_KEY = 'sharethis'
export const getKeys = () => Array.from(DB.socials)

export function keyTo(social, { icon, mask, color }) {
  iconTo(social, { icon, mask, color });
}

export function iconTo(social, { icon, mask, color }) {
  DB.icons.set(social, { icon, mask, color });
}

export function iconFor(key) {
  return DB.icons.has(key) ? DB.icons.get(key).icon : null
}

export function maskFor(key) {
  return DB.icons.has(key) ? DB.icons.get(key).mask : null
}

export function colorFor(key) {
  return DB.icons.has(key) ? DB.icons.get(key).color : null
}

export function keyFor(url) {
  if (!url) {
    return DEFAULT_KEY
  }

  const key = url.replace(DB.regex, '$1')
  return key === url ? DEFAULT_KEY : key
}
