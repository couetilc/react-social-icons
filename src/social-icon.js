import PropTypes from 'prop-types'
import React from 'react'

import Background from './background.js'
import Icon from './icon.js'
import Mask from './mask.js'
import { keyFor, keyTo, DEFAULT_KEY } from './networks.js'
import { socialIcon, socialContainer, socialSvg } from './styles.js'

function getNetworkKey(props) {
  return props.network || keyFor(props.url)
}

function SocialIcon(props) {
  const {
    url, network, bgColor, fgColor, className, label, children, defaultSVG,
    ...rest
  } = props

  if (typeof defaultSVG === 'object' && defaultSVG !== null) {
    keyTo(DEFAULT_KEY, defaultSVG);
  }

  const networkKey = getNetworkKey({ url, network })

  return (
    <a
      {...rest}
      href={url}
      className={'social-icon' + (!!className ? ' ' + className : '')}
      style={{ ...socialIcon, ...props.style }}
      aria-label={label || networkKey}
    >
      <div className="social-container" style={socialContainer}>
        <svg className="social-svg" style={socialSvg} viewBox="0 0 64 64">
          <Background />
          <Icon networkKey={networkKey} fgColor={fgColor} />
          <Mask networkKey={networkKey} bgColor={bgColor} />
        </svg>
      </div>
      {children}
    </a>
  )
}

SocialIcon.propTypes = {
  className: PropTypes.string,
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  label: PropTypes.string,
  network: PropTypes.string,
  url: PropTypes.string,
  defaultSVG: PropTypes.exact({
    icon: PropTypes.string,
    mask: PropTypes.string,
    color: PropTypes.string,
  }),
  children: PropTypes.node,
}

export default SocialIcon
