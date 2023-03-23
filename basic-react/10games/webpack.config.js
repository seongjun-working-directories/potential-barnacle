const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'game-matcher-setting',
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ["> 1% in KR"]
                        },
                    }],
                    '@babel/preset-react',
                ],
                plugins: [],
            },
        }],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
        new RefreshWebpackPlugin(),
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist',
    },

    devServer: {
        historyApiFallback: true,
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname)},
        hot: true,
    },
};