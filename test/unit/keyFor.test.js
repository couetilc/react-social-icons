import { describe, it } from 'vitest'
import { keyFor, getKeys } from '../../src/react-social-icons.js'

describe('keyFor', () => {
  it('falsy values return default social network', ({ expect }) => {
    expect(keyFor()).toEqual('sharethis')
  })

  it('unknown values return default social network', ({ expect }) => {
    expect(keyFor('example.com')).toEqual('sharethis')
    expect(keyFor('abcdef')).toEqual('sharethis')
  })

  it("mailto URIs return the special 'mailto' network ", ({ expect }) => {
    expect(keyFor('mailto:doe@example.com')).toEqual('mailto')
  })

  it('getKeys is an array of non zero length', ({ expect }) => {
    expect(getKeys().length).toBeGreaterThan(0)
  })

  it("'key'.com URIs return 'key' social network", ({ expect }) => {
    getKeys().forEach((key) => {
      expect(keyFor(`http://${key}.com`)).toEqual(key)
    })
  })

  it("'key'.com/foo/bar URIs return 'key' social network", ({ expect }) => {
    getKeys().forEach((key) => {
      expect(keyFor(`http://${key}.com/foo/bar`)).toEqual(key)
    })
  })

  it("'key'.com/foo.bar URIs return 'key' social network", ({ expect }) => {
    getKeys().forEach((key) => {
      expect(keyFor(`http://${key}.com/foo.bar`)).toEqual(key)
    })
  })

  it("sub-domain.'key'.com URIs return 'key' social network", ({ expect }) => {
    getKeys().forEach((key) => {
      expect(keyFor(`http://sub-domain.${key}.com`)).toEqual(key)
    })
  })

  it("www.'key'.com URIs return 'key' social network", ({ expect }) => {
    getKeys().forEach((key) => {
      expect(keyFor(`www.${key}.com`)).toEqual(key)
    })
  })
})
