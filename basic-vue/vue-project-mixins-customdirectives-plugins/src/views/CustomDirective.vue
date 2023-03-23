<!-- 아래의 전역 등록 방법이 아닌, 컴포넌트 내에서 등록해서 사용하는 방법 -->
<template>
    <div>
        <input type="text" v-focus />
        <br/>
        <p v-pin="position">
            페이지 고정 영역(position:fixed;top:50px;left:100px;)
        </p>
    </div>
</template>
<script>
export default {
    directives: {
        focus: {
            mounted(el) {
                el.focus()
            }
        },
        // 커스텀 디렉티브 사용 시에도 데이터 바인딩 처리 가능
        // ex) v-pin 디렉티브에 데이터 옵션의 position을 바인딩 등
        pin: {
            mounted(el, binding) {
                el.style.position = 'fixed';
                el.style.top = binding.value.top + 'px';
                el.style.left = binding.value.left + 'px';
            } 
        }
        /*
        And here are the Vue 3 directive hooks:
        created         – called before the element’s attributes or event listeners are applied.
        beforeMount     – same as the old bind hook
        mounted         – same as the old inserted hook
        beforeUpdate    – called before the element itself is updated (like lifecycle hooks)
        updated         – same as the old componentUpdated hook
        beforeUnmount   – called before an element is unmounted (like lifecycle hooks)
        unmounted       – same as old unbind hook

        When implementing these hooks, they each have a few arguments that they accept.
        el          – the directive is bound to this element; gives you access to modify it
        binding     – an object contain a lot of properties; we’ll go into depth in a second
        vnode       – the virtual node
        prevVnode   – the previous virtual node (only available in update hooks)
        */
    },
    data() {
        return {
            position: {top: 50, left: 100}
        }
    }
}
</script>

<!--
    v-model, v-show와 같은 기본 디렉티브 외에도 사용자가 직접 디렉티브 정의 가능

    ex)
    웹 사이트 방문 시 로그인 페이지에 접속하면,
    페이지가 열림과 동시에 사용자 ID를 입력하는 필드에 마우스 포커스가 위치하는 것
    '''
    // main.js에 다음과 같이 등록하면,
    const app = createApp(App);
    app.directives('focus', {
        mounted(el) {
            el.focus()
        }
    });

    // 컴포넌트에서 v-focus 디렉티브로 해당 기능 사용 가능
    <input type="text" v-focus />
    '''
-->