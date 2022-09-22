// icons MUST be imported before SocialIcon. TODO really?
import './icons';
import { SocialIcon, keyFor } from './component';
import { network_names } from './db'

function getKeys() { return [...network_names]; }

export { SocialIcon, keyFor, getKeys };