import React from 'react'
import ReactDOM from 'react-dom'
import * as networks from '../../src/networks'
import SocialIcon from '../../src/social-icon'

const lib = (
  <div>
    {networks.KEYS.map(k => <SocialIcon network={k} title={k} key={k} />)}
  </div>
)

const urlExample = <SocialIcon url="http://linkedin.com/in/jaketrent" />

const networkExample = (
  <SocialIcon network="tumblr" url="http://jaketrent.com" />
)

const colorExample = <SocialIcon network="twitter" color="#ff5a01" />

const labelExample = (
  <SocialIcon url="https://www.example.com" label="Our portfolio" />
)

const sizes = (
  <div>
    <SocialIcon network="pinterest" style={{ height: 25, width: 25 }} />
    <SocialIcon network="pinterest" style={{ height: 50, width: 50 }} />
    <SocialIcon network="pinterest" style={{ height: 100, width: 100 }} />
    <SocialIcon network="pinterest" style={{ height: 200, width: 200 }} />
  </div>
)

ReactDOM.render(lib, document.getElementById('lib'))
ReactDOM.render(networkExample, document.getElementById('network-example'))
ReactDOM.render(urlExample, document.getElementById('url-example'))
ReactDOM.render(colorExample, document.getElementById('color-example'))
ReactDOM.render(labelExample, document.getElementById('label-example'))
ReactDOM.render(sizes, document.getElementById('sizes'))
