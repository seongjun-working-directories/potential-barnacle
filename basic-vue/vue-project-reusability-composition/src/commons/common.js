// 컴포넌트 내에서 정의된 코드를 다른 컴포넌트에서도 사용할 수 있도록
// Composition2.vue의 plusCalculator()를 다음과 같이 뺄 수 있음
import { reactive, computed, toRefs } from 'vue';

const plusCalculator = ()=>{
    let state = reactive({
        num1: 0,
        num2: 0,
        result: computed(()=>parseInt(state.num1)+parseInt(state.num2))
    });
    return toRefs(state);
};

// Composition3.vue가 export된 plusCalculator를 사용하는 예제
export {
    plusCalculator
};