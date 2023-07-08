import React from 'react'
import ReactDOM from 'react-dom/client'
import { SocialIcon, getKeys } from '../../src/react-social-icons.js'
import * as Icons from '../../dist/icons'

// TODO can I add a button to toggle responsive styles? so that all icons grow and shrink to fit the width of the page without changing aspect ratio or layout? Would be a nice way with a wide screen to do a deep zoom, and be able to compare icons at different sizes. I'll make it a url parameter to so I can take snapshots of the fixed width, but enable the responsive option for development by default

// TODO want to test normal, then flip fgColor and bgColor, then transparent fg, then transparent bg

function VisualTest(props) {
  const url = new URL(window.location.href)
  const highlighted = url.searchParams.get('network')
  const scale = url.searchParams.get('scale') || '1'

  return (
    <div style={{"--icon-height": `calc(50px * ${scale})`}}>
      <form action="/">
        <label htmlFor="network">Select network to highlight: </label>
        <select name="network" defaultValue={highlighted}>
          <option value="">---</option>
          {getKeys().map((network) => (
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
        <a href="/">
          Reset
        </a>
      </form>

      {highlighted && <HighlightCase network={highlighted} />}

      {getKeys().map((network) => ( <Case key={network} network={network} />))}
    </div>
  )
}

function Case(props) {
  const { network } = props

  return (
    <section className={network}>
      <div className="sm">
        <SocialIcon
          network={network}
          style={sm}
        />
        <SocialIcon
          network={network}
          style={sm}
        />
        <SocialIcon
          network={network}
          style={sm}
        />
        <SocialIcon
          network={network}
          style={sm}
        />
      </div>
      <div className="lg">
        <SocialIcon
          network={network}
          style={lg}
        />
        <SocialIcon
          network={network}
          style={lg}
        />
        <SocialIcon
          network={network}
          style={lg}
        />
        <SocialIcon
          network={network}
          style={lg}
        />
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
        <SocialIcon network={network} style={sm} />
        <SocialIcon network={network} style={sm} />
        <SocialIcon network={network} style={sm} />
        <SocialIcon network={network} style={sm} />
        <SocialIcon network={network} style={sm} />
        <SocialIcon network={network} style={sm} />
        <SocialIcon network={network} style={sm} />
      </div>
      <div className="lg">
        <SocialIcon
          network={network}
          style={lg}
        />
        <SocialIcon
          network={network}
          style={lg}
        />
        <SocialIcon
          network={network}
          style={lg}
        />
        <SocialIcon
          network={network}
          style={lg}
        />
      </div>
      <div className="xl">
        <SocialIcon
          network={network}
          style={xl}
        />
      </div>
    </section>
  )
}

const sm = {height: 'var(--icon-height)', width: 'var(--icon-height)'}
const lg = {height: 'calc(4 * var(--icon-height))', width: 'calc(4 * var(--icon-height))'}
const xl = {height: 'calc(8 * var(--icon-height))', width: 'calc(8 * var(--icon-height))'}

ReactDOM.createRoot(document.querySelector('#root')).render(<VisualTest />)
