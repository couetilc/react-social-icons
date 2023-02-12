import * as React from "react";

interface SocialIconObject {
  icon: string;
  mask: string;
  color: string;
}

interface SocialIconProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>  {
  className?: string;
  bgColor?: string;
  fgColor?: string;
  label?: string;
  network?: string;
  url?: string;
  defaultSVG?: SocialIconObject;
  style?: React.CSSProperties;
}

declare function keyFor(url?: string): string;

declare function getKeys(): string[];

declare const SocialIcon: React.FunctionComponent<SocialIconProps>;
