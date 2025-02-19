import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  SocialIcon,
  getNetworks,
  social_icons,
} from '../../src/react-social-icons.js'
import * as Icons from '../../dist/icons'

function VisualTest(props) {
  const url = new URL(window.location.href)
  const highlighted = url.searchParams.get('network')
  const scale = url.searchParams.get('scale') || '1'
  const knobs = url.searchParams.get('knobs') !== 'false'
  const responsive = url.searchParams.get('responsive') !== 'false'

  const networks = getNetworks().sort((a, b) => a.localeCompare(b))

  return (
    <div
      data-responsive={responsive}
      style={{ '--icon-height': `calc(50px * ${scale})` }}
    >
      {knobs && (
        <form id="knobs" action="/">
          <label htmlFor="network">Select network to highlight: </label>
          <select name="network" defaultValue={highlighted}>
            <option value="">---</option>
            {networks.map((network) => (
              <option key={network} value={network}>
                {network}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="scale">Scale: </label>
          <input
            min="0"
            max="10"
            step=".01"
            name="scale"
            type="range"
            defaultValue={scale}
          />
          <br />
          <button>Submit</button>
          <a href="/">Reset</a>
        </form>
      )}

      {highlighted && <HighlightCase network={highlighted} />}

      <h2>Default Icons</h2>
      {networks.map((network) => (
        <Case key={network} network={network} />
      ))}

      <h2>Square Icons</h2>
      {networks.map((network) => (
        <SquareCase key={`square-${network}`} network={network} />
      ))}
    </div>
  )
}

function Case(props) {
  const { network } = props

  return (
    <section className={network}>
      <div className="sm">
        <SocialIcon network={network} style={sm} />
        <SocialIcon
          network={network}
          style={sm}
          fgColor={social_icons.get(network).color}
          bgColor="white"
        />
        <SocialIcon network={network} style={sm} fgColor="transparent" />
        <SocialIcon network={network} style={sm} bgColor="transparent" />
      </div>
      <div className="lg">
        <SocialIcon network={network} style={lg} />
        <SocialIcon
          network={network}
          style={lg}
          fgColor={social_icons.get(network).color}
          bgColor="white"
        />
        <SocialIcon network={network} style={lg} fgColor="transparent" />
        <SocialIcon network={network} style={lg} bgColor="transparent" />
      </div>
    </section>
  )
}

function HighlightCase(props) {
  const { network } = props

  return (
    <section className={`${network} highlight`}>
      <div className="sm">
        <SocialIcon network={network} style={sm} />
        <SocialIcon
          network={network}
          style={sm}
          fgColor={social_icons.get(network).color}
          bgColor="white"
        />
        <SocialIcon network={network} style={sm} fgColor="transparent" />
        <SocialIcon network={network} style={sm} bgColor="transparent" />
        <SocialIcon network={network} style={sm} />
        <SocialIcon
          network={network}
          style={sm}
          fgColor={social_icons.get(network).color}
          bgColor="white"
        />
        <SocialIcon network={network} style={sm} fgColor="transparent" />
        <SocialIcon network={network} style={sm} bgColor="transparent" />
      </div>
      <div className="lg">
        <SocialIcon network={network} style={lg} />
        <SocialIcon
          network={network}
          style={lg}
          fgColor={social_icons.get(network).color}
          bgColor="white"
        />
        <SocialIcon network={network} style={lg} fgColor="transparent" />
        <SocialIcon network={network} style={lg} bgColor="transparent" />
      </div>
      <div className="xl">
        <SocialIcon network={network} style={xl} />
      </div>
    </section>
  )
}

function SquareCase(props) {
  const { network } = props

  return (
    <section className={`${network} square`}>
      <div className="sm">
        <SocialIcon network={network} style={sm} isSquare />
        <SocialIcon
          network={network}
          style={sm}
          isSquare
          fgColor={social_icons.get(network).color}
          bgColor="white"
        />
        <SocialIcon
          network={network}
          style={sm}
          isSquare
          fgColor="transparent"
        />
        <SocialIcon
          network={network}
          style={sm}
          isSquare
          bgColor="transparent"
        />
      </div>
      <div className="lg">
        <SocialIcon network={network} style={lg} isSquare />
        <SocialIcon
          network={network}
          style={lg}
          isSquare
          fgColor={social_icons.get(network).color}
          bgColor="white"
        />
        <SocialIcon
          network={network}
          style={lg}
          isSquare
          fgColor="transparent"
        />
        <SocialIcon
          network={network}
          style={lg}
          isSquare
          bgColor="transparent"
        />
      </div>
    </section>
  )
}

const sm = { height: 'var(--icon-height)', width: 'var(--icon-height)' }
const lg = {
  height: 'calc(4 * var(--icon-height))',
  width: 'calc(4 * var(--icon-height))',
}
const xl = {
  height: 'calc(8 * var(--icon-height))',
  width: 'calc(8 * var(--icon-height))',
}

ReactDOM.createRoot(document.querySelector('#root')).render(<VisualTest />)
