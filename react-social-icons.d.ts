import * as React from 'react'

interface SocialIconObject {
  color: string
  path: string
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
  fallback?: SocialIconObject
  defaultSVG?: SocialIconObject
  style?: React.CSSProperties
  as?: string
}

declare function networkFor(url?: string): string

declare function getNetworks(): string[]

declare function getKeys(): string[]

declare const SocialIcon: React.FunctionComponent<SocialIconProps>

declare function register(network: string, icon: SocialIconObject): void

declare const social_icons: Map<string, SocialIconObject>

declare const network_names: Set<string>

declare const uri_regex: RegExp
