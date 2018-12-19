import React from 'react';
import { socialSvgContent } from './styles.js';

function getStyle({ color, networkKey }) {
  return {
    ...socialSvgContent,
    fill: color || 'transparent',
  };
}

// eslint-disable-next-line no-unused-vars, react/prop-types
function Background({ color, networkKey, ...props }) {
  return (
    <g {...props} className="social-svg-background" style={getStyle({ color, networkKey })} >
      <circle cx="32" cy="32" r="31" />
    </g>
  );
}

Background.propTypes = {
  color: PropTypes.string,
};

export default Background;
