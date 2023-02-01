import "social-icons";
// @ts-ignore: Rollup requires a file extension 
import { SocialIcon, keyFor, network_names } from "./component.tsx";

function getKeys(): string[] { return [...network_names]; }

export { SocialIcon, keyFor, getKeys };
