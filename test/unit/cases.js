import React from 'react'
import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import sharethis from '../../db/sharethis.json'
import github from '../../db/github.json'
import pinterest from '../../db/pinterest.json'

const pinterest_url = 'http://pinterest.com'
const pinterest_mask = pinterest.mask || ''
const pinterest_icon = pinterest.icon || ''
const github_mask = github.mask || ''
const default_icon = sharethis

const link = () => screen.getByRole('link')
const container = () => link().children[0]
const svg = () => screen.getByRole('img')
const background = () => svg().children[0]
const icon = () => svg().children[1]
const mask = () => svg().children[2]
const icon_path = () => icon().children[0]
const mask_path = () => mask().children[0]

export const cases = (SocialIcon) =>
  describe('<SocialIcon />', () => {
    it('adds correct url to anchor', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} />)
      expect(link()).toHaveAttribute('href', pinterest_url)
    })

    it('adds correct class to anchor', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} />)
      expect(link()).toHaveAttribute('class', 'social-icon')
    })

    it('includes child elements within anchor', ({ expect }) => {
      render(
        <SocialIcon url={pinterest_url}>
          <div>child</div>
        </SocialIcon>
      )
      expect(link()).toHaveTextContent('child')
    })

    it('adds target attribute to anchor', ({ expect }) => {
      render(<SocialIcon target="_blank" data-testid />)
      expect(screen.getByTestId(true)).toHaveAttribute('target', '_blank')
    })

    it('adds rel attribute to anchor', ({ expect }) => {
      render(<SocialIcon rel="noopener noreferrer" data-testid />)
      expect(screen.getByTestId(true)).toHaveAttribute(
        'rel',
        'noopener noreferrer'
      )
    })

    it('adds aria label to anchor by default', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} />)
      expect(link()).toHaveAttribute('aria-label', 'pinterest')
    })

    it('overrides aria label on anchor with prop `label`', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} label="override" />)
      expect(link()).toHaveAttribute('aria-label', 'override')
    })

    it('overrides aria label on anchor with prop `aria-label`', ({
      expect,
    }) => {
      render(<SocialIcon url={pinterest_url} aria-label="override" />)
      expect(link()).toHaveAttribute('aria-label', 'override')
    })

    it('overrides aria label on anchor with correct order', ({ expect }) => {
      render(
        <SocialIcon url={pinterest_url} label="override" aria-label="aria" />
      )
      expect(link()).toHaveAttribute('aria-label', 'override')
    })

    it('adds an aria label to social svg', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} />)
      expect(svg()).toHaveAttribute('aria-label', 'pinterest social icon')
    })

    it('matches social provider to icon path', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} />)
      expect(icon_path()).toHaveAttribute('d', pinterest_icon)
    })

    it('matches social provider to mask path', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} />)
      expect(mask_path()).toHaveAttribute('d', pinterest_mask)
    })

    it('overrides network shown in anchor', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} network="github" />)
      expect(mask_path()).toHaveAttribute('d', github_mask)
    })

    it('override bgColor of social svg', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} bgColor="rgb(10, 10, 10)" />)
      expect(mask()).toHaveStyle('fill: rgb(10, 10, 10)')
    })

    it('override fgColor of social svg', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} fgColor="rgb(200, 200, 200)" />)
      expect(icon()).toHaveStyle('fill: rgb(200, 200, 200)')
    })

    it('override fallback icon for social svg with an object', ({ expect }) => {
      render(
        <SocialIcon
          url="https://example.com"
          fallback={{
            icon: 'test-icon',
            mask: 'test-mask',
            color: 'rgb(254,254,254)',
          }}
        />
      )
      expect(icon_path()).toHaveAttribute('d', 'test-icon')
      expect(mask_path()).toHaveAttribute('d', 'test-mask')
      expect(mask()).toHaveStyle('fill: rgb(254,254,254)')
    })

    it('override fallback icon for social svg with a network', ({ expect }) => {
      render(<SocialIcon url="https://example.com" fallback="pinterest" />)
      expect(icon_path()).toHaveAttribute('d', pinterest_icon)
      expect(mask_path()).toHaveAttribute('d', pinterest_mask)
      expect(mask()).toHaveStyle(`fill: ${pinterest.color}`)
    })

    it('[deprecated] override default icon for social svg', ({ expect }) => {
      render(
        <SocialIcon
          url="https://example.com"
          defaultSVG={{
            icon: 'test-icon',
            mask: 'test-mask',
            color: 'rgb(254,254,254)',
          }}
        />
      )
      expect(icon_path()).toHaveAttribute('d', 'test-icon')
      expect(mask_path()).toHaveAttribute('d', 'test-mask')
      expect(mask()).toHaveStyle('fill: rgb(254,254,254)')
    })

    it('allows for separate default icon overrides for social svg instances', ({
      expect,
    }) => {
      // an issue came up where set the fallback icon for one social icon would
      // set the fallback for all other icons on the page. It was a bug where
      // specifying a fallback icon would mutate a shared module-scope variable,
      // affecting all other social icons' fallback icons. Basically, rendering
      // a component had a side effect which is a no no in React. This test
      // checks to make sure that particular issue won't pop up again.

      const { rerender } = render(
        <SocialIcon
          url="https://example.com"
          fallback={{
            icon: 'test-fallback-icon',
            mask: 'test-fallback-mask',
            color: 'rgb(0,0,0)',
          }}
        />
      )

      expect(icon_path()).toHaveAttribute('d', 'test-fallback-icon')
      expect(mask_path()).toHaveAttribute('d', 'test-fallback-mask')
      expect(mask()).toHaveStyle('fill: rgb(0,0,0)')

      // relies on rendering the default icon from the library
      rerender(<SocialIcon url="https://example.com" />)

      expect(icon_path()).toHaveAttribute('d', default_icon.icon)
      expect(mask_path()).toHaveAttribute('d', default_icon.mask)
      expect(mask()).toHaveStyle(`fill: ${default_icon.color}`)
    })

    it('adds img role to social svg', ({ expect }) => {
      render(<SocialIcon />)
      expect(svg()).toHaveAttribute('role', 'img')
    })

    it('adds class to background path within svg', ({ expect }) => {
      render(<SocialIcon />)
      expect(background()).toHaveAttribute('class', 'social-svg-background')
    })

    it('adds class to icon path within svg', ({ expect }) => {
      render(<SocialIcon />)
      expect(icon()).toHaveAttribute('class', 'social-svg-icon')
    })

    it('adds class to mask path within svg', ({ expect }) => {
      render(<SocialIcon />)
      expect(mask()).toHaveAttribute('class', 'social-svg-mask')
    })

    it('stylesheet styles are applied to the component', ({ expect }) => {
      render(<SocialIcon url={pinterest_url} />)
      expect(link()).toHaveStyle('width: 50px')
      expect(link()).toHaveStyle('height: 50px')
      expect(svg()).toHaveAttribute('viewBox', '0 0 64 64')
    })

    it("href prop sets anchor's href attribute", ({ expect }) => {
      render(<SocialIcon href={pinterest_url} />)
      expect(link()).toHaveAttribute('href', pinterest_url)
    })

    it("href precedes url to set anchor's href attribute", ({ expect }) => {
      render(<SocialIcon href={pinterest_url} url="www.vimeo.com" />)
      expect(link()).toHaveAttribute('href', pinterest_url)
    })

    it("href prop does not set icon's network", ({ expect }) => {
      render(<SocialIcon href={pinterest_url} url="www.github.com" />)
      expect(mask_path()).toHaveAttribute('d', github_mask)
    })

    it('href prop is undefined when neither url nor href props are present', ({
      expect,
    }) => {
      render(<SocialIcon data-testid />)
      expect(screen.getByTestId(true)).not.toHaveAttribute('href')
    })

    it('"as" prop will override <SocialIcon> element type', ({ expect }) => {
      render(<SocialIcon as="label" />)
      expect(screen.getByLabelText('sharethis')).toHaveAttribute(
        'class',
        'social-icon'
      )
    })

    it('renders children', ({ expect }) => {
      render(
        <SocialIcon data-testid>
          <div id="test" />
        </SocialIcon>
      )
      expect(screen.getByTestId(true).children[1]).toHaveAttribute('id', 'test')
    })

    it('forwards refs', ({ expect }) => {
      const ref = React.createRef()
      render(<SocialIcon ref={ref}></SocialIcon>)
      expect(ref.current).not.to.equal(null)
      expect(ref.current).to.be.an.instanceof(HTMLElement)
    })

    it('fgColor defaults to white', ({ expect }) => {
      render(<SocialIcon url="http://example.com" />)
      expect(icon()).toHaveStyle('fill: white;')
    })

    it('has correct styles', ({ expect }) => {
      render(<SocialIcon url="http://example.com" />)
      expect(link()).toHaveStyle(`
        display: inline-block;
        width: 50px;
        height: 50px;
        position: relative;
        overflow: hidden;
        vertical-align: middle;
      `)
      expect(container()).toHaveStyle(`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      `)
      expect(svg()).toHaveStyle(`
        borderRadius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        fillRule: evenodd;
      `)
      const g_styles = `
        transition: fill 170ms ease-in-out;
        fill: transparent;
      `
      expect(icon()).toHaveStyle(g_styles.replace(/transparent/u, 'white'))
      expect(mask()).toHaveStyle(
        g_styles.replace(/transparent/u, default_icon.color)
      )
      expect(background()).toHaveStyle(g_styles)
    })

    it('accepts a style prop that merges with the default social icon styles', ({ expect }) => {
      render(<SocialIcon style={{ height: '75px' }} url="http://example.com" />)
      expect(link()).toHaveStyle(`
        display: inline-block;
        width: 50px;
        height: 75px;
        position: relative;
        overflow: hidden;
        vertical-align: middle;
      `)
    })
  })
