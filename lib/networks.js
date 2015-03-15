var DEFAULT_KEY = 'sharethis';
var DB = require('./_networks-db');

var KEYS = Object.keys(DB);
var KEYS_REGEX = new RegExp(`.*(${KEYS.join('|')}).*`);

const iconFor = (key) => {
  return DB[key] ? DB[key].icon : null;
};

const maskFor = (key) => {
  return DB[key] ? DB[key].mask : null;
};

const colorFor = (key) => {
  return DB[key] ? DB[key].color : null;
};

const keyFor = (url) => {
  if (!url) return DEFAULT_KEY;

  var key = url.replace(KEYS_REGEX, '$1');
  return key === url ? DEFAULT_KEY : key;
};

const keysFor = (urls) => {
  if (!urls || !Array.isArray(urls) || urls.length === 0) return [];

  return urls.map(keyFor);
};

exports.KEYS = KEYS;
exports.iconFor = iconFor;
exports.maskFor = maskFor;
exports.keyFor = keyFor;
exports.keysFor = keysFor;
exports.colorFor = colorFor;