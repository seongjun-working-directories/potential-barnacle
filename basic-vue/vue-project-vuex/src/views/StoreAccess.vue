<!-- Vuex의 store는 Vue 컴포넌트에서 this.$store로 접근 가능함 -->
<template>
    <div>
        <p>
            Count : {{count}}
        </p>
        <button type="buttton" @click="increment">
            INCREMENT
        </button>
        <br/>
        <p>
            CartCount : {{cartCount}}
        </p>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
    setup() {
        const $store = useStore();
        const count = computed(()=>{
            return $store.state.count;
        });
        const cartCount = computed(()=>{
            return $store.getters.cartCount;
        });
        const increment = ()=>{
            $store.commit('increment');
        };

        return {count, cartCount, increment}
        
    }
    
    /*
    // state에 정의된 변수는 Vue 컴포넌트에서 computed 속성을 통해
    // 그 변경사항을 항상 추적 가능
    computed: {
        count : ()=>{
            return this.$store.state.count;
        },
        cartCount() {
            // getter가 반환하는 cartCount 값을 computed가 추적
            return this.$store.getters.cartCount;
        }
    },
    methods: {
        
        // 화면에서 일어나는 이벤트를 받아 처리하는 메서드에서
        // 변이(mutation)을 일으키기 위해 this.$store.commit() 메서드를 호출
        // this.$store.commit() 메서드의 첫 번째 인자는 변이의 이름
        // 변이에 전달할 인자는 payload 인자를 이용하면 됨
        // 변이의 이름은 단순한 문자열이기 때문에 오타를 내기 쉬우므로
        // Constant.js와 같은 상수를 만들어 사용할 것을 권장
        
        increment() {
            // mutations에 정의된 함수를 commit으로 호출해
            // 저장소의 state에 정의된 변수 값을 변경
            this.$store.commit('increment');
        }
    }
    */
}
</script>