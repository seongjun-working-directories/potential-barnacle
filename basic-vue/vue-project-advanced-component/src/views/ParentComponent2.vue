<template>
    <div>
        <!-- 부모 컴포넌트에서 자식 컴포넌트의 데이터 옵션값 직접 변경 -->
        <child-component @send-message="sendMessage" ref="child_component" />
        <button type="button" @click="changeChildData">Change Child Data</button>
    </div>
</template>
<script>
    import ChildComponent2 from '../views/ChildComponent2.vue'
    export default {
        components: {
            ChildComponent2
        },
        methods: {
            changeChildData() {
                this.$refs.child_component.msg='부모 컴포넌트가 변경한 데이터'
            }
        }
    }
</script>