import { describe, it } from 'vitest'
import {
  networkFor,
  getNetworks,
  register,
} from '../../src/react-social-icons.js'

describe('networkFor', () => {
  it('falsy values return default social network', ({ expect }) => {
    expect(networkFor()).toEqual('sharethis')
  })

  it('unknown values return default social network', ({ expect }) => {
    expect(networkFor('example.com')).toEqual('sharethis')
    expect(networkFor('abcdef')).toEqual('sharethis')
  })

  it("mailto URIs return the special 'mailto' network ", ({ expect }) => {
    expect(networkFor('mailto:doe@example.com')).toEqual('mailto')
  })

  it('getNetworks is an array of non zero length', ({ expect }) => {
    expect(getNetworks().length).toBeGreaterThan(0)
  })

  it("http URIs return 'network' social network", ({ expect }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`http://${network}.com`)).toEqual(network)
    })
  })

  it("https URIs return 'network' social network", ({ expect }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`https://${network}.com`)).toEqual(network)
    })
  })

  it("URIs without protocol return 'network' social network", ({ expect }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`${network}.com`)).toEqual(network)
    })
  })

  it("'network'.com/foo/bar URIs return 'network' social network", ({
    expect,
  }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`http://${network}.com/foo/bar`)).toEqual(network)
    })
  })

  it("'network'.com/foo.bar URIs return 'network' social network", ({
    expect,
  }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`http://${network}.com/foo.bar`)).toEqual(network)
    })
  })

  it("sub-domain.'network'.com URIs return 'network' social network", ({
    expect,
  }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`http://sub-domain.${network}.com`)).toEqual(network)
    })
  })

  it("www.'network'.com URIs return 'network' social network", ({ expect }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`www.${network}.com`)).toEqual(network)
    })
  })

  it('a dot in a network name should not be treated as a match for any character', ({
    expect,
  }) => {
    register('f.oo', { color: 'green', path: 'M0,0H64V64H0Z' })
    expect(networkFor('www.floo.com')).toEqual('sharethis')
  })

  it('network names are treated strictly as domain names', ({ expect }) => {
    register('x', { color: 'black', path: 'M0,0H64V64H0Z' })
    expect(networkFor('http://x.com')).toEqual('x')
    expect(networkFor('http://xx.com')).not.toEqual('x')
    expect(networkFor('http://xx.com')).toEqual('sharethis')
  })

  it('network names are treated strictly as domain names including sub-domains', ({
    expect,
  }) => {
    register('sub.y', { color: 'black', path: 'M0,0H64V64H0Z' })
    expect(networkFor('http://sub.y.com')).toEqual('sub.y')
    expect(networkFor('http://asub.y.com')).not.toEqual('sub.y')
    expect(networkFor('http://asub.y.com')).toEqual('sharethis')
  })
})
