const { defineConfig } = require('@vue/cli-service')
// const Dotenv = require('dotenv-webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config)=>{
    config.plugins.delete('prefetch');
  },
  devServer: {
    proxy: {
        '/oauth2.0': {
            target: 'https://nid.naver.com'
        }
    }
  },
  // dotenv-webpack
  // configureWebpack: {
  //   plugins: [
  //     new Dotenv(),
  //   ]
  // }
});