import React from 'react'
import ReactDOM from 'react-dom'

import * as networks from '../src/networks.js'
import { SocialIcon } from '../src/react-social-icons.js'

const h = React.createElement

const lib = h(
  'div',
  {},
  networks.KEYS.map(k => h(SocialIcon, { network: k, title: k, key: k }))
)

const urlExample = h(SocialIcon, { url: 'http://linkedin.com/in/jaketrent' })

const networkExample = h(SocialIcon, {
  network: 'tumblr',
  url: 'http://jaketrent.com'
})

const colorExample = h(SocialIcon, { network: 'twitter', color: '#ff5a01' })

const labelExample = h(SocialIcon, {
  url: 'https://www.example.com',
  label: 'Our portfolio'
})

const sizes = h('div', {}, [
  h(SocialIcon, { network: 'pinterest', style: { height: 25, width: 25 } }),
  h(SocialIcon, { network: 'pinterest', style: { height: 50, width: 50 } }),
  h(SocialIcon, { network: 'pinterest', style: { height: 100, width: 100 } }),
  h(SocialIcon, { network: 'pinterest', style: { height: 200, width: 200 } })
])

ReactDOM.render(lib, document.getElementById('lib'))
ReactDOM.render(networkExample, document.getElementById('network-example'))
ReactDOM.render(urlExample, document.getElementById('url-example'))
ReactDOM.render(colorExample, document.getElementById('color-example'))
ReactDOM.render(labelExample, document.getElementById('label-example'))
ReactDOM.render(sizes, document.getElementById('sizes'))
