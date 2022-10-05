import { FunctionComponent } from 'react'
import { SocialIconProps } from './react-social-icons'

interface Network {
  icon: string
  mask: string
  color: string
  name: string
}

interface SocialIconDatabase {
  importNetwork: (iconImport: Network) => SocialIconDatabase
  importNetworks: (iconImport: Array<Network>) => SocialIconDatabase
}

declare const SocialIcon: FunctionComponent<SocialIconProps>
declare const SocialIconDatabase: SocialIconDatabase
declare function keyFor(url?: string): string
export { SocialIcon, SocialIconDatabase, SocialIconProps, Network, keyFor }
