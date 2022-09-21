const regex = (socials = []) => new RegExp('(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?($SOCIALS).*'.replace('$SOCIALS', socials.join('|')))

const DB = {
  icons: new Map(),
  socials: new Set(),
  regex: regex(),
};

export function register(social, { icon, mask, color }) {
  DB.icons.set(social, { icon, mask, color });
  DB.socials.add(social);
  DB.regex = regex(
    Array.from(DB.socials)
    .sort((pre, post) => post.length - pre.length) // sort by longest string first
  );
}

export default DB;