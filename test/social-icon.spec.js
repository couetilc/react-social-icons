/* global describe, it, beforeEach */

import 'should';
import React from 'react';
import { iconFor, maskFor } from '../lib/networks';
import Icon from '../lib/icon';
import Mask from '../lib/mask';
import SocialIcon from '../lib/social-icon';
import Background from '../lib/background';
import { shallow } from 'enzyme';

describe('<SocialIcon />', () => {
  const url = 'http://pinterest.com';
  let socialIcon;
  beforeEach(() => {
    socialIcon = shallow(<SocialIcon url={url} />);
  });

  it('takes a url prop', () => {
    socialIcon.props().url.should.eql(url);
  });

  it('renders the anchor with the url', () => {
    const a = socialIcon.find('a');
    a.length.should.eql(1);
    a.hasClass('social-icon').should.eql(true);
    a.props().href.should.eql(url);
  });

  it('renders the container', () => {
    socialIcon.find('.social-container').length.should.eql(1);
  });

  it('renders the display svg', () => {
    socialIcon.find('.social-svg').length.should.eql(1);
  });

  it('renders a circle for the background', () => {
    socialIcon.find('social-svg-background').length.should.eql(0);
    socialIcon.find(Background).length.should.eql(1);
    socialIcon.find(Background).shallow().find('circle').length.should.eql(1);
  });

  it('renders an icon based on the url', () => {
    const path = socialIcon.find(Icon).shallow().find('path');
    path.prop('d').should.eql(iconFor('pinterest'));
  });

  it('renders a mask based on the url', () => {
    const mask = socialIcon.find(Mask).shallow().find('path');
    mask.prop('d').should.eql(maskFor('pinterest'));
  });

  it('takes a network prop for overriding default generated from url', () => {
    socialIcon = shallow(<SocialIcon url={url} network="github" />);
    const mask = socialIcon.find(Mask).shallow().find('path');
    mask.prop('d').should.eql(maskFor('github'));
  });

  it('takes a color prop for overriding default color', () => {
    const color = 'pink';
    socialIcon = shallow(<SocialIcon color={color} network="github" />);
    const mask = socialIcon.find(Mask).shallow().find('.social-svg-mask');
    mask.prop('style').fill.should.eql(color);
  });
});
