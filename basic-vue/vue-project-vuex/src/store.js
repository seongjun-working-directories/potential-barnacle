import {createStore} from 'vuex';

/*
Vuex는 store에 데이터를 저장하고, 프로젝트 전체에서 사용할 수 있도록 함

[ Vuex 저장소 vs 일반 전역 객체 ]
Vuex store는 반응형
=> (1) Vue 컴포넌트는 저장소의 상태(state)를 검색할 때,
=> (1) 저장소의 상태에 정의된 변수 값의 변경 여부를 바로 알 수 있음
=> (2) 저장소의 상태는 직접 변경이 불가능하며 상태를 변경하려면,
=> (2) 명시적 커밋을 이용한 변이(mutation)를 이용해야 함
*/

const store = createStore({
    // 상태 : 모든 객체에서 쓰고자 하는 변수를 모아둠
    // state 관리를 통해 모든 컴포넌트에서 동일한 값 사용 가능
    state() {
        return {
            // state 속성의 반환값에 count 등록
            count: 0,
            cart: [{
                product_id: 1,
                product_name: '거치대',
                category: 'A'
            }],
        };
    },

    // 변이 : 값의 변화를 일으키는 메서드들을 모아둠
    // mutations는 비동기(Async)가 아닌 동기(Sync) 처리를 통해
    // state에 정의된 변수의 변경사항을 추적할 수 있도록 함
    mutations: {
        increment(state) {
            state.count++;
        },
        /*
        아래와 같이 표현 가능
        increment : (state, [payload: option]) => {
            state.count++;
            console.log(payload);
        }
        */
    },

    // getter 메서드를 통해 state에 담긴 변수의 값 등을 쉽게 가져올 수 있음
    getters: {
        cartCount: (state)=>{
            return state.cart.length;
        }
    },

    // action을 통해 mutations에 정의된 함수 실행
    // actions에 정의된 함수 내에서 여러 개의 mutations 실행 가능
    // mutations와 달리 action은 비동기 작업 가능
    // => actions에 등록된 함수는 비동기 처리 후 mutations를 커밋할 수 있음
    // => 저장소(store)에서 비동기 처리 로직 관리 가능
    actions: {
        increment(context) {
            context.commit('increment')
        }
    }
});

export default store;

/*
이제 src/main.js를 수정해서 vue인스턴스를 생성할 때 store 객체를 전달한다. 아래의 코드를 작성하면 각 자식 컴포넌트에서 저장소(Store) 객체를 this.$store으로 접근할 수 있게된다.
'''
import Vue from 'vue'
import TodoList from './components/TodoList.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(TodoList)
}).$mount('#app')
'''
*/

/*
[ 실무 예제 ]
import {createStore} from 'vuex';
// npm install  vuex-persistedstate
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    state() {
        return {
            user: {}
        }
    },
    mutations: {
        user(state, data) {
            state.user = data;
        }
    },
    plugins: [
        persistedstate({
            paths: ['user']
        })
    ]
});

export default store;
*/