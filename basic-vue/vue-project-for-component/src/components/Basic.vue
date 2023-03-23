<template>
    <div></div>
</template>
<script>
    export default {
        name: '',       // 컴포넌트명
        components: {}, // 다른 컴포넌트 사용 시 컴포넌트를 import 하고 배열로 저장
        data() {        // html과 js 코드에서 사용할 데이터 변수 선언
            return {
                sampleData: ''
            }
        },
        setup() {},     // 컴포지션 API
        created() {},   // 컴포넌트가 생성되면 실행
        mounted() {},   // template에 정의된 html 코드가 렌더링된 후 실행
        unmounted() {}, // unmount가 완료된 후 실행
        methods: {}     // 컴포넌트 내에서 사용할 메서드 정의
    }
</script>