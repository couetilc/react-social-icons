import React from 'react'
import ReactDOM from 'react-dom/client'
import { SocialIcon, getKeys } from '../../src/react-social-icons.js'
import * as Icons from '../../dist/icons'

function VisualTest(props) {
  return (
    <div>
      {getKeys().map((network) => (
        <Case network={network} />
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

ReactDOM.createRoot(document.querySelector('#root')).render(<VisualTest />)
