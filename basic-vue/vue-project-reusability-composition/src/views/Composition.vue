<!--
    [ composition api ]
    컴포지션 api를 사용함으로 setup 함수에 데이터가 그룹핑 되어
    용이하게 데이터의 흐름을 파악하고 유지보수 가능

    [ setup ]
    setup 훅 내부에 data와 function을 구성
    반응형 data를 만들 때는 ref와 reactive를 사용
    '''
    <template>
        <div class="home">
            <p>{{ person1.name }} {{ person1.value }}</p>
            <button @click="handleClick">click</button>
        </div>
    </template>
    <script>
        import { ref, reactive } from "vue";

        export default {
            name: "HOME",
            setup() {
                // 데이터를 ref, reactive로 감싸면 반응형으로 바뀝니다.
                const person1 = ref({ name: "nkh", age: 29 });
                const person2 = reactive({ name: "nki", age: 26 });

                const handleClick = () => {
                // ref로 감싼 값을 변경할 때는 value로 한번 들어가주고 값을 바꿉니다.
                person1.value.age = 30;

                // reactive는 바로 값을 바꿉니다.
                person2.age = 30;
                };

                // ref값은 return을 거치게되면 person1.value.age는 person1.age로 바뀝니다. (template에서는 person1.age로 사용합니다)
                return { person1, handleClick };
            }
        };
    </script>
    '''

    [ ref vs reactive ]
    ref는 function에서 값을 변경할 때 ref.value를 넣어주고 값을 바꾸나 reactive는 바로 값을 바꿀 수 있습니다.
    reactive는 원시값에 대해서는 반응형을 가지지 않습니다.
    (string, number 값은 값을 바꾸어도 reactive하게 리렌더링 되지 않습니다.)
    그래서 객체나 배열을 사용하는 경우에만 reactive를 사용할 수 있습니다.
    그러나 ref는 원시값도 반응형 값으로 취급되어 리렌더링 됩니다.
    reactive나 ref나 둘 중 하나만 사용하는 것이 옳다고 생각합니다.
    그런데 reactive는 원시값을 반응형으로 사용되지 않기 때문에 ref를 처음부터 끝까지 사용하는 것이 좋다고 생각합니다.
-->

<!--
'''
<template>
    <div>
        <h2>Calculator</h2>
        <div>
            <input type="text" v-model="num1" @keyup="plusNumbers" />
            <span>+</span>
            <input type="text" v-model="num2" @keyup="plusNumbers" />
            <span>={{result}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Calculator',
        data() {
            return {
                num1: 0,
                num2: 0,
                result: 0,
            };
        },
        methods: {
            plusNumbers() {
                this.result = parseInt(this.num1) + parseInt(this.num2);
            }
        }
    }
</script>
'''
-->

<template>
    <div>
        <h2>Calculator</h2>
        <div>
            <!-- @keyup : 키보드의 키를 눌렀다 뗐을 때 -->
            <input type="text" v-model="state.num1" @keyup="plusNumbers" />
            <span>+</span>
            <input type="text" v-model="state.num2" @keyup="plusNumbers" />
            <span>={{state.result}}</span>
        </div>
    </div>
</template>
<script>
    import {reactive} from 'vue';

    export default {
        /* eslint-disable */
        name: 'Calculator',
        setup() {
            let state = reactive({
                num1: 0,
                num2: 0,
                result: 0,
            });

            function plusNumbers() {
                state.result = parseInt(state.num1) + parseInt(state.num2);
            }

            return {
                state,
                plusNumbers
            };
        }
    }
</script>