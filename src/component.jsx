import * as React from "react";
import appStyles from "./styles.css";

const DEFAULT_KEY = "sharethis";

if (typeof document !== "undefined") {
  const styleNode = document.createElement("style");
  document.head.appendChild(styleNode);
  try {
    styleNode.sheet.insertRule(
      appStyles,
      styleNode.sheet.cssRules.length,
    );
  }
  catch (ignore) {}
}

const makeUriRegex = (socials = []) => new RegExp(
  "(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?($SOCIALS).*"
    .replace("$SOCIALS", socials.join("|")),
  "u",
);

const social_icons = new Map();
const network_names = new Set();
let uri_regex = makeUriRegex();

function register(social, icon) {
  social_icons.set(social, icon);
  network_names.add(social);
  uri_regex = makeUriRegex(
    // sort by longest string first
    [ ...network_names ].sort((pre, post) => post.length - pre.length)
  );
}

function keyFor(url) {
  if (!url) {
    return DEFAULT_KEY;
  }

  const key = url.replace(uri_regex, "$1");
  return key === url ? DEFAULT_KEY : key;
}

const SocialIcon = (props) => {

  /* eslint-disable react/prop-types */

  const {
    url,
    network,
    bgColor,
    fgColor,
    className,
    label,
    children,
    defaultSVG,
    ...rest
  } = props;

  const networkKey = network || keyFor(url);

  const {
    icon,
    mask,
    color,
  } = networkKey === DEFAULT_KEY && defaultSVG
    || social_icons.get(networkKey)
    || {};

  return (
    <a
      /* todo: this href prop should be href={href || url}. href should have 
      * precedence in case someone is setting url to specify the network but
      * wants to link it someplace else, also so it works well composed with
        * other libraries. empty string ("") should not be the default incase
      * we change the base element (using a new "as" prop) to an element that
      * doesn't support the href attribute. Test cases are needed for both of
        * these features */
      href={url || ""}
      className={`social-icon${className ? ` ${className}` : ""}`}
      aria-label={label || networkKey}
      {...rest}
    >
      <div className="social-container">
        <svg
          role="img"
          aria-label={`${networkKey} social icon`}
          className="social-svg"
          viewBox="0 0 64 64"
        >

          <g className="social-svg-background">
            <circle cx="32" cy="32" r="31" />
          </g>

          <g className="social-svg-icon" style={{
            fill: fgColor,
          }}>
            <path d={icon} />
          </g>

          <g className="social-svg-mask" style={{
            fill: bgColor || color
          }}>
            <path d={mask} />
          </g>
        </svg>
      </div>
      {children}
    </a>
  );
};

export {
  SocialIcon,
  keyFor,
  register,
  social_icons,
  network_names,
  uri_regex,
};
