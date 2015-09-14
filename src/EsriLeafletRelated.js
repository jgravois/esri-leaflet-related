export var VERSION = '2.0.0';

import { Task, Util } from 'esri-leaflet';

export var Query = Task.extend({
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

    // http://resources.arcgis.com/en/help/arcgis-rest-api/#/Query_Related_Records/02r300000115000000/

    initialize: function (endpoint) {
      // don't replace parent initialize, either pass FeatureLayer._service or the raw options object
      if (endpoint.service) {
        Task.prototype.initialize.call(this, endpoint.service);
      } else {
        Task.prototype.initialize.call(this, endpoint);
      }
    },

    simplify: function (map, factor) {
      // not sure if there's a better way to port L.esri.Tasks.Query.simplify() than just copy/pasting the function
      var mapWidth = Math.abs(map.getBounds().getWest() - map.getBounds().getEast());
      this.params.maxAllowableOffset = (mapWidth / map.getSize().y) * factor;
      return this;
    },

    run: function (callback, context) {
      return this.request(function (error, response) {
        // if more than one objectId is specified, we loop through the features and pass a single collection to the utility method which converts to geoJson
        var result = {
          'features': []
        };
        for (var i = 0; i < response.relatedRecordGroups.length; i++) {
          for (var k = 0; k < response.relatedRecordGroups[i].relatedRecords.length; k++) {
            result.features.push(response.relatedRecordGroups[i].relatedRecords[k]);
          }
        }
        callback.call(context, error, (response && Util.responseToFeatureCollection(result)), response);
      }, context);
    }
  });

export function query (options) {
  return new Query(options);
}

export default query;
