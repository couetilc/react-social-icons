import * as React from 'react'

const default_key = 'sharethis'

const social_icon = {
  display: 'inline-block',
  width: '50px',
  height: '50px',
  position: 'relative',
  overflow: 'hidden',
  verticalAlign: 'middle',
}

const social_container = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
}

const social_svg = {
  borderRadius: '50%',
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  fillRule: 'evenodd',
}

const social_svg_g = {
  transition: 'fill 170ms ease-in-out',
  fill: 'transparent',
}

const makeUriRegex = (socials = []) =>
  new RegExp(
    '(?:https?:\\/\\/(?:[a-z0-9-])?)?($SOCIALS)[.]'.replace(
      '$SOCIALS',
      socials.join('|')
    ),
    'u'
  )

export const social_icons = new Map()
export const network_names = new Set()
export let uri_regex = makeUriRegex()

export function register(social, icon) {
  social_icons.set(social, icon)
  network_names.add(social)
  uri_regex = makeUriRegex(
    // sort by longest string first
    [...network_names].sort((pre, post) => post.length - pre.length)
  )
  return icon
}

export function networkFor(url) {
  if (!url) {
    return default_key
  }

  if (url.startsWith('mailto:')) {
    return 'mailto'
  }

  return url.match(uri_regex)?.[1] || default_key
}

export const SocialIcon = React.forwardRef(function SocialIcon(props, ref) {
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
    fallback,
    defaultSVG,
    ...rest
  } = props

  const networkKey = network || networkFor(url)
  const ariaLabel = label || props['aria-label'] || networkKey

  const fallbackIcon =
    (typeof fallback === 'string'
      ? social_icons.get(fallback)
      : fallback || defaultSVG) || social_icons.get(default_key)

  const { icon, mask, color } =
    networkKey === default_key
      ? fallbackIcon
      : social_icons.get(networkKey) || {}

  return React.createElement(
    as,
    {
      href: href || url,
      className: `social-icon${className ? ` ${className}` : ''}`,
      ...rest,
      style: { ...social_icon, ...rest.style },
      'aria-label': ariaLabel,
      ref,
    },
    <div className="social-container" style={social_container}>
      <svg
        role="img"
        aria-label={`${ariaLabel} social icon`}
        className="social-svg"
        viewBox="0 0 64 64"
        style={social_svg}
      >
        <g className="social-svg-background" style={social_svg_g}>
          <circle cx="32" cy="32" r="31" />
        </g>

        <g
          className="social-svg-icon"
          style={{
            ...social_svg_g,
            fill: fgColor || 'white',
          }}
        >
          <path d={icon} />
        </g>

        <g
          className="social-svg-mask"
          style={{
            ...social_svg_g,
            fill: bgColor || color,
          }}
        >
          <path d={mask} />
        </g>
      </svg>
    </div>,
    children
  )
})
