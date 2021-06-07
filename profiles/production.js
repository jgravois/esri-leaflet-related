import { uglify } from 'rollup-plugin-uglify';
import config from './base.js';

config.output.file = 'dist/esri-leaflet-related.js';
config.sourceMap = 'dist/esri-leaflet-related.js.map';
config.plugins.push(uglify({ output: { comments: /Institute, Inc/ } }));

export default config;
