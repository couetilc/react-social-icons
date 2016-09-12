import React, { PropTypes } from 'react';
import cx from 'classnames';
import Background from './background';
import Icon from './icon';
import Mask from './mask';
import { keyFor } from './networks';
import { socialIcon, socialContainer, socialSvg } from './styles';

function getNetworkKey(props) {
  return props.network || keyFor(props.url);
}

function SocialIcon(props) {
  const { url, network, color, className, ...rest } = props;
  const networkKey = getNetworkKey({ url, network });

  return (
    <a {...rest}
       href={url}
       target="_blank"
       className={cx('social-icon', className)}
       style={{ ...socialIcon, ...props.style }}>
      <div className="social-container" style={socialContainer} >
        <svg className="social-svg" style={socialSvg} viewBox="0 0 64 64">
          <Background />
          <Icon networkKey={networkKey} />
          <Mask networkKey={networkKey} color={color} />
        </svg>
      </div>
    </a>
  );
}

SocialIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  network: PropTypes.string,
  url: PropTypes.string,
};

export default SocialIcon;
