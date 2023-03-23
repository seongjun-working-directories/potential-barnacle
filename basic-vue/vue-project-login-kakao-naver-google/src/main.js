import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

// Kakao Developers에서 발급받은 앱 키
window.Kakao.init('f36c26e021718393c30de12f28f11610');