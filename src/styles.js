export const socialIcon = {
  display: "inline-block",
  width: "50px",
  height: "50px",
  position: "relative",
  overflow: "hidden",
  verticalAlign: "middle"
};

export const socialContainer = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
};

export const socialSvg = {
  borderRadius: "50%",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  fillRule: "evenodd"
};

export const socialSvgContent = {
  msTransition: "fill 170ms ease-in-out",
  OTransition: "fill 170ms ease-in-out",
  MozTransition: "fill 170ms ease-in-out",
  WebkitTransition: "fill 170ms ease-in-out",
  transition: "fill 170ms ease-in-out",
  fill: "transparent"
};

export const socialSvgMask = {
  ...socialSvgContent,
  fill: "#0f0b0b"
};
