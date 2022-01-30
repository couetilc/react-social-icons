# Changelog

[The Releases page](https://github.com/jaketrent/react-social-icons/releases)
will have the most up-to-date changelog for `react-social-icons`.

## v6

### Non-breaking changes

- Tree shaking for code splitting is now supported. See README.md for
  instructions. Package size in final bundle can now be as small as 1.5kb, down
  from 26.3kb for the all icons.
- Added new icons. See `db/` folder for full list of icons.
- Props were updated, some were deprecated (but still supported), some are new.
  See README.md for details.
- ESM and CommonJS builds are available

### Breaking changes

- React v15 is no longer supported. Now supporting v16, v17, and v18.
- Icon definition format has changed. Icons are now defined by two properties,
  `color` and `path`.
- `getKeys` has been renamed to `getNetworks`.
