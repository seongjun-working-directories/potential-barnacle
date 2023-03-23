<template>
    <ProvideInjectChild />
</template>
<script>
import ProvideInjectChild from './ProvideInjectChild.vue';

export default {
    components: {
        ProvideInjectChild
    },
    data() {
        return {
            items: ['a', 'b', 'c']
        };
    },
    // Provide/Inject는 계층 구조에 관계 없이 바로 보내고자 하는 데이터를 전달할 수 있음
    // 자식 컴포넌트로 전달하고자 하는 데이터를 provide에 정의
    // ex) provide() 함수를 통해 배열 items의 length를 반환
    provide() {
        return {
            itemLength: this.items.length
        };
    }
    // 단, Provide/Inject의 단점은,
    // 자식 컴포넌트에서 전달받은 데이터가 어떤 부모 컴포넌트로부터 전달되었는지 확인할 수 없다는 것
}
</script>