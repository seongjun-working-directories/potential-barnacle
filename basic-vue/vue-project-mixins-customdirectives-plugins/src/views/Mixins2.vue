<!-- eslint-disable -->
<template>
    <div>
        <p>Sample</p>
    </div>
</template>
<script>
import mixin from '../mixins/mixin.js';

// 컴포넌트에서는 mounted 훅이 발생할 때 믹스인의 방문 시작 메서드를 호출하고,
// unmounted 훅이 발생할 때 믹스인의 방문 종료 메서드를 호출
export default {
    mixins: [mixin],

    // 컴포넌트가 mounted/unmounted 되는 시점에 믹스인에 있는
    // mounted/unmounted 코드가 먼저 실행됨
    mounted() {
        console.log('컴포넌트 mounted');
    },
    unmounted() {
        console.log('컴포넌트 unmounted');
    }
}
</script>