import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'

// mixin 메서드를 통해 공통 함수를 등록함
createApp(App).use(router).mixin(mixins).mount('#app')