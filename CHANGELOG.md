# Changelog

## [3.0.0]

* upgrade esri-leaflet dependency to 3.x.

## [2.0.0]

* moving out of beta, to full-blown SemVer.

## [2.0.0-beta.1]

### Breaking

* Requires the 2.0.0-beta.4 release of Esri Leaflet.
* Requires the 1.0.0-beta.1 release of Leaflet.
* Namespaces have changed all exports now sit directly under the `L.esri` namespace. This mean that `L.esri.Tasks.queryRelated` can now be accessed via `L.esri.Related.query`.

### Added

* Better build/test/release automation.
* Support for JSPM in package.json. Now you can `import queryRelated from 'esri-leaflet-related/src/EsriLeafletRelated';` for more compact builds but, be aware of [caveats](http://blog.izs.me/post/44149270867/why-no-directories-lib-in-node-the-less-snarky)
* Support for browserify in the package.json. Now you can `var queryRelated = require('esri-leaflet-related/src/EsriLeafletRelated');` for more compact builds, but be aware of [caveats](http://blog.izs.me/post/44149270867/why-no-directories-lib-in-node-the-less-snarky)


## [1.0.2]

* nada.  (still getting the hang of pushing up to npm and the cdn)


## [1.0.1]

* moved CDN to [jsdelivr](http://www.jsdelivr.com/#!leaflet.esri.related)

## [1.0.0]

This is expected to be the last (and only) stable release of Esri Leaflet Related compatible with Leaflet 0.7.3. All future 1.0.X releases will be compatible with Leaflet 0.7.3 and contain only bug fixes. New features will only be added in Esri Leaflet Related 2.0.0 (which will require Leaflet 1.0.0).

### Changed

* modified naming convention for built files.  the minified file is now called 'esri-leaflet-related.js' and exploded version is 'esri-leaflet-related-src.js'

## [Beta 2]

### Breaking Changes

* QueryRelated now expects either an `options` object or an instance of `L.esri.layer.FeatureLayer` to be passed in the constructor (via d69d928fb70169e90f00c132ec38456fe6b56705)

### Changes

* added test scaffolding (baby steps) (via c1fd72f3d3a03a8690ee3716451e29175b1ec0a4)

## [Beta 1]

### Changes

* grunt autorelease and sourceMap magic added

## [Alpha 2]

### Breaking Changes

* QueryRelated now expects `url` to come from an individual parameter within `options` rather than as a seperate argument.  (see [here](https://github.com/Esri/esri-leaflet/releases/tag/v1.0.0-rc.5) for more info).

### Changes

* added leaflet and esri-leaflet as actual project dependencies
* Namespace change
* fixed jshinting
* added debug folder with sample

## Alpha 1

* Initial alpha release

[3.0.0]: https://github.com/jgravois/esri-leaflet-related/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/jgravois/esri-leaflet-related/compare/v2.0.0-beta.1...v2.0.0
[2.0.0-beta.1]: https://github.com/jgravois/esri-leaflet-related/compare/v2.0.0-beta.1...v1.0.2
[1.0.2]: https://github.com/jgravois/esri-leaflet-related/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/jgravois/esri-leaflet-related/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/jgravois/esri-leaflet-related/compare/v0.0.1-beta.1...v1.0.0
[Beta 2]: https://github.com/jgravois/esri-leaflet-gp/compare/v0.0.1-beta.1...v0.0.1-beta.2
[Beta 1]: https://github.com/jgravois/esri-leaflet-gp/compare/v0.0.1-alpha.3...v0.0.1-beta.1
[Alpha 2]: https://github.com/jgravois/esri-leaflet-gp/compare/v0.0.1-alpha.2...v0.0.1-alpha.1
