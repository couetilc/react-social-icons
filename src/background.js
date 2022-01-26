import React from 'react'

import { socialSvgContent } from './styles.js'

// eslint-disable-next-line react/prop-types
function Background({ networkKey, fgColor, ...props }) {
  return (
    <g
      {...props}
      className="social-svg-background"
      style={{ ...socialSvgContent, fill: fgColor || socialSvgContent.fill }}
    >
      <circle cx="32" cy="32" r="31" />
    </g>
  )
}

export default Background
