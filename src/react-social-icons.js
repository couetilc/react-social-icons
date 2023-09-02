import 'social-icons'
import {
  SocialIcon,
  networkFor,
  register,
  social_icons,
  network_names,
  uri_regex,
} from './component.jsx'

export function getNetworks() {
  return [...network_names]
}

// note: deprecate in v7
export function getKeys() {
  return getNetworks()
}

export {
  SocialIcon,
  networkFor,
  register,
  social_icons,
  network_names,
  uri_regex,
}
