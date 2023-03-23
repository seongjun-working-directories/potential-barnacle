import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixin from './mixins/mixin.js'
import i18nPlugin from './plugins/i18n.js'

const i18nStrings = {
    en: {
        hi: 'Hello!'
    },
    ko: {
        hi: '안녕하세요!'
    }
}

// 믹스인 파일을 전역으로 등록
createApp(App).use(i18nPlugin, i18nStrings).use(router).mixin(mixin).mount('#app')
