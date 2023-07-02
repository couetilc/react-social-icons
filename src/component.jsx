import * as React from 'react'

const DEFAULT_KEY = 'sharethis'

const makeUriRegex = (socials = []) => new RegExp(
  '(?:https?:\\/\\/(?:[a-z0-9-]*.)?)?($SOCIALS).*'
    .replace('$SOCIALS', socials.join('|')),
  'u',
)

const social_icons = new Map()
const network_names = new Set()
let uri_regex = makeUriRegex()

function register(social, icon) {
  social_icons.set(social, icon)
  network_names.add(social)
  uri_regex = makeUriRegex(
    // sort by longest string first
    [ ...network_names ].sort((pre, post) => post.length - pre.length)
  )
}

function keyFor(url) {
  if (!url) {
    return DEFAULT_KEY
  }

  return url.match(uri_regex)?.[1] || DEFAULT_KEY
}

const SocialIcon = (props) => {

  const {
    as = 'a',
    href,
    url,
    network,
    bgColor,
    fgColor,
    className,
    label,
    children,
    defaultSVG = social_icons.get(DEFAULT_KEY),
    ...rest
  } = props

  const networkKey = network || keyFor(url)

  const { icon, mask, color, } = networkKey === DEFAULT_KEY && defaultSVG || social_icons.get(networkKey) || {}

  return (
    React.createElement(as,
      { href: href || url,
        className: `social-icon${className ? ` ${className}` : ''}`,
        'aria-label': label || networkKey,
        style: social_icon,
        ...rest
      }, 
      <div className='social-container' style={social_container}>
        <svg
          role='img'
          aria-label={`${networkKey} social icon`}
          className='social-svg'
          viewBox='0 0 64 64'
          style={social_svg}
        >

          <g className='social-svg-background' style={social_svg_g}>
            <circle cx='32' cy='32' r='31' />
          </g>

          <g className='social-svg-icon' style={{
            ...social_svg_g,
            fill: fgColor,
          }}>
            <path d={icon} />
          </g>

          <g className='social-svg-mask' style={{
            ...social_svg_g,
            fill: bgColor || color
          }}>
            <path d={mask} />
          </g>
        </svg>
      </div>,
      children,
    )
  )
}

const social_icon  = {
  display: 'inline-block', width: '50px', height: '50px',
  position: 'relative', overflow: 'hidden', verticalAlign: 'middle',
}

const social_container = {
  position: 'absolute', top: '0', left: '0', width: '100%', height: '100',
}

const social_svg = {
  borderRadius: '50%', position: 'absolute', top: '0', left: '0', width: '100%',
  height: '100%', fillRule: 'evenodd',
}

const social_svg_g = {
  msTransition: 'fill 170ms ease-in-out',
  OTransition: 'fill 170ms ease-in-out',
  MozTransition: 'fill 170ms ease-in-out',
  WebkitTransition: 'fill 170ms ease-in-out',
  transition: 'fill 170ms ease-in-out',
  fill: 'transparent',
}

export {
  SocialIcon,
  keyFor,
  register,
  social_icons,
  network_names,
  uri_regex,
}
