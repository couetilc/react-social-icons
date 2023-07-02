import { test, expect } from '@playwright/experimental-ct-react'
import { SocialIcon as SocialIcon_src } from '../../src/react-social-icons.js'
import { SocialIcon as SocialIcon_dist } from '../../dist/react-social-icons.js'
import * as React from 'react'
import convert from 'color-convert'
import { readIcon } from '../utils.js'
import Label from '../fixtures/label_component.jsx'

const sharethis = readIcon('sharethis')
const pinterest = readIcon('pinterest')
const github = readIcon('github')

const pinterest_url = 'http://pinterest.com'
const pinterest_mask = pinterest.mask || ''
const pinterest_icon = pinterest.icon || ''
const github_mask = github.mask || ''
const default_icon = sharethis

test.describe('<SocialIcon /> (source code)', () => {

  test('adds correct url to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} />)
    await expect(component).toHaveAttribute('href', pinterest_url)
  })

  test('adds correct class to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} />)
    await expect(component).toHaveAttribute('class', 'social-icon')
  })

  test('includes child elements within anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url}><div>child</div></SocialIcon_src>)
    await expect(component).toContainText('child')
  })

  test('adds target and rel attributes to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src target='_blank' rel='noopener noreferrer' />)
    await expect(component).toHaveAttribute('target', /^_blank$/u)
    await expect(component).toHaveAttribute('rel', /^noopener noreferrer$/u)
  })

  test('adds aria label to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} />)
    await expect(component).toHaveAttribute('aria-label', 'pinterest')
  })

  test('overrides aria label on anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} label='override' />)
    await expect(component).toHaveAttribute('aria-label', 'override')
  })

  test('adds an aria label to social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} />)
    const svg = component.locator('svg')
    await expect(svg).toHaveAttribute('aria-label', 'pinterest social icon')
  })

  test('matches social provider to icon path', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(2) path')).toHaveAttribute('d', pinterest_icon)
  })

  test('matches social provider to mask path', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3) path')).toHaveAttribute('d', pinterest_mask)
  })

  test('overrides network shown in anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} network='github' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3) path')).toHaveAttribute('d', github_mask)
  })

  test('override bgColor of social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} bgColor='rgb(10, 10, 10)' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3)')).toHaveCSS('fill', 'rgb(10, 10, 10)')
  })

  test('override fgColor of social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} fgColor='rgb(200, 200, 200)' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(2)')).toHaveCSS('fill', 'rgb(200, 200, 200)')
  })

  // TODO I want to rename this defaultSVG prop to 'fallbackIcon', but just alias it.
  test('override default icon for social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url='https://example.com' defaultSVG={{
      // TODO I want this defaultSVG or fallbackIcon prop to accept a string referencing a social provider too, not just an object
      icon: 'test-icon',
      mask: 'test-mask',
      color: 'rgb(254,254,254)',
    }} />)
    const svg = component.locator('svg')
    await expect(svg.locator('g.social-svg-icon path')).toHaveAttribute('d', 'test-icon')
    await expect(svg.locator('g.social-svg-mask path')).toHaveAttribute('d', 'test-mask')
    await expect(svg.locator('g.social-svg-mask path')).toHaveCSS('fill', 'rgb(254, 254, 254)')
  })

  test('allows for separate default icon overrides for social svg instances', async ({ mount }) => {
    // there was a bug earlier where specifying a fallback icon would mutate a
    // shared module-scope variable, affecting all other social icons' fallback
    // icons. Basically, rendering a component had a side effect which is a no
    // no in React. This test checks to make sure that particular issue won't
    // pop up again.

    let component

    // specifies an alternative fallback icon
    component = await mount(
      <SocialIcon_src data-testid='with-fallback-prop' url='https://example.com' defaultSVG={{
        icon: 'test-fallback-icon',
        mask: 'test-fallback-mask',
        color: 'rgb(0,0,0)',
      }} />
    )

    await expect(component.locator('.social-svg-icon path')).toHaveAttribute('d', 'test-fallback-icon')
    await expect(component.locator('.social-svg-mask path')).toHaveAttribute('d', 'test-fallback-mask')
    await expect(component.locator('.social-svg-mask path')).toHaveCSS('fill', 'rgb(0, 0, 0)')

    // relies on rendering the default icon from the library
    component = await mount(
      <SocialIcon_src data-testid='without-fallback-prop' url='https://example.com' />
    )

    await expect(component.locator('.social-svg-icon path')).toHaveAttribute('d', default_icon.icon)
    await expect(component.locator('.social-svg-mask path')).toHaveAttribute('d', default_icon.mask)
    await expect(component.locator('.social-svg-mask path')).toHaveCSS('fill', `rgb(${convert.hex.rgb(default_icon.color).join(', ')})`)
  })

  test('includes social svg within anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_src />)
    const svg = component.locator('svg')
    await expect(svg).toHaveAttribute('class', /^social-svg$/u)
  })

  test('adds img role to social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src />)
    const svg = component.locator('svg')
    await expect(svg).toHaveAttribute('role', /^img$/u)
  })

  test('adds class to background path within svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(1)')).toHaveAttribute('class', 'social-svg-background')
  })

  test('adds class to icon path within svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(2)')).toHaveAttribute('class', 'social-svg-icon')
  })

  test('adds class to mask path within svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_src />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3)')).toHaveAttribute('class', 'social-svg-mask')
  })

  test('stylesheet styles are applied to the component', async ({ mount }) => {
    const component = await mount(<SocialIcon_src url={pinterest_url} />)
    await expect(component).toHaveCSS('width', '50px')
    await expect(component).toHaveCSS('height', '50px')
    await expect(component.locator('svg')).toHaveAttribute('viewBox', '0 0 64 64')
  })

  test('href prop sets anchor\'s href attribute', async ({ mount }) => {
    const component = await mount(<SocialIcon_src href={pinterest_url} />)
    await expect(component).toHaveAttribute('href', pinterest_url)
  })

  test('href precedes url to set anchor\'s href attribute', async ({ mount }) => {
    const component = await mount(<SocialIcon_src href={pinterest_url} url='www.vimeo.com' />)
    await expect(component).toHaveAttribute('href', pinterest_url)
  })

  test('href prop does not set icon\'s network', async ({ mount }) => {
    const component = await mount(<SocialIcon_src href={pinterest_url} url='www.github.com' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3) path')).toHaveAttribute('d', github_mask)
  })

  test('href prop is undefined when neither url nor href props are present', async ({ mount }) => {
    const component = await mount(<SocialIcon_src />)
    await expect(component).not.toHaveAttribute('href', /.?/u)
  })

  test('"as" prop will override <SocialIcon> element type', async ({ mount, page }) => {
    await mount(<SocialIcon_src as="label" />)
    await expect(page.locator('#root > label')).toHaveClass('social-icon')
  })

  test('renders children', async ({ mount }) => {
    const component = await mount(<SocialIcon_src><div id="test" /></SocialIcon_src>)
    await expect(component.locator('div#test')).toHaveId('test')
  })

})

test.describe('<SocialIcon /> (distribution code)', () => {

  test('adds correct url to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} />)
    await expect(component).toHaveAttribute('href', pinterest_url)
  })

  test('adds correct class to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} />)
    await expect(component).toHaveAttribute('class', 'social-icon')
  })

  test('includes child elements within anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url}><div>child</div></SocialIcon_dist>)
    await expect(component).toContainText('child')
  })

  test('adds target and rel attributes to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist target='_blank' rel='noopener noreferrer' />)
    await expect(component).toHaveAttribute('target', /^_blank$/u)
    await expect(component).toHaveAttribute('rel', /^noopener noreferrer$/u)
  })

  test('adds aria label to anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} />)
    await expect(component).toHaveAttribute('aria-label', 'pinterest')
  })

  test('overrides aria label on anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} label='override' />)
    await expect(component).toHaveAttribute('aria-label', 'override')
  })

  test('adds an aria label to social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} />)
    const svg = component.locator('svg')
    await expect(svg).toHaveAttribute('aria-label', 'pinterest social icon')
  })

  test('matches social provider to icon path', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(2) path')).toHaveAttribute('d', pinterest_icon)
  })

  test('matches social provider to mask path', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3) path')).toHaveAttribute('d', pinterest_mask)
  })

  test('overrides network shown in anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} network='github' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3) path')).toHaveAttribute('d', github_mask)
  })

  test('override bgColor of social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} bgColor='rgb(10, 10, 10)' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3)')).toHaveCSS('fill', 'rgb(10, 10, 10)')
  })

  test('override fgColor of social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} fgColor='rgb(200, 200, 200)' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(2)')).toHaveCSS('fill', 'rgb(200, 200, 200)')
  })

  // TODO I want to rename this defaultSVG prop to 'fallbackIcon', but just alias it.
  test('override default icon for social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url='https://example.com' defaultSVG={{
      // TODO I want this defaultSVG or fallbackIcon prop to accept a string referencing a social provider too, not just an object
      icon: 'test-icon',
      mask: 'test-mask',
      color: 'rgb(254,254,254)',
    }} />)
    const svg = component.locator('svg')
    await expect(svg.locator('g.social-svg-icon path')).toHaveAttribute('d', 'test-icon')
    await expect(svg.locator('g.social-svg-mask path')).toHaveAttribute('d', 'test-mask')
    await expect(svg.locator('g.social-svg-mask path')).toHaveCSS('fill', 'rgb(254, 254, 254)')
  })

  test('allows for separate default icon overrides for social svg instances', async ({ mount }) => {
    // there was a bug earlier where specifying a fallback icon would mutate a
    // shared module-scope variable, affecting all other social icons' fallback
    // icons. Basically, rendering a component had a side effect which is a no
    // no in React. This test checks to make sure that particular issue won't
    // pop up again.

    let component

    // specifies an alternative fallback icon
    component = await mount(
      <SocialIcon_dist data-testid='with-fallback-prop' url='https://example.com' defaultSVG={{
        icon: 'test-fallback-icon',
        mask: 'test-fallback-mask',
        color: 'rgb(0,0,0)',
      }} />
    )

    await expect(component.locator('.social-svg-icon path')).toHaveAttribute('d', 'test-fallback-icon')
    await expect(component.locator('.social-svg-mask path')).toHaveAttribute('d', 'test-fallback-mask')
    await expect(component.locator('.social-svg-mask path')).toHaveCSS('fill', 'rgb(0, 0, 0)')

    // relies on rendering the default icon from the library
    component = await mount(
      <SocialIcon_dist data-testid='without-fallback-prop' url='https://example.com' />
    )

    await expect(component.locator('.social-svg-icon path')).toHaveAttribute('d', default_icon.icon)
    await expect(component.locator('.social-svg-mask path')).toHaveAttribute('d', default_icon.mask)
    await expect(component.locator('.social-svg-mask path')).toHaveCSS('fill', `rgb(${convert.hex.rgb(default_icon.color).join(', ')})`)
  })

  test('includes social svg within anchor', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist />)
    const svg = component.locator('svg')
    await expect(svg).toHaveAttribute('class', /^social-svg$/u)
  })

  test('adds img role to social svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist />)
    const svg = component.locator('svg')
    await expect(svg).toHaveAttribute('role', /^img$/u)
  })

  test('adds class to background path within svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(1)')).toHaveAttribute('class', 'social-svg-background')
  })

  test('adds class to icon path within svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(2)')).toHaveAttribute('class', 'social-svg-icon')
  })

  test('adds class to mask path within svg', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3)')).toHaveAttribute('class', 'social-svg-mask')
  })

  test('stylesheet styles are applied to the component', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist url={pinterest_url} />)
    await expect(component).toHaveCSS('width', '50px')
    await expect(component).toHaveCSS('height', '50px')
    await expect(component.locator('svg')).toHaveAttribute('viewBox', '0 0 64 64')
  })

  test('href prop sets anchor\'s href attribute', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist href={pinterest_url} />)
    await expect(component).toHaveAttribute('href', pinterest_url)
  })

  test('href precedes url to set anchor\'s href attribute', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist href={pinterest_url} url='www.vimeo.com' />)
    await expect(component).toHaveAttribute('href', pinterest_url)
  })

  test('href prop does not set icon\'s network', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist href={pinterest_url} url='www.github.com' />)
    const svg = component.locator('svg')
    await expect(svg.locator('g:nth-child(3) path')).toHaveAttribute('d', github_mask)
  })

  test('href prop is undefined when neither url nor href props are present', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist />)
    await expect(component).not.toHaveAttribute('href', /.?/u)
  })

  test('"as" prop will override <SocialIcon> element type', async ({ mount, page }) => {
    await mount(<SocialIcon_dist as="div" />)
    await expect(page.locator('#root > div')).toHaveClass('social-icon')
  })

  test('renders children', async ({ mount }) => {
    const component = await mount(<SocialIcon_dist><div id="test" /></SocialIcon_dist>)
    await expect(component.locator('div#test')).toHaveId('test')
  })

})
