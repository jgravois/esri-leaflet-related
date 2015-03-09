/*! esri-leaflet-related - v0.0.1-beta.2 - 2015-03-09
*   Copyright (c) 2015 Environmental Systems Research Institute, Inc.
*   Apache 2.0 License */

// We do not have an 'Esri' variable e.g loading this file directly from source define 'Esri'
if (!Esri) {
  var Esri = window.L.esri;
}

L.esri.Tasks.QueryRelated = Esri.Tasks.Task.extend({
  setters: {
    'offset': 'offset',
    'limit': 'limit',
    'outFields': 'fields',
    'objectIds': 'objectIds',
    'relationshipId': 'relationshipId',
    'definitionExpression': 'definitionExpression',
    'precision': 'geometryPrecision',
    'featureIds': 'objectIds',
    'returnGeometry': 'returnGeometry',
    'returnZ': 'returnZ',
    'returnM': 'returnM',
    'token': 'token'
  },

  path: 'queryRelatedRecords',

  params: {
    returnGeometry: true,
    outSr: 4326,
    outFields: '*',
    returnZ: true,
    returnM: false
  },

  //http://resources.arcgis.com/en/help/arcgis-rest-api/#/Query_Related_Records/02r300000115000000/

  initialize: function(endpoint) {
    //don't replace parent initialize, either pass FeatureLayer._service or the raw options object
    if (endpoint._service) {
      L.esri.Tasks.Task.prototype.initialize.call(this, endpoint._service);
    }
    else {
      L.esri.Tasks.Task.prototype.initialize.call(this, endpoint);
    }

  },

  simplify: function(map, factor) {
    //not sure if there's a better way to port L.esri.Tasks.Query.simplify() than just copy/pasting the function
    var mapWidth = Math.abs(map.getBounds().getWest() - map.getBounds().getEast());
    this.params.maxAllowableOffset = (mapWidth / map.getSize().y) * factor;
    return this;
  },

  run: function(callback, context) {
    return this.request(function(error, response) {
      //if more than one objectId is specified, we loop through the features and pass a single collection to the utility method which converts to geoJson
      var result = {
        'features': []
      };
      for (var i = 0; i < response.relatedRecordGroups.length; i++) {
        for (var k = 0; k < response.relatedRecordGroups[i].relatedRecords.length; k++) {
          result.features.push(response.relatedRecordGroups[i].relatedRecords[k]);
        }
      }
      callback.call(context, error, (response && L.esri.Util.responseToFeatureCollection(result)), response);
    }, context);
  }

  // no clue why i ever included this originally.  object's hardcoded 'path' property is appended to featureLayer url in Task.Request automatically.
  // layer: function(layer) {
  //   this.path = layer + '/queryRelatedRecords';
  //   return this;
  // }
});

// attach to the L.esri global if available
if (typeof window !== 'undefined' && window.L && window.L.esri) {
  window.L.esri.Tasks.queryRelated = function(endpoint) {
    return new L.esri.Tasks.QueryRelated(endpoint);
  };
}