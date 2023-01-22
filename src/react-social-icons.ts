// icons MUST be imported before SocialIcon. TODO really?
import "./icons";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Rollup requires a file extension 
import { SocialIcon, keyFor, network_names } from "./component.tsx";

function getKeys() { return [...network_names]; }

export { SocialIcon, keyFor, getKeys };
