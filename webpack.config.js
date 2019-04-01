const path = require('path');
const rules = require('./webpack.rules.js');

const config = {
    entry: path.resolve('./src/index.js'),
    output: {
        path: path.resolve('./lib'),
        publicPath: '/lib/',
        filename: 'index.js',
        library: 'Tape',
        libraryTarget: 'umd',
    },
    externals: {
    },
    module: {
        rules,
    },
    plugins: [
    ],
    devtool: 'source-map',
};

module.exports = config;
