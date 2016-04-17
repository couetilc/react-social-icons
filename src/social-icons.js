import React, { PropTypes } from 'react';
import SocialIcon from './social-icon';

function makeRenderIcon(color, className) {
  return function renderIcon(url, i) {
    return (
      <SocialIcon key={i} url={url} color={color} className={className} />
    );
  };
}

function SocialIcons({ urls, color, className, ...rest }) {
  return (
    <div {...rest} >
      {urls.map(makeRenderIcon(color, className))}
    </div>
  );
}

SocialIcons.defaultProps = {
  urls: [],
};

SocialIcons.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  urls: PropTypes.arrayOf(PropTypes.string),
};

export default SocialIcons;
