import PropTypes from 'prop-types'
import React from 'react'

import { colorFor, maskFor } from './networks.js'
import { socialSvgMask } from './styles.js'

function getStyle({ bgColor, networkKey }) {
  return {
    ...socialSvgMask,
    fill: bgColor || colorFor(networkKey)
  }
}

function Mask({ bgColor, networkKey, ...rest }) {
  return (
    <g
      {...rest}
      className="social-svg-mask"
      style={getStyle({ bgColor, networkKey })}
    >
      <path d={maskFor(networkKey)} />
    </g>
  )
}

Mask.propTypes = {
  bgColor: PropTypes.string,
  networkKey: PropTypes.string.isRequired
}

export default Mask
