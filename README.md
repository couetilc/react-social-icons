# temp changelog for release

- code splitting is now supported
- added new icons
- props were updated, some were deprecate, some are new
- React v15 is no longer supported. Now supporting v16, v17, and v18.

# react-social-icons

![build status](https://img.shields.io/github/actions/workflow/status/jaketrent/react-social-icons/build_test_publish.yml?branch=master)
![package version](https://img.shields.io/npm/v/react-social-icons)
![package size](https://img.shields.io/bundlephobia/minzip/react-social-icons)
![weekly downloads](https://img.shields.io/npm/dw/react-social-icons)
![type definitions](https://img.shields.io/npm/types/react-social-icons)

A set of beautiful svg social icons. Easily used in React. No images or
external css dependencies.

## Install

```
npm install react-social-icons
```

## Usage

Pass in the `url` prop of your social network, and the icon will be rendered.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';

ReactDOM
  .render(<SocialIcon url="https://twitter.com/jaketrent" />, document.body);
# or
ReactDOM
  .createRoot(document.Body)
  .render(<SocialIcon url="https://twitter.com/jaketrent" />)
```

See more [usage options on the example site](https://jaketrent.github.io/react-social-icons/).

This library supports [TypeScript](https://www.typescriptlang.org/) since v5.2.0.
([type declarations](https://github.com/jaketrent/react-social-icons/blob/master/src/react-social-icons.d.ts))

## Props

| Property   | Type   | Required | Description |
| :--------- | :----- | :------: | :---------- |
| url        | String | No       | The rendered component will link to this url and show the social network's icon.
| network    | String | No       | Override which network icon to render (defaults to the url's social network)
| bgColor    | String | No       | Override the background fill color (defaults to social network's color)
| fgColor    | String | No       | Override the icon's fill color (defaults to transparent)
| label      | String | No       | Set the `aria-label` attribute on the rendered anchor tag (defaults to the social network's name)
| className  | String | No       | Specify a class to attach to the rendered anchor tag
| style      | Object | No       | Override style properties passed to the rendered anchor tag |
| href      | String | No       | TODO |
| as      | String | No       | TODO |
| fallback | String | No | TODO |
| (deprecated) defaultSVG | Object | No       | Override the default icon for when a url is not matched to a social network. Requires string properties `icon`, `mask`, and `color`. (defaults to network `'sharethis'`)

### `href`

you can now pass href to a `<SocialIcon>` to set the anchor link. It will override the `url` prop when a user clicks on a link. It will be ignored when `<SocialIcon>` matches a network domain to the `url` prop to set the network icon. but the network icon shown will still be the one that matches `url`.

Let's look at a simple example.

```js
// renders: default icon
// on click: navigate to github.com
<SocialIcon href="www.github.com" />
```

Here we set the icon svg with `url` and set the `<a>` link using `href`.

```js
// renders: vimeo icon
// on click: navigate to github.com
<SocialIcon hree="www.github.com" url="www.vimeo.com" />
```

### `as`

Set `<SocialIcon>` to be any element or React component you want. The `as` prop is passed directly to `React.createElement` as the first argument to create the `<SocialIcon>` component.

Example: Turn `<SocialIcon>` into a `<div>`
 
```js
<SocialIcon as="div" />
```

### `fallback`

Accepts a network

```js
<SocialIcon fallback="pinterest" /> // renders pinterest icon
```

Or an icon definition

```js
<SocialIcon fallback={{ icon, mask, color }} /> // renders custom icon
```

## FAQ

TODO FAQ topics

- write examples of how to codesplit with this package. write example rollup
    config, and also write example webpack config. can I add a webpack config
    test to `codesplitting.sh`?

- create an FAQ or something in the readme: what else can I include from the issues, opened or closed?

### opening in new tab

To open a link in a new tab, pass the `target` prop to `<SocialIcon>`. The `<SocialIcon>` is just an `<a>` element underneath with all the component's props spread into its attributes.

```js
// docs for `target`: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
<SocialIcon target="_blank" href="www.github.com" />
```

# Contributing

See CONTRIBUTING.md.

TODO this section should be it's own file, and I'll link it here in the README

## set node.js version

use `nodenv`.

```sh
# TODO commands to install nodenv and install and set node version
```

### adding new icons to db/

explain format of db directory, explain format of icon, explain how to share
icons between multiple domains by symlinking, and whatever else, maybe linting
rules too.

## formatting code

run `./cli fmt` to get `./cli test:fmt` to pass.

## writing tests

you must write a unit test for your feature. add it to `test/unit/cases.js`. while you are developing, practice tdd and run `./cli test:src` to have vitest rerun tests when source code changes.

when you're finished developing your feature, run `pnpm test` until you get all tests to pass.

once completed, you are ready to make a pull request

## making a pull request

idk yet

## the other exports

There are other useful functions and objects exported from the
SocialIcon library.

### `networkFor`

A function that accepts a url string and returns the matching social network
domain name.

```js
import { networkFor } from 'react-social-icons';
const url = 'https://www.pinterest.com'
const network = networkFor(url)
```

### `register`

A function that accepts the domain name of a social network with an object
definition of the icon's paths and color. It will register the social network
icon with the `<SocialIcon>` component, which will have gained the ability to
render the icon for your social network, and update `uri_regex` to match the
domain name.

```js
import { register } from 'react-social-icons';
const icon = { color: 'red', icon: 'icon path', mask: 'mask path' }
const social_network = 'mynetwork'
register(social_network, icon)
```

### `social_icons`

A map that associates social network domain names to the icon objects with the
network's color and icon paths.

### `network_names` and `getKeys`

`network_names` is a set that stores all the registered social network domain
names. `getKeys` returns an array of the same information.

```js
import { network_names } from 'react-social-icons'
const array_of_names = [...network_names]
const same_array_of_names = getKeys()
```

### `uri_regex`

A regex for urls that will match any social network domain names that are
registered. (this will not match `mailto:` links or return the default network,
use `networkFor` instead)

```js
import { uri_regex } from 'react-social-icons'
const url = 'https://www.pinterest.com'
const network = url.match(uri_regex)?.[1]
```

# TODO

* I think the big next things are to:
    - update docs
    - make the default branch `main` and not `master`
    - squash merge code-splitting branch into main
    - publish a beta release v6.0.0-beta1
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

- I need a contributor document, make it very clear what I need to quickly
  approve PRs, and also explain the approval process. Look elsewhere for good
  examples of what that looks like.

- at the end of all this, once I've deployed v6.0 to NPM, check the badges
  for the minzipped size calculation. Right now for v5.15.0 it's 33.3kb.
  I hope it shrinks a lot.

# react-social-icons &nbsp; ![build status](https://img.shields.io/github/actions/workflow/status/jaketrent/react-social-icons/build_test_publish.yml?branch=master) ![package version](https://img.shields.io/npm/v/react-social-icons) ![package size](https://img.shields.io/bundlephobia/minzip/react-social-icons) ![weekly downloads](https://img.shields.io/npm/dw/react-social-icons) ![type definitions](https://img.shields.io/npm/types/react-social-icons)

A set of beautiful svg social icons.  Easily used in React.  No images or external css dependencies.  Svg paths provided by Squarespace.

![social network icons](https://i.imgur.com/OrNeTND.png)

## Install

```
npm install react-social-icons
```

## Usage

Pass in the `url` prop of your social network, and the icon will be rendered.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
ReactDOM.render(<SocialIcon url="https://twitter.com/jaketrent" />, document.body);
```

See more [usage options on the example site](https://jaketrent.github.io/react-social-icons/).

This library supports [TypeScript](https://www.typescriptlang.org/) since v5.2.0.
([type declarations](https://github.com/jaketrent/react-social-icons/blob/master/src/react-social-icons.d.ts))

## Contributing

### How to add new icons

Icons are stored in `src\_networks-db.js`

For example:

```
facebook: {
  icon:
    'M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z',
  mask:
    'M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z',
  color: '#3b5998'
},
```

To add a new icon, you first need to find a copy of that icon as an svg file,
and a hex code for the social network's main color.  Check the network's own
style guidelines or website for the official icon and color.

The 'icon' and 'mask' properties for each network in `networks-db.js` should
contain the vector information for the svg.  The 'icon' is the foreground, so
the path for describes the shape of the icon itself. This will be transparent
by default.  The 'mask' is the background area, so the path for this describes
the area between the surrounding circle and the icon shape. By default this
will take the color you provide in the 'color' property.  The 'color' property
will set the background color for the icon. This should be the main color
associated with the social network.

An easy way to generate the path for the 'mask' is to begin with
'M0,0v64h64V0H0z', which defines the circular border, and follow this with the
exact same path that you used for the 'icon'.

Depending on the svg file that you start with, you may need to edit attributes
in the svg file such as width, height, and viewbox (see
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) in order to put the
icon in the centre of the circular border. You can then use a tool such as
https://www.iloveimg.com/resize-image to rewrite the svg path so you have a
nice simple path to use here in the 'icon' and 'mask', without needing those
extra attributes.

### Using Inkscape

These steps should work for most logos. Feel free to tweak any of the steps to
make the final svg look neater:

1. Open the SVG in Inkscape's editor and select `File > Document Properties` in
   the menu bar.  Change the page's width and height to 64px.
2. Select the icon and click `Object > Transform` in the menu bar. Choose the
   "Scale" tab, check the box "Scale proportionally", set the height and width
   to be within 32px, and click the "Apply" button
3. Select the icon and click `Object > Align and Distribute` in the menu bar.
   Set relative to "Page" in the dropdown menu and click the buttons "Center on
   vertical axis" and "Center on horizontal axis".
4. Create a square starting at the origin with a width of 64px. Select
   `Object > Lower to Bottom` in the menu. Select `Path > Object to Path` in
   the menu.
5. Select both the square and icon. Click `Path > Exclusion` in the menu. You
   must convert all objects to paths and remove all groups before you can
   perform the Exclusion operation.
6. Select `File > Save a Copy` in the menu. Open the saved svg file in a text
   editor, find the `path` element, and copy the `d` attribute's value.
7. In the `react-social-icons` repository, open the `src/_networks-db.js` file
   and add a new entry in the object whose key has the same name as the social
   network's domain name. Set the property `icon` to `"M 0,0 H 64 V 64 H 0 Z"`.
   Set the property `mask` to the copied value from Step 6. Set the property
   `color` to the social network's brand color.
8. Commit your changes and preview the new icon by running `npm start` and
   visiting `http://localhost:1234` in your web browser. Once you're happy with
   the result, create a PR against master at
   https://github.com/jaketrent/react-social-icons, where it will be reviewed
   and merged. Thank you for contributing!
