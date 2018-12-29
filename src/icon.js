import PropTypes from 'prop-types'
import React from 'react'
import { iconFor } from './networks'
import { socialSvgContent } from './styles.js'

function Icon({ networkKey, ...props }) {
  return (
    <g {...props} className="social-svg-icon" style={socialSvgContent}>
      <path d={iconFor(networkKey)} />
    </g>
  )
}

Icon.propTypes = {
  networkKey: PropTypes.string.isRequired
}

export default Icon
