import { keyFor, iconFor } from '../src/networks'
import { SocialIconDatabase } from '../src/social-icon-database'
import { facebook, mailto, github } from '../src/networks/all.js'
import should from 'should'

let networkKeys = []

describe('networks (lite)', () => {
  beforeEach(() => {
    SocialIconDatabase.importNetwork(facebook)
      .importNetwork(mailto)
      .importNetwork(github)
    networkKeys = Object.keys(SocialIconDatabase.networks)
  })
  describe('#keyFor', () => {
    it('returns "default" for null', () => {
      keyFor(null).should.eql('sharethis')
    })

    it('returns key for loaded network', () => {
      keyFor('http://github.com').should.eql('github')
      should.exist(iconFor('github'))
    })

    it('returns "default" for not loaded network', () => {
      keyFor('http://pinterest.com').should.eql('sharethis')
      should.not.exist(iconFor('sharethis'))
    })

    it('returns "sharethis" for unknown network url', () => {
      keyFor('unknownUrl.com').should.eql('sharethis')
    })

    it('returns key for mailto:some email address', () => {
      keyFor('mailto:email@address.com').should.eql('mailto')
    })

    it('returns key for key.com address', () => {
      networkKeys.length.should.be.greaterThan(0)
      networkKeys.forEach((k) => {
        keyFor(`http://${k}.com`).should.eql(k)
      })
    })

    it('returns key for key.com/some/thing address', () => {
      networkKeys.length.should.be.greaterThan(0)
      networkKeys.forEach((k) => {
        const path = range(3)
          .map(() => random(5, 10))
          .map(randStr)
          .join('/')
        keyFor(`http://${k}.com/${path}`).should.eql(k)
      })
    })

    it('returns key for key.com/some.thing address', () => {
      networkKeys.length.should.be.greaterThan(0)
      networkKeys.forEach((k) => {
        const path = range(3)
          .map(() => random(5, 10))
          .map(randStr)
          .join('.')
        keyFor(`http://${k}.com/${path}`).should.eql(k)
      })
    })

    it('returns key for sub-domain.key.com address', () => {
      networkKeys.length.should.be.greaterThan(0)
      networkKeys.forEach((k) => {
        keyFor(`http://sub-domain.${k}.com`).should.eql(k)
      })
    })
  })
})

function randStr(len) {
  const poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return range(len).reduce(
    (str) => str + poss.charAt(random(0, poss.length)),
    ''
  )
}

function random(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function range(size) {
  return Array(Math.round(size)).fill(null)
}
