# TODO

- OK I have several things here
  - main package
  - example page for the documentation website (and for local development, although I should change that?)
  - browser component tests for source code
  - browser component tests for distribution code
  - typescript tests
I want to keep everthing simple though, let's try to write an SSR test.

- get typescript declaration file emitted for dist/, and source maps (sourceMap compiler option in tsconfig)

- need to make forward refs work.

- Grep for all TODO/todo in the repository, address anything there.

- write tests for code-splitting feature

- write test for esm, umd, etc. types of bundles. Also enable those types of deploys.

- need to test adding `"sideEffects": true` to package.json will have webpack
  and vite and rollup properly codesplit this package.

- finalize the eslint config, do the pretty stuff, maybe just add prettier so I
  can skip that tedious stuff, add any missing plugins that are good.

- the issue with tests when Typescript is enabled (although even that is unclear
  to me, the import situation with typescript), has rollup (or something) creating
  multiple instances of the register function, separated by appending "register$<num>"
  to the function name, each with their own DB in the closure. So there's an
  issue surrounding which copy of the DB is actually populated. I need to figure
  out why DB is not being treated as a singleton.

- replace CSS-as-objects with nanocss or something similar, getting rid of inline styles.
- work on PR magic, for screenshots and bundlesize, etc.

- need to make sure the examples command works (does my vite config still work?),
  I might have broken it. Also, how should I deploy the GitHub pages docs site? 

-  write githook to throw
  error if yarn.lock or package-lock.json exists when commit or pushing. or have
  it check at least no staged files are yar.lock or package-lock.json when committing.
- alias "defaultIcon" for "defaultSVG" but still keep it around for compatibility, but have docs reflect new usage.
- trim down everything into one file that still passes tests.
- add styling with a <style></style> tag or resort to nano-css (https://github.com/streamich/nano-css/blob/master/docs/put.md). Is there linting for css prefixes? how to handle css prefixes?
- create an FAQ or something in the readme:
   - include "how do I open the social network into a new tab" and metion target="_blank"
   - what else can I include from the issues, opened or closed?
- auto deploy examples page on every release
- auto-update README image on every push to master.
- fix the inkscape instructions
- add eslint rule to only allow like es2015 syntax or something like that so I
  can get rid of babel transpilation. do some research on whats needed here,
  also simplify all the code, there's too many files for what this package does.
  Also, can I not use inline styles somehow but still have it be re-usable and
  performant? may not need this is esbuild with target es2015 does the trick.
- how to handle changelog and releases? maybe everytime there's a new semantic
  versioning tag? or use that changesets package or something?
- add prop to override the base type of the element e.g.
  ```js
  const { as = 'a' } = props;
  React.createElement(as, props, children);
  ```
- I can probably take screenshots of the example page using this tool, give it
  a shot https://github.com/simonw/shot-scraper, otherwise playwright might be
  the best move. This is blog post https://simonwillison.net/2022/Mar/10/shot-scraper/

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

# react-social-icons &nbsp; ![build status](https://img.shields.io/github/workflow/status/jaketrent/react-social-icons/Build,%20Test,%20Publish/master) ![package version](https://img.shields.io/npm/v/react-social-icons) ![package size](https://img.shields.io/bundlephobia/minzip/react-social-icons) ![weekly downloads](https://img.shields.io/npm/dw/react-social-icons) ![type definitions](https://img.shields.io/npm/types/react-social-icons)

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

## Prop Types

| Property   | Type   | Required | Description |
| :--------- | :----- | :------: | :---------- |
| url        | String | No       | The rendered component will link to this url and show the social network's icon.
| network    | String | No       | Override which network icon to render (defaults to the url's social network)
| bgColor    | String | No       | Override the background fill color (defaults to social network's color)
| fgColor    | String | No       | Override the icon's fill color (defaults to transparent)
| label      | String | No       | Set the `aria-label` attribute on the rendered anchor tag (defaults to the social network's name)
| className  | String | No       | Specify a class to attach to the rendered anchor tag
| defaultSVG | Object | No       | Override the default icon for when a url is not matched to a social network. Requires string properties `icon`, `mask`, and `color`. (defaults to network `'sharethis'`)
| style      | Object | No       | Override style properties passed to the rendered anchor tag |

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
