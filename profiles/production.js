import uglify from 'rollup-plugin-uglify';
import config from './base.js'

config.dest = 'dist/esri-leaflet-related.js';
config.sourceMap = 'dist/esri-leaflet-related.js.map';
config.plugins.push(uglify());

export default config;
