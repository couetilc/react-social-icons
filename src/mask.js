import React, { PropTypes } from 'react';
import { colorFor, maskFor } from './networks';
import { socialSvgMask } from './styles.js';

function getStyle({ color, networkKey }) {
  return {
    ...socialSvgMask,
    fill: color || colorFor(networkKey),
  };
}

function Mask({ color, networkKey, ...rest }) {
  return (
    <g {...rest} className="social-svg-mask" style={getStyle({ color, networkKey })}>
      <path d={maskFor(networkKey)} />
    </g>
  );
}

Mask.propTypes = {
  color: PropTypes.string,
  networkKey: PropTypes.string.isRequired,
};

export default Mask;
