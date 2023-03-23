<template>
    <div>
        <h1>Hello, {{title}}!</h1>
        <div v-html="htmlString"></div>

        <input type="text" v-model="valueModel" /><br/>
        <input type="number" v-model.number="numberModel" /><br/>

        <textarea v-model="message"></textarea><br/>
        <select v-model="city">
            <option value="02">서울</option>
            <option value="21">부산</option>
            <option value="064">제주</option>
        </select><br/>

        <label><input type="checkbox" v-model="checked1" />{{checked1}}</label><br/>
        <label><input type="checkbox" v-model="checked2" true-value="yes" false-value="no" />{{checked2}}</label>

        <!-- 여러 개의 체크박스 사용 시 배열을 이용해 데이터를 바인딩 -->
        <div>
            <label><input type="checkbox" value="1" v-model="checked" />1</label>
            <label><input type="checkbox" value="2" v-model="checked" />2</label>
            <label><input type="checkbox" value="3" v-model="checked" />3</label>
            <br/>
            <span>체크한 숫자: {{checked}}</span>
        </div>
        <div>
            <label><input type="radio" v-bind:value="radioValue1" v-model="picked" />11</label>
            <label><input type="radio" v-bind:value="radioValue2" v-model="picked" />12</label>
            <label><input type="radio" v-bind:value="radioValue3" v-model="picked" />13</label>
            <br/>
            <span>체크한 숫자: {{ picked }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        /* eslint-disable */
        name: 'Data Binding',       // 컴포넌트명
        components: {}, // 다른 컴포넌트 사용 시 컴포넌트를 import 하고 배열로 저장
        data() {        // html과 js 코드에서 사용할 데이터 변수 선언
            return {
                title: 'VUEJS',
                htmlString: '<p style="color:red;">This is a red string.</p>',

                valueModel: 'South Korea',
                numberModel: '3',
                message: "This is a textarea.",
                city: "064",

                checked1: true,
                checked2: false,
                checked: [],

                picked: '',
                radioValue1: '11',
                radioValue2: '12',
                radioValue3: '13',
            }
        },
        setup() {},     // 컴포지션 API
        created() {},   // 컴포넌트가 생성되면 실행
        mounted() {},   // template에 정의된 html 코드가 렌더링된 후 실행
        unmounted() {}, // unmount가 완료된 후 실행
        methods: {}     // 컴포넌트 내에서 사용할 메서드 정의
    }
</script>