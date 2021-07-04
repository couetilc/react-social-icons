import { FunctionComponent, CSSProperties } from 'react';
interface SVG {
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
  defaultSVG?: SVG;
  style?: CSSProperties;
}
declare const SocialIcon: FunctionComponent<SocialIconProps>;
declare function keyFor(url?: string): string;
export { SocialIcon, SocialIconProps, keyFor };
