const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './Source/ol-extensions-debug.js',
    output: {
        filename: 'ol-extensions.js',
        path: path.resolve(__dirname, './Build'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.cm\.styl$/,
                loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
            }
        ]
    },
    externals: [
        nodeExternals(),
    ],
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './Source/ol-extend.css', to: './style' },
            ]
        }),
    ]
};