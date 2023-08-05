import { describe, it } from 'vitest'
import { networkFor, getNetworks } from '../../src/react-social-icons.js'

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

  it("'network'.com URIs return 'network' social network", ({ expect }) => {
    getNetworks().forEach((network) => {
      expect(networkFor(`http://${network}.com`)).toEqual(network)
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
})
