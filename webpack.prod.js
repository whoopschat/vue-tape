const baseConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = Object.assign({}, baseConfig, {
    plugins: [
        new UglifyJsPlugin(),
        ...baseConfig.plugins
    ],
    mode: 'production',
});

module.exports = config;
