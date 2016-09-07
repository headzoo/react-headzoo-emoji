'use strict';

module.exports = {
    entry: './src/index.js',
    output: {
        path: './',
        filename: 'index.js',
        library: 'react-headzoo-emoji',
        libraryTarget: 'umd'
    },
    externals: [
        {
            "react": {
                root: "react",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            },
            "react/lib/CSSPropertyOperations": {
                root: "react/lib/CSSPropertyOperations",
                commonjs2: "react/lib/CSSPropertyOperations",
                commonjs: "react/lib/CSSPropertyOperations",
                amd: "react/lib/CSSPropertyOperations"
            },
            "twemoji": {
                root: "twemoji",
                commonjs2: "twemoji",
                commonjs: "twemoji",
                amd: "twemoji"
            }
        }
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};