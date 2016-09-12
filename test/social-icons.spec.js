/* global describe, it, beforeEach */

import 'should';
import React from 'react';
import Mask from '../src/mask';
import SocialIcon from '../src/social-icon';
import SocialIcons from '../src/social-icons';
import { mount } from 'enzyme';

describe('< SocialIcons />', () => {
  const urls = ['http://pinterest.com', 'http://tumblr.com', 'http://linkedin.com'];
  let socialIcons;
  beforeEach(() => {
    socialIcons = mount(<SocialIcons urls={[].concat(urls)} />);
  });

  it('takes urls prop', () => {
    socialIcons.props().urls.should.eql(urls);
  });

  it('renders an icon per url', () => {
    socialIcons.find(SocialIcon).length.should.eql(urls.length);
  });

  it('can append a className', () => {
    const className = 'birthday';
    socialIcons = mount(<SocialIcons className={className} />);
    const icons = socialIcons.find(SocialIcon);
    const regExp = new RegExp(`social-icon.*${className}`);
    icons.forEach((icon) => {
      icon.prop('className').should.match(regExp);
    });
  });

  it('can override color uniformly for each icon', () => {
    const color = 'pink';
    socialIcons = mount(<SocialIcons urls={urls} color={color} />);
    const masks = socialIcons.find(Mask);
    masks.forEach((icon) => {
      icon.find('g').prop('style').fill.should.eql(color);
    });
  });
});
