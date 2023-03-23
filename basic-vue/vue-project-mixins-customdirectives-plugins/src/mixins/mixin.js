export default {
    mounted() {
        console.log('믹스인 mounted')
    },
    unmounted() {
        console.log('믹스인 unmounted')
    }
}
// 생성한 mixins는 Vue 컴포넌트에서 사용하기 위해
// main.js에 등록해야 함