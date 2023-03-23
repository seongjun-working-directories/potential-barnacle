const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// 개발 모드가 아닌 배포 모드로 변경하고자 하는 경우
// process.env.NODE_ENV = 'production';
// 개발 모드가 아닌 배포 모드로 변경하고자 하는 경우
// mode: 'production',

module.exports = {
    name: 'bulls-and-cows-setting',
    mode: 'development',
    // mode: 'production',
    devtool: 'eval',
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
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname)},
        hot: true,
    },
};