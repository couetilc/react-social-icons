import React from "react";

const makeRegex = (socials : string[] = []) => new RegExp("(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?($SOCIALS).*".replace("$SOCIALS", socials.join("|")));

type Icon = { icon: string, mask: string, color: string }

const social_icons = new Map<string, Icon>();
const network_names = new Set<string>();
let uri_regex = makeRegex();

function register(social: string, icon: Icon) {
  social_icons.set(social, icon);
  network_names.add(social);
  uri_regex = makeRegex(
    // sort by longest string first
    [ ...network_names ].sort((pre, post) => post.length - pre.length)
  );
}

const DEFAULT_KEY = "sharethis";

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

  const networkKey = props.network || keyFor(url);

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

interface SocialIconProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>  {
  className?: string;
  bgColor?: string;
  fgColor?: string;
  label?: string;
  network?: string;
  url?: string;
  defaultSVG?: SVG;
  style?: React.CSSProperties;
}

interface SVG {
  icon: string;
  mask: string;
  color: string;
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

export {
  SocialIcon,
  keyFor,
  register,
  social_icons,
  network_names,
  uri_regex,
};
