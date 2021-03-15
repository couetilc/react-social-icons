# react-social-icons

A set of beautiful svg social icons.  Easily used in React.  No images or external css dependencies.  Svg paths provided by Squarespace.

![social network icons](https://i.imgur.com/RoIt9OD.png)

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

## Rebuild Examples

```
git checkout gh-pages
git rebase master
sh scripts/gen-gh-pages.sh
```

## Release

```
npm version <semver>
npm publish
```

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

  To add a new icon, you first need to find a copy of that icon as an svg file, and a hex code for the social network's main color.
  Check the network's own style guidelines or website for the official icon and color.

  The 'icon' and 'mask' properties for each network in `networks-db.js` should contain the vector information for the svg.
  The 'icon' is the foreground, so the path for describes the shape of the icon itself. This will be transparent by default.
  The 'mask' is the background area, so the path for this describes the area between the surrounding circle and the icon shape. By default this will take the color you provide in the 'color' property.
  The 'color' property will set the background color for the icon. This should be the main color associated with the social network.

  An easy way to generate the path for the 'mask' is to begin with 'M0,0v64h64V0H0z', which defines the circular border, and follow this with the exact same path that you used for the 'icon'.  

  Depending on the svg file that you start with, you may need to edit attributes in the svg file such as width, height, and viewbox (see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) in order to put the icon in the centre of the circular border. You can then use a tool such as https://www.iloveimg.com/resize-image to rewrite the svg path so you have a nice simple path to use here in the 'icon' and 'mask', without needing those extra attributes.
