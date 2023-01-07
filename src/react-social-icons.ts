// icons MUST be imported before SocialIcon. TODO really?
import "./icons";
import { SocialIcon, keyFor, network_names } from "./component";

function getKeys() { return [...network_names]; }

export { SocialIcon, keyFor, getKeys };
