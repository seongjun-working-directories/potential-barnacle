<template>
    <div>
        <!--
            Event 처리(v-on)
            => v-on 대신 @을 사용할 수도 있음
        -->
        <div>
            <input type="number" v-model.number="initialNumber" />
            <button type="button" @click="setCounter">SET</button>
            <button type="button" @click="increaseCounter">ADD</button>
            <p>COUNTER: {{counter}}</p>
        </div><br/>

        <!-- @click에 여러 메서드를 붙이는 것도 가능 -->
        <div>
            <button type="button" @click="one(), two()">Click</button>
        </div><br/>

        <!-- select에서 옵션을 바꿀 때마다 Change 이벤트가 발생 -->
        <div>
            <select v-model="selectedValue" @change="changeSelect">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div><br/>

        <!--
            Key 이벤트는 사용자가 키보드 자판을 입력할 때 발생하는 이벤트
            네이버 검색창에서 검색 버튼을 마우스로 클릭하지 않고,
            엔터 키를 누르고도 검색어가 조회되도록 하는 기능도 key 이벤트를 활용한 것
            ex) <input @keyup.enter="submit" />
            keyup.enter 이외에도 .up, .down, .tab, .delete, .left, .right, .esc, .space 등이 있음

            alt + enter 등 두 가지 키를 동시에 입력해야할 때는 다음과 같이 작성
            // alt + enter
            ex) <input @keyup.alt.enter="clear" />
            // ctrl + click
            ex) <div @click.ctrl="doSomething">Do Something</div>
        -->

        <!-- computed vs watch -->
        <!--
            computed는 정의된 데이터값을 바탕으로 새로운 데이터 값을 생성하고,
            새로운 데이터 값에서 참조하고 있는 기존 데이터 값의 변경을 감지
            또한 참조하고 있는 데이터 값의 변경과 상관업싱 최초의 computed에 정의된
            데이터 함수를 실행함

            watch는 초기 할당된 값에서 변경이 일어나야만 watch에 정의된 함수를 실행함
        -->
        <div>
            <h1>Full Name: {{fullname}}</h1>
            <input type="text" v-model="first" />
            <input type="text" v-model="last" />
            <button type="button" @click="setname">Click</button>
        </div>
        
    </div>
</template>
<script>
    export default {
        /* eslint-disable */
        name: 'Handle Event and Computed, Watch',       // 컴포넌트명
        components: {}, // 다른 컴포넌트 사용 시 컴포넌트를 import 하고 배열로 저장
        data() {        // html과 js 코드에서 사용할 데이터 변수 선언
            return {
                initialNumber: 0,
                counter: 0,

                selectedValue: '1',

                first: 'Kevin',
                last: 'De Bruyne',

                firstname: 'Kevin',
                lastname: 'De Bruyne',

                // computed는 사용하지 않는 변수
                // watch만 사용하는 변수
                fullname: '',
            }
        },
        setup() {},     // 컴포지션 API
        created() {},   // 컴포넌트가 생성되면 실행
        mounted() {},   // template에 정의된 html 코드가 렌더링된 후 실행
        unmounted() {}, // unmount가 완료된 후 실행
        methods: {      // 컴포넌트 내에서 사용할 메서드 정의
            setCounter(num) {
                this.counter = this.initialNumber;
            },
            increaseCounter() {
                this.counter++;
            },
            one() {
                alert('one');
            },
            two() {
                alert('two');
            },

            changeSelect() {
                alert(this.selectedValue);
            },

            setname() {
                this.firstname = this.first;
                this.lastname = this.last;
            },
        },
        computed: {
            fullname() {
                return this.firstname + ' ' + this.lastname;
            },
        },
        watch: {
            firstname() {
                this.fullname = this.firstname + ' ' + this.lastname;
            },
            lastname() {
                this.fullname = this.firstname + ' ' + this.lastname;
            }
        }
    }
</script>