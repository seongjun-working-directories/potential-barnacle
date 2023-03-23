const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config=>{
    config.plugins.delete('prefetch');  // prefetch 삭제
  }
  // prefetch 기능을 꺼도 lazy load 방식으로 컴포넌트를 사용할 수 있음
  // 단, 다음과 같이 작성해야 함
  // import(/* webpackPrefetch: true */ './views/About.vue');
  // 사용자의 접속 빈도가 낮은 컴포넌트에 대해 prefetch 적용 권장
})
