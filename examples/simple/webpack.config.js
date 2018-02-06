const webpack = require('webpack');
const path = require('path');

module.exports = (() => {
    const rootPath = path.join(__dirname, '.');
    const srcPath = path.join(rootPath, 'src');

    return {
        entry: './src/index.js',
        target: 'node',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'index.js',
            libraryTarget: 'umd',
            umdNamedDefine: true,
        },
        resolve: {
            modules: [srcPath, path.join(rootPath, 'node_modules')],
            extensions: ['.js'],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                    },
                    include: [srcPath],
                },
            ],
        },
    };
})();
