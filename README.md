# react-social-icons

![build status](https://img.shields.io/github/actions/workflow/status/jaketrent/react-social-icons/build_test_publish.yml?branch=master)
![package version](https://img.shields.io/npm/v/react-social-icons)
![package size](https://img.shields.io/bundlephobia/minzip/react-social-icons)
![weekly downloads](https://img.shields.io/npm/dw/react-social-icons)
![type definitions](https://img.shields.io/npm/types/react-social-icons)

A set of beautiful svg social icons. Easily used in React. No images or
external css dependencies. [Example](https://jaketrent.github.io/react-social-icons/)

## Install

```
npm install react-social-icons
yarn add react-social-icons
pnpm add react-social-icons
```

## Usage

Pass in the `url` prop of your social network, and the icon will be rendered.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'

const Component = <SocialIcon url="https://twitter.com/jaketrent" />
// React v16
ReactDOM.render(Component, document.body)
// React v17+
ReactDOM.createRoot(document.body).render(Component)
```

See more [usage options on the example site](https://jaketrent.github.io/react-social-icons/).

This library supports [TypeScript](https://www.typescriptlang.org/) since v5.2.0.
([type declarations](https://github.com/jaketrent/react-social-icons/blob/master/src/react-social-icons.d.ts))

### Code Splitting and Tree Shaking

Reduce the size of bundled code from this library by importing the `SocialIcon`
component directly and only importing the icons you need. Bundled code using
only one icon will be 20 times smaller, or about 5% of the full library's size.
The size of the bundled library will scale linearly with each icon you import.
Many bundlers will tree shake the unused icons from the final code-split bundle.

```js
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/vimeo'
import 'react-social-icons/meetup'
// renders: vimeo icon
<SocialIcon url="www.vimeo.com" />
// renders: meetup icon
<SocialIcon url="www.meetup.com" />
// renders: default icon
<SocialIcon url="www.pinterest.com" />
```

## Props

| Property   | Type   | Required | Description |
| :--------- | :----- | :------: | :---------- |
| url        | String | No       | The rendered component will link to this url and show the social network's icon.
| network    | String | No       | Override which network icon to render 
| bgColor    | String | No       | Override the background fill color (defaults to social network's color)
| fgColor    | String | No       | Override the icon's fill color (defaults to transparent)
| label      | String | No       | Set the `aria-label` attribute on the rendered anchor tag (defaults to the social network's name)
| className  | String | No       | Specify a class to attach to the rendered anchor tag
| style      | Object | No       | Override style properties passed to the rendered anchor tag
| href      | String | No       | Override the link while keeping the icon matching prop `url`
| as      | String | No       | Override the root element of the component (defaults to 'a')
| fallback | String | No | Specify the icon shown when no network matches the `url` prop

### `url`

Sets the link the anchor element points to and renders the icon associated
with the network matching the `url`.

```js
// renders: vimeo.com
<SocialIcon url="www.vimeo.com" />
```

### `network`

Overrides the icon rendered by the component.

```js
// renders: github icon
<SocialIcon network="github" />

// renders: github icon
// on click: navigate to vimeo.com
<SocialIcon network="github" url="www.vimeo.com" />
```

### `bgColor` and `fgColor`

Overrides the background or foreground fill colors. Defaults to the network's
brand color (bg) and transparent (fg).

```js
// renders: default icon
<SocialIcon bgColor="green" fgColor="blue" />
```

### `label`

Overrides the ARIA attribute on the anchor element. Defaults to network name.

```js
// renders: vimeo icon
<SocialIcon label="my video channel" url="www.vimeo.com" />
// or
<SocialIcon aria-label="my video channel" url="www.vimeo.com" />
```

### `className` and `style`

Specify a CSS class and styles for the anchor element. [Read more about these
special React props.](https://legacy.reactjs.org/docs/faq-styling.html)

```js
<SocialIcon className="colorscheme" style={{ color: 'green' }} />
```

### `href`

Overrides the anchor link. Ignored when the component decides what icon to
render.

```js
// renders: default icon
// on click: navigate to github.com
<SocialIcon href="www.github.com" />
```

`href` specifies the anchor link while `url` specifies the rendered icon

```js
// renders: vimeo icon
// on click: navigate to github.com
<SocialIcon href="www.github.com" url="www.vimeo.com" />
```

### `as`

Set `<SocialIcon>` to be any html element you want. Defaults to 'a'.

```js
<SocialIcon as="div" />
```

### `fallback`

Overrides the default icon shown when a network does not match the given URL.

Accepts a network:

```js
<SocialIcon fallback="pinterest" /> // renders pinterest icon
```

Or an icon definition:

```js
<SocialIcon fallback={{ icon, mask, color }} /> // renders custom icon
```

## The other exports

There are other useful functions and objects exported from the
SocialIcon library.

### `networkFor`

A function that accepts a url string and returns the matching social network
domain name.

```js
import { networkFor } from 'react-social-icons';
import { assert } from 'assert'
assert.equal(networkFor('https://www.pinterest.com'), 'pinterest')
```

### `register`

A function that accepts the domain name of a social network with an object
definition of the icon's paths and color. It will register the social network
icon with the `<SocialIcon>` component, which will have gained the ability to
render the icon for your social network, and update `uri_regex` to match the
domain name.

```js
import { register } from 'react-social-icons';
register('mynetwork', { color: 'red', icon: 'H ', mask: 'path', })
```

### `social_icons`

A map that associates social network names to the icon objects with the
network's color and icon paths.

```js
import { social_icons } from 'react-social-icons'
import assert from 'assert'
assert.ok(social_icons instanceof Map)
```

### `network_names` and `getKeys`

`network_names` is a set that stores all the registered social network domain
names. `getKeys` returns an array of the same information.

```js
import { network_names, getKeys } from 'react-social-icons'
import assert from 'assert'
assert.deepEqual(getKeys(), [...network_names])
assert.ok(network_names instanceof Set)
```

### `uri_regex`

A regex for urls that will match any social network domain names that are
registered. (this will not match `mailto:` links or return the default network,
use `networkFor` instead)

```js
import { uri_regex } from 'react-social-icons'
import assert from 'assert'
assert.equal(uri_regex.exec('https://www.pinterest.com')?.[1], 'pinterest')
```

## Contributing

Contributors are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## FAQ

### How do I open the link in a new tab when the icon is clicked?

Pass the prop `target` like so: `<SocialIcon target="_blank"
url="www.vimeo.com" />`. All props are forwarded to the underlying element, [an
anchor](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).

### How do I use code-splitting?

This package packages exposes the component code and icon definitions in
separate files with a simple import interface. There are several useful tools
that implement features like tree-shaking to reduce the size of bundled code.
Certain browsers contain features that let you important un-bundled code
directly. An effort has been made to keep distribution code files simple,
separate, and small.

#### with ES6 browser imports

[Refer to a list of compatible
browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
and import files directly from your own servers or [a
CDN](https://www.jsdelivr.com/).

#### with a bundler

[Webpack](https://webpack.js.org/guides/tree-shaking/) and
[Rollup](https://rollupjs.org/introduction/#tree-shaking) will tree shake any
unused code from this package when you are bundling your code.

### How do I add a new icon?

Follow the instructions in [CONTRIBUTING.md](CONTRIBUTING.md).

# TODO

* I think the big next things are to:
    - squash merge code-splitting branch into main
    - publish a beta release v6.0.0-beta1
    - update the changelog to prep for v6
    - post on the issues where their updates reflect what is in v6 to please
      try out the beta (this will be code splitting issue, and some of the PRs)
    - try out the beta on dad's website.
    - once confirm is working on dad's website, publish v6.0.0
    - reset the `gh-pages` branch to `main`, then remove all files except for
      `static/`, and then manually run a build targeting the root of the repo
      and commit all files so the page updates.
    - start testing my PR helper action, so  screenshots are correct, by making
      new PRs incorporating changes from the PRs against v5.
    - start testing my auto example page workflow for when I publish new releases.
      (workflow_dispatch this one?)
    - now I can hit the rest of my todos on the list
    - auto-update README image of all icons on every push/publish to master. ( i think publish better)

* I need instructions on how to draw a path for this library. even I'm hazy on
  it. Like how does viewbox work? Do all paths need to stay with the 0 0 64 64
  it set or does it scale automatically, like a fit to min-width?
  - then I need to update the `### register` section with a link to the explanation
    for how to define an icon.

* icon behance has a path outside its viewbox, makes it slightly larger than 50px.
  I need to diagnose root issue, then I should be able to write a test that
  checks this for all SVGs.

- fix the inkscape instructions

- is it possible with GitHub to provide a contributor temporary permissions to
  merge their PR into the repo and to deploy a new version only of their
  approved PR? Or possible to grant them permission to merge after I've approved,
  then main branch CI will publish automatically, maybe after I give confirmation
  via email notification or something. To minimize any work to publish and also
  give people a sense of ownership by allowing to merge an approved PR themselves
  and see it automatically deployed to NPM immediately afterwards. But they should
  only be able to do it with their PRs, nothing else. So maybe minimal positions
  for contributors that only grant them position to merge approved PRs.

- at the end of all this, once I've deployed v6.0 to NPM, check the badges
  for the minzipped size calculation. Right now for v5.15.0 it's 33.3kb.
  I hope it shrinks a lot.
