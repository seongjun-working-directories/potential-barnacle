<template>
    <h1>{{title}}</h1>
</template>
<script>
    import { inject } from 'vue'; // inject 추가
    export default {
        setup() {
            /* eslint-disable */
            const title = inject('title');
            // inject 메서드를 통해 provide 메서드에서 정의한 key로 데이터를 전달받음

            return {
                title
            };
        }
    }
</script>