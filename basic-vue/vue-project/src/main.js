import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// use 메서드를 통해 라우터를 등록
createApp(App).use(router).mount('#app')
