import PropTypes from 'prop-types'
import React from 'react'
import { iconFor } from './networks.js'
import { socialSvgContent } from './styles.js'

function getStyle({ fgColor, networkKey }) {
  return {
    ...socialSvgContent,
    fill: fgColor || 'transparent'
  }
}

function Icon({ fgColor, networkKey, ...props }) {
  return (
    <g {...props} className="social-svg-icon" style={getStyle({ fgColor })}>
      <path d={iconFor(networkKey)} />
    </g>
  )
}

Icon.propTypes = {
  fgColor: PropTypes.string,
  networkKey: PropTypes.string.isRequired
}

export default Icon
