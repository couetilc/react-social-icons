import type { Network } from './icons/types'

const makeRegex = (socials : string[] = []) => new RegExp('(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?($SOCIALS).*'.replace('$SOCIALS', socials.join('|')))

type Icon = { icon: string, mask: string, color: string }

const social_icons = new Map<string, Icon>();
const network_names = new Set<string>();
let uri_regex = makeRegex();

function register(social: string, icon: Icon) {
  social_icons.set(social, icon);
  network_names.add(social);
  uri_regex = makeRegex(
    // sort by longest string first
    [ ...network_names ].sort((pre, post) => post.length - pre.length)
  );
}

export { register, social_icons, network_names, uri_regex };