const makeRegex = (socials = []) => new RegExp('(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?($SOCIALS).*'.replace('$SOCIALS', socials.join('|')));
const social_icons = new Map();
const network_names = new Set();
let uri_regex = makeRegex();
console.log("imported db %o", { register });
function register(social, icon) {
    console.log("called register");
    console.log("register %o", { social, icon });
    social_icons.set(social, icon);
    network_names.add(social);
    uri_regex = makeRegex([...network_names].sort((pre, post) => post.length - pre.length));
    console.log({ social_icons, network_names, uri_regex });
}
export { register, social_icons, network_names, uri_regex };
