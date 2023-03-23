<template>
    <div>
        <ChildComponent @send-message="sendMessage" ref="child_component" />
    </div>
</template>
<script>
    import ChildComponent from './ChildComponent.vue'

    export default {
        components: {
            ChildComponent,
        },
        // 부모 컴포넌트에서 자식 컴포넌트에 $refs를 사용해 접근하면,
        // 자식 컴포넌트 내에 정의된 모든 함수 호출 가능
        mounted() {
            // 1 : 태그 접근
            this.$refs.child_component.$refs.btn.click();
            // 2 : 함수 접근
            this.$refs.child_component.callFromParent();
        }
    }
</script>