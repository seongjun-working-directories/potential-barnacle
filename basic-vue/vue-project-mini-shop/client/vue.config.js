const { defineConfig } = require('@vue/cli-service');


const target = 'http://127.0.0.1:3000';

module.exports = defineConfig({
  transpileDependencies: true,

  // Proxy 서버를 추가함
  // 이유는 Vue 프로젝트는 클라이언트로, Nodejs 프로젝트는 서버로
  // 각각 별도의 포트로 실행시킬 것이기 때문
  // 이렇게 클라이언트와 서버의 포트가 다른 경우,
  // HTTP 통신을 위해 프록시 서버를 추가해야 CORS 문제를 해결할 수 있음
  devServer: {
    port: 8080,
    proxy: {
      '^api': {
        target,
        changeOrigin: true
      },
      '^/upload': {
        target,
        chagneOrigin: true
      },
      '^/downlaod': {
        target,
        changeOrigin: true
      }
    }
  }
});