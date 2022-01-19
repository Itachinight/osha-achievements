const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');

config.optimization.splitChunks = {
    cacheGroups: {
        default: false
    }
};

delete config.devtool;
config.optimization.runtimeChunk = false;
config.output.filename = 'static/js/achievements.min.js';
config.plugins[5].options.filename = 'static/css/achievements.css';