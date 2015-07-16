# Changelog

## [1.0.2]

* nada.  (still getting the hang of pushing up to npm and the cdn)


## [1.0.1]

* moved CDN to [jsdelivr](http://www.jsdelivr.com/#!leaflet.esri.related)

## [1.0.0]

This is expected to be the last (and only) stable release of Esri Leaflet Related compatible with Leaflet 0.7.3. All future 1.0.X releases will be compatible with Leaflet 0.7.3 and contain only bug fixes. New features will only be added in Esri Leaflet Related 2.0.0 (which will require Leaflet 1.0.0).

### Changed
- modified naming convention for built files.  the minified file is now called 'esri-leaflet-related.js' and exploded version is 'esri-leaflet-related-src.js'

## [Beta 2]

**Breaking Changes**
* QueryRelated now expects either an `options` object or an instance of `L.esri.layer.FeatureLayer` to be passed in the constructor (via d69d928fb70169e90f00c132ec38456fe6b56705)

**Changes**
* added test scaffolding (baby steps) (via c1fd72f3d3a03a8690ee3716451e29175b1ec0a4)

## [Beta 1]

**Changes**
* grunt autorelease and sourceMap magic added

## [Alpha 2]

**Breaking Changes**
* QueryRelated now expects `url` to come from an individual parameter within `options` rather than as a seperate argument.  (see [here](https://github.com/Esri/esri-leaflet/releases/tag/v1.0.0-rc.5) for more info).

**Changes**
* added leaflet and esri-leaflet as actual project dependencies
* Namespace change
* fixed jshinting
* added debug folder with sample

## [Alpha 1]

* Inital alpha release