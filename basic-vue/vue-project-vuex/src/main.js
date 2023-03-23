import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'

// vuex를 전역에 등록해야 모든 컴포넌트에서 사용 가능함
createApp(App).use(router).use(store).mount('#app')
