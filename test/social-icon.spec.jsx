import React from 'react'
import { expect } from '@esm-bundle/chai';
import { iconFor, maskFor } from '../src/networks.js'
import { SocialIcon, keyFor, getKeys } from '../src/react-social-icons.js'
import { render, screen } from '@testing-library/react';

describe('<SocialIcon />', () => {
  const url = 'http://pinterest.com/'

  it('renders the anchor with the url', () => {
    render(<SocialIcon url={url} />);
    const node = screen.getByRole('link')
    expect(Array.from(node.classList)).to.include('social-icon')
    expect(node.href).to.equal(url);
  })

  it('renders child elements', () => {
    render(<SocialIcon><div data-testid="child" /></SocialIcon>);
    screen.getByTestId("child");
  });

  it('doesnt have a target prop', () => {
    render(<SocialIcon />);
    const node = screen.getByRole('link');
    expect(node.target).to.be.empty;
    expect(node.rel).to.be.empty;
  })

  it('can add a target and rel prop', () => {
    render(<SocialIcon target="_blank" rel="noopener noreferrer" />);
    const node = screen.getByRole('link');
    expect(node.target).to.equal('_blank');
    expect(node.rel).to.equal('noopener noreferrer');
  })

  it('renders the container', () => {
    const { container } = render(<SocialIcon />);
    const node = container.querySelector('.social-container');
    expect(node).to.exist;
  })

  it('renders the display svg', () => {
    render(<SocialIcon />);
    const node = screen.getByRole('img');
    expect(Array.from(node.classList)).to.include('social-svg');
  })

  it('adds an aria label to the svg', () => {
    render(<SocialIcon url={url} />);
    screen.getByLabelText('pinterest social icon');
  })

  it('renders a circle for the background', () => {
    const { container } = render(<SocialIcon />);
    const node = container.querySelector('svg circle')
    expect(node).to.exist;
    expect(Array.from(node.closest('g').classList)).to.include('social-svg-background');
  })

  it('renders an icon based on the url', () => {
    const { container } = render(<SocialIcon url={url} />);
    const node = container.querySelector('svg .social-svg-icon path');
    expect(node.getAttribute('d')).to.equal(iconFor('pinterest'));
  })

  it('renders a mask based on the url', () => {
    const { container } = render(<SocialIcon url={url} />);
    const node = container.querySelector('svg .social-svg-mask path');
    expect(node.getAttribute('d')).to.equal(maskFor('pinterest'));
  })

  it('takes a network prop for overriding default generated from url', () => {
    const { container } = render(<SocialIcon url={url} network="github" />);
    const node = container.querySelector('svg .social-svg-mask path');
    expect(node.getAttribute('d')).to.equal(maskFor('github'));
  })

  it('takes a bgColor prop for overriding default bgColor', () => {
    const bgColor = 'pink'
    const { container } = render(<SocialIcon url={url} bgColor={bgColor} />);
    const node = container.querySelector('svg .social-svg-mask');
    expect(window.getComputedStyle(node).fill).to.equal(bgColor);
  })

  it('takes a fgColor prop for overriding default transparent fgColor', () => {
    const fgColor = 'red'
    const { container } = render(<SocialIcon url={url} fgColor={fgColor} />);
    const node = container.querySelector('svg .social-svg-icon');
    expect(window.getComputedStyle(node).fill).to.equal(fgColor);
  })

  it('takes a defaultSVG prop for overriding the default network key', () => {
    const { container } = render(<SocialIcon url="https://example.com" defaultSVG={{
      icon: 'test-icon',
      mask: 'test-mask',
      color: 'test-color',
    }} />)
    expect(container.querySelector('svg .social-svg-icon path').getAttribute('d'))
      .to.equal('test-icon');
    expect(container.querySelector('svg .social-svg-mask path').getAttribute('d'))
      .to.equal('test-mask');
    expect(window.getComputedStyle(container.querySelector('svg .social-svg-mask')).fill)
      .to.equal('test-color');
  })

})

describe('keyFor', () => {
  it('exports keyFor function', () => {
    expect(keyFor('https://example.com')).to.equal('sharethis');
  });

  it('returns "default" for null', () => {
    expect(keyFor(null)).to.equal('sharethis');
  })

  it('returns "sharethis" for unknown network url', () => {
    expect(keyFor('unknownUrl.com')).to.equal('sharethis');
  })

  it('returns key for mailto:some email address', () => {
    expect(keyFor('mailto:email@address.com')).to.equal('mailto');
  })

  it('returns key for key.com address', () => {
    expect(getKeys().length).to.be.greaterThan(0);
    getKeys().forEach(k => {
      expect(keyFor(`http://${k}.com`)).to.equal(k);
    })
  })

  it('returns key for key.com/some/thing address', () => {
    expect(getKeys().length).to.be.greaterThan(0);
    getKeys().forEach(k => {
      const path = range(3).map(() => random(5,10)).map(randStr).join('/')
      expect(keyFor(`http://${k}.com/${path}`)).to.equal(k);
    })
  })

  it('returns key for key.com/some.thing address', () => {
    expect(getKeys().length).to.be.greaterThan(0);
    getKeys().forEach(k => {
      const path = range(3).map(() => random(5,10)).map(randStr).join('.')
      expect(keyFor(`http://${k}.com/${path}`)).to.equal(k);
    })
  })

  it('returns key for sub-domain.key.com address', () => {
    expect(getKeys().length).to.be.greaterThan(0);
    getKeys().forEach(k => {
      expect(keyFor(`http://sub-domain.${k}.com`)).to.equal(k);
    })
  })
})

function randStr(len) {
  const poss = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return range(len).reduce(str => str + poss.charAt(random(0, poss.length)), '')
}

function random(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function range(size) {
  return Array(Math.round(size)).fill(null)
}
