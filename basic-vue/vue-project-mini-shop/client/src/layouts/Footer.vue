<!--
    일반적으로 Header 영역에는 애플리케이션 로고, 메뉴에 해당하는 내비게이션 등이 있고,
    Footer에는 애플리케이션을 제공하는 회사 정보를 입력함
    보통 Header, Footer는 애플리케이션 내에서 메뉴가 이동하여도 바뀌지 않으므로,
    별도의 Header.vue, Footer.vue 컴포넌트로 만들어서 관리함
-->
<template>
    <footer class="mt-5 py-5 bg-dark text-white">
        &copy; 2022
    </footer>
</template>

<script>
/* eslint-disable */
export default {
    name: 'footer'
}
</script>