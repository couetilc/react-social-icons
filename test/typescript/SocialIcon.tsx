import * as React from 'react'
import {
  SocialIcon,
  getNetworks,
  networkFor,
  register,
} from '../../src/react-social-icons.js'

const SocialIconTest = () => (
  <>
    <SocialIcon
      url="https//example.com"
      href="https//example.com"
      bgColor="#000000"
      fgColor="#ffffff"
      label="social icon"
      network="example"
      fallback={{ path: '', color: '' }}
      defaultSVG={{ path: '', color: '' }}
      style={{ height: '100px', width: '100px' }}
      target="blank"
      rel="noreferrer"
      as="div"
      square
    />
    <SocialIcon
      // @ts-expect-error
      url={0}
      // @ts-expect-error
      href={0}
      // @ts-expect-error
      bgColor={null}
      // @ts-expect-error
      fgColor={null}
      // @ts-expect-error
      label={null}
      // @ts-expect-error
      network={null}
      // @ts-expect-error
      fallback={{ path: '' }}
      // @ts-expect-error
      defaultSVG={{ path: '' }}
      // @ts-expect-error
      style={null}
      // @ts-expect-error
      target={null}
      // @ts-expect-error
      rel={null}
      // @ts-expect-error
      as={null}
    />
    <SocialIcon>
      <div></div>
    </SocialIcon>

    <SocialIcon url="https://example.com" square={true} />
    {/* @ts-expect-error: square should be a boolean */}
    <SocialIcon url="https://example.com" square="true" />
  </>
)

getNetworks()
// @ts-expect-error
getNetworks('foo')

networkFor()
networkFor('https://twitter.com')
// @ts-expect-error
networkFor(1234)
// @ts-expect-error
networkFor(null)

register('mynetwork', { color: 'blue', path: 'M0,0' })
// @ts-expect-error
register()
// @ts-expect-error
register('mynetwork')

export default SocialIconTest
