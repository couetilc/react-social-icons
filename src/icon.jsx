import React from 'react';
import { iconFor } from './networks.js'
import { socialSvgContent } from './styles.js'

function getStyle({ fgColor }) {
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

export default Icon
