const DB = { icons: {} };

export function register(key, { icon, mask, color }) {
  DB.icons[key] = { icon, mask, color };
}

export default DB;
