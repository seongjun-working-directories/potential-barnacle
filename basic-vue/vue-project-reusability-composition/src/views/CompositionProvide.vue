<template>
    <CompositionInject />
</template>
<script>
    import { provide } from 'vue';  // provide 추가
    import CompositionInject from './CompositionInject.vue';

    export default {
        /* eslint-disable */
        components: {
            CompositionInject
        },
        setup() {
            provide('title', 'Vue.js 프로젝트');
            // provide 메서드를 통해 자식 컴포넌트에 (key, value) 쌍을 보냄
        }
    }
</script>