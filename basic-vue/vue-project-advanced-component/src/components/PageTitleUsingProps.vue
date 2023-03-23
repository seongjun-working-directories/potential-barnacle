<!--
    부모 컴포넌트에서 자식 컴포넌트로 데이터 전달하기 : Props
    PageTitleUsingProps 컴포넌트를 호출할 때, 각 페이지의 실제 타이틀을 데이터로 전달하고,
    PageTitleUsingProps는 해당 데이터를 받아 출력하는 식으로 작동
-->
<template>
    <!-- 자식 컴포넌트 -->
    <div>
        <h2>{{title}}</h2>
    </div>
</template>
<script>
    export default {
        // props에는 부모 컴포넌트로부터 전달받은 데이터가 저장됨
        props: {
            // 전달받은 데이터 명
            title: {
                // 전달받은 데이터 타입
                type: String,
                // 전달받지 않은 경우의 default 값
                default: '페이지 제목입니다.'
            }
        }
    }
</script>