var DEFAULT_KEY = 'default';
var DB = require('./_networks-db');

var KEYS = Object.keys(DB);
var KEYS_REGEX = new RegExp(`.*(${KEYS.join('|')}).*`);

exports.iconFor = (key) => {
  return DB[key] ? DB[key].icon : null;
};

exports.maskFor = (key) => {
  return DB[key] ? DB[key].mask : null;
};

exports.keyFor = (url) => {
  if (!url) return DEFAULT_KEY;

  var key = url.replace(KEYS_REGEX, '$1');
  return key === url ? DEFAULT_KEY : key;
};