# Esri Leaflet Related Records

Esri Leaflet Related Records is a small API helper to assist querying related tables published in ArcGIS Server or ArcGIS Online

**Currently Esri Leaflet Related Records is in development and should be thought of as a beta or preview**

Esri Leaflet Related Records relies on the minimal Esri Leaflet Core which handles abstraction for requests and authentication when neccessary. You can find out more about the Esri Leaflet Core on the [Esri Leaflet downloads page](http://esri.github.com/esri-leaflet/downloads).

## Example
Note that the latest version of this plugin requires changes introduced in esri-leaflet 1.0.0 Release Candidate 5.

Take a look at [this sample](https://jgravois.github.io/esri-leaflet-related/index.html) to see it in action.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <title>related table</title>
  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
  <!-- Load Leaflet from CDN-->
  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

  <!-- Load Esri Leaflet from CDN -->
  <script src="//cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.5/esri-leaflet.js"></script>
  <script src="//cdn-geoweb.s3.amazonaws.com/esri-leaflet-related/0.0.1-beta.1/esri-leaflet-related.min.js"></script>
  <style>
    body {margin:0;padding:0;}
    #map {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
    #info-pane {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      padding: 1em;
      background: white;
    }
  </style>
</head>
<body>
<div id="map"></div>
<div id="info-pane" class="leaflet-bar">
  <label>
  click on a bikeshare location <br>to see crowdsourced counts!
  </label>
</div>

<script>
  var map = L.map('map').setView([34.05873397817502, -117.2031784057617], 14);
  L.esri.basemapLayer('Topographic').addTo(map);

  var fl = L.esri.featureLayer('//services.arcgis.com/uCXeTVveQzP4IIcx/ArcGIS/rest/services/stationActivity/FeatureServer/0').addTo(map);

  //wire up event listener to fire query when users click on individual features
  fl.on("click", queryRelated);

  function queryRelated(evt) {
    var query = L.esri.Tasks.queryRelated(fl).objectIds([evt.layer.feature.id]).relationshipId("0").run(function(error, response, raw) {
      console.log(response.features.length + " related records found.");
    })
  }
</script>

</body>
</html>
```

## L.esri.Tasks.QueryRelated

### Constructor

**Extends** [`L.esri.Tasks.Task`](http://esri.github.io/esri-leaflet/api-reference/tasks/task.html)

Constructor | Options | Description
--- | --- | ---
`new L.esri.Task.QueryRelated(<FeatureLayer> endpoint)`<br>`L.esri.Task.queryRelated(<FeatureLayer> endpoint)`<br>`new L.esri.Task.QueryRelated(<Object> options)`<br>`L.esri.Task.queryRelated(<Object> options)` | [`<FeatureLayer>`](#endpoint)<br>or<br>[`<Options>`](#options) | Accepts either an `options` object or an instance of [FeatureLayer](http://esri.github.io/esri-leaflet/api-reference/services/feature-layer.html).

### Options

L.esri.Tasks.QueryRelated accepts all L.esri.Tasks.Task options.  When used, the `url` option is required.

### Methods

Method | Returns | Description
--- | --- | ---
`objectIds(<Array> or <String>)` | `this` | The ObjectId(s) of the features to query for related records.
`relationshipId(<String>)` | `this` | The Id of the relationship itself.
`fields(<Array> or <String>)` | `this` | Determines which fields to include in response.
`returnGeometry(<Boolean>)` | `this` | Include geometry in response features (default is `true`).
`precision(<Number>)` | `this` | Determines decimal precision of response feature geometries.
`definitionExpression(<String>)` | `this` | Used to add SQL filter.
`returnZ(<Boolean>)` | `this` | Include elevation in response feature geometry (default is `true`).
`returnM(<Boolean>)` | `this` | Include 4dimensional M value in response feature geometry (default is `false`).
`run(<Function> callback)` | `this` | Calls the corresponding Geoprocessing service, passing the previously supplied input parameters.

#### Result Object

A single result from a call to 'queryRelatedRecords'.

Property | Type | Description
--- | --- | ---
`features` | [`L.geoJson`] | An array of geoJson features.

#### GP Results

Query Related Records results conform to the following format

```json
{ features: [L.geoJson] }
```

## Development Instructions

1. [Fork and clone Esri Leaflet Related Records](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-related` folder
5. Install the dependencies with `npm install`
5. The example at `/index.html` should work
6. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

## Dependencies

Esri Leaflet Related Records relies on the minimal Esri Leaflet Core which handles abstraction for requests and authentication when neccessary. You can fine out more about teh Esri Leaflet Core on the [Esri Leaflet downloads page](http://esri.github.com/esri-leaflet/downloads).

## Resources

* [Query Related Records REST Documentation](http://resources.arcgis.com/en/help/arcgis-rest-api/#/Query_Related_Records/02r300000115000000/)
* [ArcGIS for Developers](http://developers.arcgis.com)
* [ArcGIS REST Services](http://resources.arcgis.com/en/help/arcgis-rest-api/)
* [twitter@esri](http://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Terms and Conditions

Signup for an [ArcGIS for Developers account](https://developers.arcgis.com/en/plans) or purchase an [ArcGIS Online Organizational Subscription](http://www.arcgis.com/features/plans/pricing.html).

1. Once you have an account you are good to go. Thats it!
2. If you use this library in a revenue generating application or for goverment use you must upgrade to a paid account. You are not allowed to generate revenue while on a free plan.

This information is from the [ArcGIS for Developers Terms of Use FAQ](https://developers.arcgis.com/en/terms/faq/)

## Licensing
Copyright 2015 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt]( https://raw.github.com/Esri/esri-leaflet-geocoder/master/license.txt) file.

[](Esri Tags: ArcGIS Web Mapping Leaflet Geocoding)
[](Esri Language: JavaScript)
