const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// webpack의 공식문서 --> https://webpack.js.org/concepts/
module.exports = {
    name: 'word-chain-setting',
    mode: 'development',
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
                // https://github.com/browserslist/browserslist
                // @babel/preset-env는 targets로 지원할 브라우저를 선택할 수 있음
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            // 한국에서 브라우저 점유율이 1% 이상인 브라우저를 모두 지원
                            browsers: ["> 1% in KR"]
                        },
                    }],
                    '@babel/preset-react',
                ],
                plugins: [],    
            },
        }],
    },

    // Webpack에서 기본적으로 적용되는 모듈이나 규칙 외에
    // 추가적으로 확장 프로그램을 넣고자 하는 경우 사용
    plugins: [
        // 모듈 안에 있는 모든 옵션에 debug 속성을 true로 설정함
        new webpack.LoaderOptionsPlugin({debug: true}),
        new RefreshWebpackPlugin(),
    ],
    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        // publicPath는 실제 경로를 의미
        publicPath: '/dist',
    },

    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: {directory: path.resolve(__dirname)},
        hot: true,
    },
};