var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { social_icons, uri_regex } from './db';
const DEFAULT_KEY = 'sharethis';
console.log("DEBUG INFO");
console.log(uri_regex.toString());
console.log(social_icons);
function keyFor(url) {
    if (!url) {
        return DEFAULT_KEY;
    }
    const key = url.replace(uri_regex, '$1');
    return key === url ? DEFAULT_KEY : key;
}
function SocialIcon(props) {
    const { url, network, bgColor, fgColor, className, label, children, defaultSVG, style } = props, rest = __rest(props, ["url", "network", "bgColor", "fgColor", "className", "label", "children", "defaultSVG", "style"]);
    if (typeof defaultSVG === 'object' && defaultSVG !== null) {
        social_icons.set(DEFAULT_KEY, defaultSVG);
    }
    const networkKey = props.network || keyFor(url);
    const { icon, mask, color } = social_icons.get(networkKey) || {};
    return (_jsxs("a", Object.assign({ href: url || '', className: 'social-icon' + (className ? ' ' + className : ''), style: Object.assign(Object.assign({}, socialIcon), style), "aria-label": label || networkKey }, rest, { children: [_jsx("div", Object.assign({ className: "social-container", style: socialContainer }, { children: _jsxs("svg", Object.assign({ role: "img", "aria-label": `${networkKey} social icon`, className: "social-svg", style: socialSvg, viewBox: "0 0 64 64" }, { children: [_jsx("g", Object.assign({ className: "social-svg-background", style: socialSvgContent }, { children: _jsx("circle", { cx: "32", cy: "32", r: "31" }) })), _jsx("g", Object.assign({ className: "social-svg-icon", style: Object.assign(Object.assign({}, socialSvgContent), { fill: fgColor || 'transparent' }) }, { children: _jsx("path", { d: icon }) })), _jsx("g", Object.assign({ className: "social-svg-mask", style: Object.assign(Object.assign({}, socialSvgMask), { fill: bgColor || color }) }, { children: _jsx("path", { d: mask }) }))] })) })), children] })));
}
const socialIcon = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    position: 'relative',
    overflow: 'hidden',
    verticalAlign: 'middle'
};
const socialContainer = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
};
const socialSvg = {
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fillRule: 'evenodd'
};
const socialSvgContent = {
    msTransition: 'fill 170ms ease-in-out',
    OTransition: 'fill 170ms ease-in-out',
    MozTransition: 'fill 170ms ease-in-out',
    WebkitTransition: 'fill 170ms ease-in-out',
    transition: 'fill 170ms ease-in-out',
    fill: 'transparent'
};
const socialSvgMask = Object.assign(Object.assign({}, socialSvgContent), { fill: '#0f0b0b' });
export { SocialIcon, keyFor };
