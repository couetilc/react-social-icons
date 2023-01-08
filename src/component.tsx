import React from "react";
import type { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

const DEFAULT_KEY = "sharethis";

interface SocialIconType {
  icon: string;
  mask: string;
  color: string;
}

interface SocialIconProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>  {
  className?: string;
  bgColor?: string;
  fgColor?: string;
  label?: string;
  network?: string;
  url?: string;
  defaultSVG?: SocialIconType;
  style?: React.CSSProperties;
}

const socialIcon: React.CSSProperties = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  position: "relative",
  overflow: "hidden",
  verticalAlign: "middle"
};

const socialContainer: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
};

const socialSvg: React.CSSProperties = {
  borderRadius: "50%",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  fillRule: "evenodd"
};

const socialSvgContent: React.CSSProperties = {
  msTransition: "fill 170ms ease-in-out",
  OTransition: "fill 170ms ease-in-out",
  MozTransition: "fill 170ms ease-in-out",
  WebkitTransition: "fill 170ms ease-in-out",
  transition: "fill 170ms ease-in-out",
  fill: "transparent"
};

const socialSvgMask: React.CSSProperties = {
  ...socialSvgContent,
  fill: "#0f0b0b"
};

const makeUriRegex = (socials : string[] = []) => new RegExp(
  "(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?($SOCIALS).*"
    .replace("$SOCIALS", socials.join("|")),
  "u",
);

const social_icons = new Map<string, SocialIconType>();
const network_names = new Set<string>();
let uri_regex = makeUriRegex();

function register(social: string, icon: SocialIconType) {
  social_icons.set(social, icon);
  network_names.add(social);
  uri_regex = makeUriRegex(
    // sort by longest string first
    [ ...network_names ].sort((pre, post) => post.length - pre.length)
  );
}

function keyFor(url?: string) {
  if (!url) {
    return DEFAULT_KEY;
  }

  const key = url.replace(uri_regex, "$1");
  return key === url ? DEFAULT_KEY : key;
}

function SocialIcon(props: SocialIconProps) {
  const {
    url, network, bgColor, fgColor, className, label, children, defaultSVG, style,
    ...rest
  } = props;

  if (typeof defaultSVG === "object" && defaultSVG !== null) {
    social_icons.set(DEFAULT_KEY, defaultSVG);
  }

  const networkKey = network || keyFor(url);

  const { icon, mask, color } = social_icons.get(networkKey) || {};

  return (
    <a
      href={url || ""}
      className={`social-icon${  className ? ` ${  className}` : ""}`}
      style={{ ...socialIcon, ...style }}
      aria-label={label || networkKey}
      {...rest}
    >
      <div className="social-container" style={socialContainer}>
        <svg
          role="img"
          aria-label={`${networkKey} social icon`}
          className="social-svg"
          style={socialSvg}
          viewBox="0 0 64 64"
        >

          <g className="social-svg-background" style={socialSvgContent}>
            <circle cx="32" cy="32" r="31" />
          </g>

          <g className="social-svg-icon" style={{
            ...socialSvgContent,
            fill: fgColor || "transparent"
          }}>
            <path d={icon} />
          </g>

          <g className="social-svg-mask" style={{
            ...socialSvgMask,
            fill: bgColor || color
          }}>
            <path d={mask} />
          </g>
        </svg>
      </div>
      {children}
    </a>
  );
}

export {
  SocialIcon,
  keyFor,
  register,
  social_icons,
  network_names,
  uri_regex,
};
