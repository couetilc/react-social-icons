import PropTypes from 'prop-types'
import React from 'react'

import Background from './background.js'
import Icon from './icon.js'
import Mask from './mask.js'
import { keyFor } from './networks.js'
import { socialIcon, socialContainer, socialSvg } from './styles.js'

function getNetworkKey(props) {
  return props.network || keyFor(props.url)
}

function SocialIcon(props) {
  const { url, network, bgColor, fgColor, className, label, ...rest } = props
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
    </a>
  )
}

SocialIcon.propTypes = {
  className: PropTypes.string,
  bgColor: PropTypes.string,
  label: PropTypes.string,
  network: PropTypes.string,
  url: PropTypes.string
}

export default SocialIcon
