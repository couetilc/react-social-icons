import React from 'react'
import { iconFor, maskFor } from '../src/networks'
import Icon from '../src/icon'
import Mask from '../src/mask'
import SocialIcon from '../src/social-icon'
import Background from '../src/background'
import { shallow } from 'enzyme'
import should from 'should'

describe('<SocialIcon />', () => {
  describe('with url', () => {
    const url = 'http://pinterest.com'
    let socialIcon
    beforeEach(() => {
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
      socialIcon
        .find(Background)
        .shallow()
        .find('circle')
        .length.should.eql(1)
    })
  
    it('renders an icon based on the url', () => {
      const path = socialIcon
        .find(Icon)
        .shallow()
        .find('path')
      path.prop('d').should.eql(iconFor('pinterest'))
    })
  
    it('renders a mask based on the url', () => {
      const mask = socialIcon
        .find(Mask)
        .shallow()
        .find('path')
      mask.prop('d').should.eql(maskFor('pinterest'))
    })
  
    it('takes a network prop for overriding default generated from url', () => {
      socialIcon = shallow(<SocialIcon url={url} network="github" />)
      const mask = socialIcon
        .find(Mask)
        .shallow()
        .find('path')
      mask.prop('d').should.eql(maskFor('github'))
    })
  
    it('takes a bgColor prop for overriding default bgColor', () => {
      const bgColor = 'pink'
      socialIcon = shallow(<SocialIcon bgColor={bgColor} network="github" />)
      const mask = socialIcon
        .find(Mask)
        .shallow()
        .find('.social-svg-mask')
      mask.prop('style').fill.should.eql(bgColor)
    })
  
    it('takes a fgColor prop for overriding default transparent fgColor', () => {
      const fgColor = 'red'
      socialIcon = shallow(<SocialIcon fgColor={fgColor} network="github" />)
      const icon = socialIcon
        .find(Icon)
        .shallow()
        .find('.social-svg-icon')
      icon.prop('style').fill.should.eql(fgColor)
    })
  })

  describe('without url', () => {
    const network = 'pinterest'
    let socialIcon
    beforeEach(() => {
      socialIcon = shallow(<SocialIcon network={network} />)
    })
  
    it('no url prop', () => {
      should.not.exist(socialIcon.props().href)
    })
  
    it('renders the div with the network', () => {
      socialIcon.is('[aria-label="pinterest"]').should.eql(true)
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
      socialIcon
        .find(Background)
        .shallow()
        .find('circle')
        .length.should.eql(1)
    })
  
    it('renders an icon based on the url', () => {
      const path = socialIcon
        .find(Icon)
        .shallow()
        .find('path')
      path.prop('d').should.eql(iconFor('pinterest'))
    })
  
    it('renders a mask based on the url', () => {
      const mask = socialIcon
        .find(Mask)
        .shallow()
        .find('path')
      mask.prop('d').should.eql(maskFor('pinterest'))
    })
  
    it('takes a bgColor prop for overriding default bgColor', () => {
      const bgColor = 'pink'
      socialIcon = shallow(<SocialIcon bgColor={bgColor} network="github" />)
      const mask = socialIcon
        .find(Mask)
        .shallow()
        .find('.social-svg-mask')
      mask.prop('style').fill.should.eql(bgColor)
    })
  
    it('takes a fgColor prop for overriding default transparent fgColor', () => {
      const fgColor = 'red'
      socialIcon = shallow(<SocialIcon fgColor={fgColor} network="github" />)
      const icon = socialIcon
        .find(Icon)
        .shallow()
        .find('.social-svg-icon')
      icon.prop('style').fill.should.eql(fgColor)
    })
  })
})
