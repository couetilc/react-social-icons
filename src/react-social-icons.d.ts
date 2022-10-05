import { FunctionComponent, CSSProperties } from 'react'
export interface SVG {
  icon: string
  mask: string
  color: string
}
interface SocialIconProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  className?: string
  bgColor?: string
  fgColor?: string
  label?: string
  network?: string
  url?: string
  defaultSVG?: SVG
  style?: CSSProperties
}
interface SocialIconDatabase {
  importNetwork: (iconImport: Array<SVG>) => void
  importNetworks: (iconImport: Array<SVG>) => void
}

declare const SocialIcon: FunctionComponent<SocialIconProps>
declare const SocialIconDatabase: SocialIconDatabase
declare function keyFor(url?: string): string
export { SocialIcon, SocialIconDatabase, SocialIconProps, keyFor }
