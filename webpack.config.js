'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3003',
        'webpack/hot/only-dev-server',
        './src/demo.js'
    ],
    output: {
        path: './',
        filename: 'demo.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                include: __dirname,
                query: {
                    presets: [ 'es2015', 'react' ]
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};