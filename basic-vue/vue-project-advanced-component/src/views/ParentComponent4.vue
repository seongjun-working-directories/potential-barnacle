<template>
    <div>
        <!--
            부모 컴포넌트에서 자식 컴포넌트의 데이터 옵션 값 동기화
            => 부모 컴포넌트에서 computed를 이용하면,
            => 자식 컴포넌트에 정의된 데이터 옵션값의 변경사항을 항상 동기화 가능
        -->
        <button type="button" @click="checkChild">
            자식 컴포넌트 데이터 조회
        </button>
        <ChildComponent4 ref="child_component" />
    </div>
</template>
<script>
import ChildComponent4 from './ChildComponent4.vue';

export default {
        components: {
            ChildComponent4,
            ChildComponent4
        },
        // 부모 컴포넌트의 computed 옵션을 사용해
        // 자식 컴포넌트의 msg 값을 감지하도록 설정
        computed: {
            msg() {
                return this.$refs.child_component.msg;
            }
        },
        methods: {
            checkChild() {
                alert(this.msg);
            }
        }
    }
</script>