<template>
  <div>
    <h2>Calculator</h2>
    <div>
      <!-- @keyup이 빠짐 : computed로 값의 변경을 감시하고 있기 때문 -->
      <input type="text" v-model="num1" />
      <span>+</span>
      <input type="text" v-model="num2" />
      <span>={{ result }}</span>
    </div>
  </div>
</template>
<script>
  import {reactive, computed, toRefs} from 'vue';
  // toRef
  // toRef는 하나의 property에 대해 부모 object와의 연결성을 유지한채로 reactive를 반환
  // 이 복사본의 변화는 부모에게도 반영이 되어 추적

  // toRefs
  // toRefs는 reactive의 모든 프로퍼티 대해 toRef를 적용해 반환
  // 따라서, 디스트럭처링을 사용할 수 있음

  // ref, toRef, toRefs 모두 원시타입의 value 값도 Proxy를 추적할 수 있도록 reference를 부여
  // 기존의 reactive를 사용하면서 불편했던 array 상태들도 편리하게 사용 가능

  function plusCalculator() {
    let state = reactive({
      num1: 0,
      num2: 0,
      // 값이 변동되는 즉시 추적하여 result 값을 변경함
      result: computed(() => parseInt(state.num1) + parseInt(state.num2)),
    });
    // 반응형으로 선언된 num1, num2, result가
    // 외부 function에서 반응형으로 정상 동작하려면 toRefs를 사용해야 함
    return toRefs(state);
  }

  export default {
    /* eslint-disable */
    name: "Calculator",
    setup() {
      let {num1, num2, result} = plusCalculator();
      return {
        num1, num2, result
      };
    },
  };

  /*
  plusCalculator 처럼 외부에서 주입하지 않고, 내부에서 선언하는 경우:
  '''
  export default {
    name: "Calculator",
    setup() {
      let state = reactive({
        num1: 0,
        num2: 0,
        result: computed(()=>parseInt(state.num1)+parseInt(state.num2))
      });
      return {
        state
      }
    }
  }
  // 또한, v-model="num1" 등도 v-model="state.num1"을 변경해야 함
  '''
  */
</script>