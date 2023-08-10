# Contributing to `react-social-icons`

We have several goals with this library:

- Useful
- High Quality
- Flexible
- Avoids breaking API changes
- Supports tree shaking
- Full test coverage

Abide by them when contributing to `react-social-icons`.

When making a PR, describe your feature or bugfix, include a test or screenshot
where applicable, and make sure all tests running in CI pass.

## Architecture

The package is a [React
Component](https://react.dev/learn/your-first-component), and is compiled for
distribution using [Rollup](https://rollupjs.org/). Syntax support is provided
by [Babel](https://babeljs.io/) while tree shaking for code splitting is
enabled using a [Rollup plugin](https://rollupjs.org/plugin-development/) that
takes advantage of a feature called "virtual modules". The development
environment is powered by [Vite](https://vitejs.dev/)

## Development Setup

Run `./cli task:setup-dev` to setup your development environment on MacOS.

If the node.js version is out of date, run the update task `./cli task:update-node`

Otherwise, follow these steps to set up your development environment manually.

1. Setup node.js

Install [nodenv](https://github.com/nodenv/nodenv), which manages our node.js
versions. Once installed, run `nodenv install`.

2. Install package dependencies

[Corepack](https://nodejs.org/api/corepack.html) is a node.js feature that
manages our package manager. Run the following commands:

```sh
corepack enable
pnpm install
```

3. Run setup check

Run all tests to make sure node.js and package dependencies were setup correctly:

```sh
pnpm test
```

## Adding New Icons

All icons are stored in the `db/` folder. Each file contains the icon definition
as a JSON object with three keys, `color`, `icon`, and `mask`.

For example:

```js
// file: db/facebook.json
{
  color: '#3b5998'
  icon: 'M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z',
  mask: 'M0,0v64h64V0H0z M39.6,22l-2.8,0c-2.2,0-2.6,1.1-2.6,2.6V28h5.3l-0.7,5.3h-4.6V47h-5.5V33.3H24V28h4.6V24 c0-4.6,2.8-7,6.9-7c2,0,3.6,0.1,4.1,0.2V22z',
},
```

Examine the icon you've added using the visual UI test:

```sh
./cli info:visual
```

To add a new icon, you first need to find a copy of that icon as an svg file,
and a hex code for the social network's main color.  Check the network's own
style guidelines or website for the official icon and color.

The 'icon' and 'mask' properties for each network in `db/` should contain the
vector information for the svg.  The 'icon' is the foreground, whose path
describes the shape of the icon itself. This will be transparent by default.
The 'mask' is the background area, whose path describes the area between the
surrounding circle and the icon shape. By default this will take the color you
provide in the 'color' property.  The 'color' property will set the background
color for the icon. This should be the main color associated with the social
network.

An easy way to generate the path for the 'mask' is to begin with
'M0,0v64h64V0H0z', which defines the circular border, and follow this with the
exact same path that you used for the 'icon'.

Depending on the svg file that you start with, you may need to edit attributes
in the svg file such as width, height, and viewbox (see
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) in order to put the
icon in the centre of the circular border. You can then use a tool such as
https://www.iloveimg.com/resize-image to rewrite the svg path so you have a
simple path to use here in the 'icon' and 'mask', without needing those extra
attributes.

### Using Inkscape

These steps should work for most logos. Feel free to tweak any of the steps to
make the final svg look neater:

NOTE: there is a fatal flaw in these steps. When the property `icon` is set to
the circle shape, it breaks the transparency of the icon mask. These steps need
to be updated.

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

## Writing and Running Tests

Any feature or bugfix _must_ have an accompanying test.

Run all tests:
```sh
pnpm test
# or
./cli test:
```

### Visual Test

Use the visual UI to visually test new icons or changes to existing ones.
It displays all icons in a variety of sizes and colors.

Run visual test:
```sh
./cli test:visual # starts vite dev server
```

### Unit Tests

Use [Vitest](https://vitest.dev/) and [React Testing
Library](https://testing-library.com/docs/react-testing-library/intro/) for
writing unit test cases. All unit tests are run against source code and
distribution code.

Run all unit tests:
```sh
./cli test:unit
```

Only run unit tests on source code (useful while practicing
[TDD](https://en.wikipedia.org/wiki/Test-driven_development)):
```sh
./cli test:src
```

### Typescript Tests

Any type changes to the component's props must be reflected in the type
definition and type test file. Add both a positive and negative test.

Run test:
```sh
./cli test:ts
```

### Codesplitting Tests

Any changes that may affect bundlesize are monitored by a test that uses Rollup
to tree shake different import types.

Run test:
```sh
./cli test:codesplitting
```

### Style and Formatting Tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and
[Publint](https://github.com/bluwy/publint) are use to catch errors and enforce
coding style.

Run test:
```sh
./cli test:lint
./cli test:fmt
./cli test:publint
# format the changes you made to any source code
./cli task:fmt && ./cli test:fmt
```

### Package Manager tests

This project uses [PNPM](https://pnpm.io/) as a package manager, no others are
permitted.

Run test:
```sh
./cli test:dep
```

## Making a PR
