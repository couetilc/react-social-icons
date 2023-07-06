import React from 'react'
import ReactDOM from 'react-dom/client'
import { SocialIcon, getKeys } from '../../src/react-social-icons.js'
import * as Icons from '../../dist/icons'

// TODO can I add a button to toggle responsive styles? so that all icons grow and shrink to fit the width of the page without changing aspect ratio or layout? Would be a nice way with a wide screen to do a deep zoom, and be able to compare icons at different sizes. I'll make it a url parameter to so I can take snapshots of the fixed width, but enable the responsive option for development by default

function VisualTest(props) {
  const url = new URL(window.location.href)
  const highlighted = url.searchParams.get('network')
  const fixed_width = url.searchParams.get('fixed_width')

  return (
    <div>
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
        <label htmlFor="fixed_width">Fixed width: </label>
        <input
          name="fixed_width"
          type="checkbox"
          defaultChecked={fixed_width}
        />
        <br />
        <button>Submit</button>
      </form>

      {highlighted && <HighlightCase network={highlighted} />}

      {getKeys().map((network) => (
        <Case key={network} network={network} />
      ))}
    </div>
  )
}

function Case(props) {
  const { network } = props

  return (
    <section className={network}>
      <div className="sm">
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
      </div>
      <div className="lg">
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
        />
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
        />
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
        />
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
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
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
        <SocialIcon network={network} />
      </div>
      <div className="lg">
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
        />
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
        />
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
        />
        <SocialIcon
          network={network}
          style={{ height: '200px', width: '200px' }}
        />
      </div>
      <div className="xl">
        <SocialIcon
          network={network}
          style={{ height: '400px', width: '400px' }}
        />
      </div>
    </section>
  )
}

ReactDOM.createRoot(document.querySelector('#root')).render(<VisualTest />)
