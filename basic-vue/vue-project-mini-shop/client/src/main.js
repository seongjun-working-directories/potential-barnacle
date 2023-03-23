import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mixins from './mixins/mixins.js';
import store from './store/store.js';

// SweetAlert2 라이브러리는기존의 alert 창보다 다양한 디자인과 색감으로 디자인이 된 alert 창
// https://www.jsdelivr.com/package/npm/sweetalert2 --> dist 안의 css와 js
// https://inpa.tistory.com/entry/SweetAlert2-%F0%9F%93%9A-%EC%84%A4%EC%B9%98-%EC%82%AC%EC%9A%A9
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


createApp(App)
    .use(router)
    .mixin(mixins)
    .use(store)
    .use(VueSweetalert2)
    .mount('#app');

// Kakao Developer에서 발급받은 Javascript 키
window.Kakao.init('5b490d75a6475d3fbabe6434d9e1a62c');