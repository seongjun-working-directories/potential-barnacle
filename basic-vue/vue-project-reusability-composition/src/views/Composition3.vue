<template>
    <div>
        <h2>Calculator</h2>
        <div>
            <input type="text" v-model="num1" />
            <span>+</span>
            <input type="text" v-model="num2" />
            <span>={{result}}</span>
        </div>
    </div>
</template>
<script>
    import {plusCalculator} from '../commons/common.js';

    export default {
        /* eslint-disable */
        name: 'Calculator',
        setup() {
            let {num1, num2, result} = plusCalculator();
            return {
                num1, num2, result
            };
        }
    }
</script>

<!--
    [ Setup() 사용 시 Lifecycle Hooks ]
    컴포지션 API 내에서 사용 가능한 컴포넌트 라이브 사이클 훅
    => onBeforeMount, onMounted, onBeforeUpdate, onUpdated,
    => onBeforeUnmount, onUnmounted, onErrorCaptured, onRenderTracked, onRenderTriggered

    setup()은 컴포넌트 라이프사이클의 beforeCreate와 created 훅 사이에서 실행되기 때문에,
    onBeforeCreate, onCreated 훅은 필요 없고, setup() 안에서 코드를 작성하면 됨

    '''
    export default{
        setup() {
            // mounted
            onMouted(()=>{
                console.log('Component is mounted!')
            });
        }
    }
    '''
-->