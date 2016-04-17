import React, { PropTypes } from 'react';
import { iconFor } from './networks';

function Icon(props) {
  return (
    <g {...props} className="social-svg-icon">
      <path d={iconFor(props.networkKey)} />
    </g>
  );
}

Icon.propTypes = {
  networkKey: PropTypes.string.isRequired,
};

export default Icon;
