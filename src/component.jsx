import Background from './background.jsx'
import Icon from './icon.jsx'
import Mask from './mask.jsx'
import { keyFor, keyTo, DEFAULT_KEY } from './networks.js'
import { socialIcon, socialContainer, socialSvg } from './styles.js'

function getNetworkKey(props) {
  return props.network || keyFor(props.url)
}

function SocialIcon(props) {
  const {
    url, network, bgColor, fgColor, className, label, children, defaultSVG, style,
    ...rest
  } = props

  if (typeof defaultSVG === 'object' && defaultSVG !== null) {
    keyTo(DEFAULT_KEY, defaultSVG);
  }

  const networkKey = getNetworkKey({ url, network })

  return (
    <a
      href={url}
      className={'social-icon' + (className ? ' ' + className : '')}
      style={{ ...socialIcon, ...style }}
      aria-label={label || networkKey}
      {...rest}
    >
      <div className="social-container" style={socialContainer}>
        <svg className="social-svg" style={socialSvg} viewBox="0 0 64 64">
          <Background />
          <Icon networkKey={networkKey} fgColor={fgColor} />
          <Mask networkKey={networkKey} bgColor={bgColor} />
        </svg>
      </div>
      {children}
    </a>
  )
}

export { SocialIcon }
