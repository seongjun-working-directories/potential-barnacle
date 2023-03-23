import { createStore } from 'vuex';

// 모든 컴포넌트에서 사용자가 로그인 했는지에 대한 정보가 필요함
// 이럴 때, persistedstate를 사용할 수 있음
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    // state : 모든 객체에서 쓰고자 하는 변수를 모아둠
    state() {
        return {
            user: {}
        }
    },

    // mutations : 값의 변화를 일으키는 메서드들을 모아둠
    // mutations는 비동기(Async)가 아닌 동기(Sync) 처리를 통해
    // state에 정의된 변수의 변경사항을 추적할 수 있도록 함
    mutations: {
        user(state, data) {
            state.user = data;
        }
    },

    // Vuex 저장소는 각 변이에 대한 훅을 노출하는 plugins 옵션을 허용
    plugins: [
        // 일반 웹브라우저에서 띄운 경우 습관적으로 뒤로가기 버튼을 클릭 할 때 화면이 새로고침이 됨
        // 또는 기타 다른 이유로 화면을 새로고침하는 경우가 발생하게 되는데
        // 이럴 때 지금까지 vuex의 store에 가지고 있거나 계산되어져 있던 모든 값들이 초기화 되어버리는 상황이 발생
        // 이때, localstorage를 이용하여 값들을 다시 살려내주는 기능을 하는 것이 vuex-persistedstate 플러그인
        // vuex를 사용하는 프로젝트는 프로젝트 전체에서 사용되는 변수를 store의 state에 저장을 하고 사용
        // 그러면 vuex-persistedstate는 이 state에 저장된 변수와 값을 그대로 웹브라우저의  localstorage에 업데이트 함
        persistedstate({
            // 모듈을 paths 배열 안에 입력함
            paths: ['user']
        })
    ]
});

export default store;