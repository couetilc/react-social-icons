import React from 'react'
import { iconFor, maskFor } from '../src/networks'
import Icon from '../src/icon'
import Mask from '../src/mask'
import { SocialIcon, keyFor } from '../src/react-social-icons-lite.js'
import { SocialIconDatabase } from '../src/social-icon-database'
import { facebook, mailto, github, pinterest } from '../src/networks/all.js'
import Background from '../src/background'
import { shallow } from 'enzyme'

describe('<SocialIcon /> (lite)', () => {
  const url = 'http://pinterest.com'
  let socialIcon
  beforeEach(() => {
    SocialIconDatabase.importNetwork(facebook)
      .importNetwork(mailto)
      .importNetwork(github)
      .importNetwork(pinterest)
    socialIcon = shallow(<SocialIcon url={url} />)
  })

  it('takes a url prop', () => {
    socialIcon.props().href.should.eql(url)
  })

  it('renders the anchor with the url', () => {
    const a = socialIcon.find('a')
    a.length.should.eql(1)
    a.hasClass('social-icon').should.eql(true)
    a.props().href.should.eql(url)
  })

  it('renders child elements', () => {
    socialIcon = shallow(
      <SocialIcon url={url}>
        <div id="test" />
      </SocialIcon>
    )
    socialIcon.contains(<div id="test" />).should.equal(true)
  })

  it('doesnt have a target prop', () => {
    const a = socialIcon.find('a')
    a.props().should.not.have.property('target')
    a.props().should.not.have.property('rel')
  })

  it('can add a target prop', () => {
    const a = shallow(
      <SocialIcon url={url} target="_blank" rel="noopener noreferrer" />
    ).find('a')
    a.props().target.should.eql('_blank')
    a.props().rel.should.eql('noopener noreferrer')
  })

  it('renders the container', () => {
    socialIcon.find('.social-container').length.should.eql(1)
  })

  it('renders the display svg', () => {
    socialIcon.find('.social-svg').length.should.eql(1)
  })

  it('renders a circle for the background', () => {
    socialIcon.find('social-svg-background').length.should.eql(0)
    socialIcon.find(Background).length.should.eql(1)
    socialIcon.find(Background).shallow().find('circle').length.should.eql(1)
  })

  it('renders an icon based on the url', () => {
    const path = socialIcon.find(Icon).shallow().find('path')
    path.prop('d').should.eql(iconFor('pinterest'))
  })

  it('renders the default link when network was not imported', () => {
    const url = 'https://www.twitch.com'
    socialIcon = shallow(
      <SocialIcon url={url}>
        <div id="test" />
      </SocialIcon>
    )
    socialIcon.prop('href').should.eql(url)
    socialIcon.contains(<div id="test" />).should.eql(true)
    socialIcon.find(Icon).shallow().contains('path').should.eql(false)
  })

  it('renders a mask based on the url', () => {
    const mask = socialIcon.find(Mask).shallow().find('path')
    mask.prop('d').should.eql(maskFor('pinterest'))
  })

  it('takes a network prop for overriding default generated from url', () => {
    socialIcon = shallow(<SocialIcon url={url} network="github" />)
    const mask = socialIcon.find(Mask).shallow().find('path')
    mask.prop('d').should.eql(maskFor('github'))
  })

  it('takes a bgColor prop for overriding default bgColor', () => {
    const bgColor = 'pink'
    socialIcon = shallow(<SocialIcon bgColor={bgColor} network="github" />)
    const mask = socialIcon.find(Mask).shallow().find('.social-svg-mask')
    mask.prop('style').fill.should.eql(bgColor)
  })

  it('takes a fgColor prop for overriding default transparent fgColor', () => {
    const fgColor = 'red'
    socialIcon = shallow(<SocialIcon fgColor={fgColor} network="github" />)
    const icon = socialIcon.find(Icon).shallow().find('.social-svg-icon')
    icon.prop('style').fill.should.eql(fgColor)
  })

  it('takes a defaultSVG prop for overriding the default network key', () => {
    socialIcon = shallow(
      <SocialIcon
        url="https://example.com"
        defaultSVG={{
          icon: 'test-icon',
          mask: 'test-mask',
          color: 'test-color',
        }}
      />
    )
    const iconPath = socialIcon.find(Icon).shallow().find('path')
    iconPath.prop('d').should.eql('test-icon')
    const maskPath = socialIcon.find(Mask).shallow().find('path')
    maskPath.prop('d').should.eql('test-mask')
    const mask = socialIcon.find(Mask).shallow().find('.social-svg-mask')
    mask.prop('style').fill.should.eql('test-color')
  })
})

describe('keyFor', () => {
  it('exports keyFor function', () => {
    keyFor('https://example.com').should.eql('sharethis')
  })
})
