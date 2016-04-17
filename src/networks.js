import DB from './_networks-db';

const DEFAULT_KEY = 'sharethis';
export const KEYS = Object.keys(DB);
const KEYS_REGEX = new RegExp(`(?:https?:\\/\\/(?:www\.)?)?(${KEYS.join('|')}).*`);

export function iconFor(key) {
  return DB[key] ? DB[key].icon : null;
}

export function maskFor(key) {
  return DB[key] ? DB[key].mask : null;
}

export function colorFor(key) {
  return DB[key] ? DB[key].color : null;
}

export function keyFor(url) {
  if (!url) {
    return DEFAULT_KEY;
  }

  const key = url.replace(KEYS_REGEX, '$1');
  return key === url ? DEFAULT_KEY : key;
}

export function keysFor(urls) {
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return [];
  }

  return urls.map(keyFor);
}
