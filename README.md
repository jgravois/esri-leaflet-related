# Esri Leaflet Related Records

Esri Leaflet Related Records is a small API helper to assist querying related tables published in ArcGIS Server or ArcGIS Online. It relies on the minimal Esri Leaflet Core which handles abstraction for requests and authentication when necessary. You can find out more about the Esri Leaflet Core [here](http://esri.github.com/esri-leaflet/downloads).

## Example
Note that the latest version of this plugin requires changes introduced in esri-leaflet 2.0.0-beta.6.

Take a look at [this sample](https://jgravois.github.io/esri-leaflet-related/index.html) to see it in action.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8 />
  <title>related table</title>
  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />

  <!-- Load Leaflet from CDN-->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/leaflet/1.0.0-beta.2/leaflet.css" />
  <script src="https://cdn.jsdelivr.net/leaflet/1.0.0-beta.2/leaflet.js"></script>

  <!-- Load Esri Leaflet from CDN -->
  <script src="https://cdn.jsdelivr.net/leaflet.esri/2.0.0-beta.8/esri-leaflet.js"></script>

  <!-- Esri Leaflet Related -->
  <script src="http://cdn.jsdelivr.net/leaflet.esri.related/2.0.0/esri-leaflet-related.js"></script>

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
      z-index: 1000;
      padding: 1em;
      background: white;
    }
  </style>
</head>
<body>
<div id="map"></div>
<div id="info-pane" class="leaflet-bar">
  <label>
  select a feature to query for related records
  </label>
</div>

<script>
  var map = L.map('map').setView([34.059, -117.203], 14);
  L.esri.basemapLayer('Topographic').addTo(map);

  var fl = L.esri.featureLayer({
    url: '//services.arcgis.com/uCXeTVveQzP4IIcx/ArcGIS/rest/services/stationActivity/FeatureServer/0'
  }).addTo(map);

  var query = L.esri.Related.query(fl);

  //wire up event listener to fire query when users click on a feature
  fl.on("click", queryRelated);

  function queryRelated (evt) {
    query.objectIds([evt.layer.feature.id]).relationshipId("0").run(function(error, response, raw) {
      document.getElementById("info-pane").innerHTML += '<br><br>matching rows: ' + response.features.length;
    })
  }
</script>

</body>
</html>
```

## API Reference

### [`L.esri.Related.Query`](http://esri.github.io/esri-leaflet/api-reference/tasks/query-related.html)

## Development Instructions

1. [Fork and clone Esri Leaflet Related](https://help.github.com/articles/fork-a-repo)
2. `cd` into the `esri-leaflet-related` folder and install the dependencies with `npm install`
3. Run `npm start` from the command line. This will compile minified source in a brand new `dist` directory, launch a tiny webserver and begin watching the raw source for changes.
4. The example at `debug/sample.html` *should* 'just work'
5. Make your changes and create a [pull request](https://help.github.com/articles/creating-a-pull-request)

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
2. If you use this library in a revenue generating application or for government use you must upgrade to a paid account. You are not allowed to generate revenue while on a free plan.

This information is from the [ArcGIS for Developers Terms of Use FAQ](https://developers.arcgis.com/en/terms/faq/)

## Licensing
Copyright 2016 Esri

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

[](Esri Tags: ArcGIS Web Mapping Leaflet)
[](Esri Language: JavaScript)
