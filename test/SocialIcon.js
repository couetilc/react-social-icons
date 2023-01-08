import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { SocialIcon, keyFor } from "../src/react-social-icons.js";
const SocialIconTest = () => (_jsxs(_Fragment, { children: [_jsx(SocialIcon, { url: "https//example.com", bgColor: "#000000", fgColor: "#ffffff", label: "social icon", network: "example", defaultSVG: { icon: "", mask: "", color: "" }, style: { height: "100px", width: "100px" }, target: "blank", rel: "noreferrer" }), _jsx(SocialIcon, { url: null, bgColor: null, fgColor: null, label: null, network: null, defaultSVG: { icon: "" }, style: null, target: null, rel: null }), _jsx(SocialIcon, { children: _jsx("div", {}) })] }));
const keyForTest = () => {
  keyFor();
  keyFor("https://twitter.com");
  keyFor(1234);
};
export default SocialIconTest;
