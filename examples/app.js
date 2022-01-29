import React from 'react'
import ReactDOM from 'react-dom'

import * as networks from '../src/networks.js'
import { SocialIcon } from '../src/react-share-social-icons.js'

function Page() {
  return (
    <>
      <div id="lib">
        {networks.KEYS.map((k) => (
          <SocialIcon network={k} title={k} key={k} />
        ))}
      </div>
    </>
  )
}

ReactDOM.render(<Page />, document.getElementById('page'))
