import React, { PropTypes } from 'react';
import { iconFor } from './networks';
import { socialSvgContent } from './styles.js';

function Icon(props) {
  return (
    <g {...props} className="social-svg-icon" style={socialSvgContent} >
      <path d={iconFor(props.networkKey)} />
    </g>
  );
}

Icon.propTypes = {
  networkKey: PropTypes.string.isRequired,
};

export default Icon;
