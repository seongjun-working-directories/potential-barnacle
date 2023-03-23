<template>
<!--
    애플리케이션 개발 시, 팝업, 페이지, 타이틀 등 애플리케이션 전반에 걸쳐
    다수의 컴포넌트에서 공통으로 사용해야 하는 공통 UI 요소는
    반드시 프로젝트 초기에, slot 기반의 컴포넌트로 만들어져 제공되어야 함
-->
    <div>
        <slot-modal-layout>
            <!-- v-slot 대신 단축어로 '#' 사용 가능 -->
            <!-- <tempalte #header -->
            <template v-slot:header>
                <h1>팝업 타이틀</h1>
            </template>
            <template v-slot:default>
                <p>팝업 콘텐츠 1</p>
                <p>팝업 콘텐츠 2</p>
            </template>
            <template v-slot:footer>
                <button type="button">닫기</button>
            </template>
        </slot-modal-layout>
    </div>
</template>
<script>
    import SlotModalLayout from './SlotModalLayout.vue'
    export default {
    name: "SlotUseModalLayout",
    components: {
        SlotModalLayout
    },
}
</script>