// ParentSlotComponent.vue 자식 컴포넌트 내용을 정의하는 상위 컴포넌트 
<template>
  <div>
    <child-slot-component>
      <template v-slot:header>
        <h1>여기에 Header의 내용을 넣을거에요 👶🏻</h1>
      </template>
      <h3>이부분은 어디에 들어갈까요?</h3>
      <template v-slot:footer>
        <h1>Footer 를 정의합니다. 🦶🏻</h1>
      </template>
    </child-slot-component>
  </div>
</template>

<script>
import ChildSlotComponent from './ChildSlotComponent.vue'

export default {
  name: 'App',
  components: {
    ChildSlotComponent
  }
}
</script>