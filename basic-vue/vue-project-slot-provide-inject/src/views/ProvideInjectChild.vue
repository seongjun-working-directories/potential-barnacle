<template>
    <div>itemLength in ProvideInjectChild: {{itemLength}}</div>
</template>
<script>
    export default {
        // 부모 컴포넌트로부터 전달받고자 하는 데이터와 동일한 속성 이름으로
        // inject에 문자열 배열로 정의
        inject: ['itemLength'],
        mounted() {
            console.log(this.itemLength);
        }
    }
</script>