/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');

const libraryName = 'connectHandlers';

const config = {
    entry: __dirname + '/src/connectHandlers.js',
    output: {
        path: __dirname + '/lib',
        filename: libraryName + '.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: ['/src'],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    }
};

module.exports = config;
