<template>
    <!-- 부모 컴포넌트에서 자식 컴포넌트의 버튼을 클릭하는 이벤트 -->
    <button type="button" @click="childFunc" ref="btn">CLICK</button>
    <!-- ref='btn'을 통해 자식 컴포넌트의 버튼 객체에 접근할 수 있도록 함 -->
</template>
<script>
    export default {
        methods: {
            // 1
            childFunc() {
                alert('부모 컴포넌트에서 직접 발생시킨 이벤트');
            },
            // 2
            callFromParent() {
                console.log('부모 컴포넌트에서 직접 호출한 함수');
            }
        }
    }
</script>