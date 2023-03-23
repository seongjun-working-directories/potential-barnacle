<template>
    <div>
        <!-- img 객체에 src에 바인딩하는 방법 -->
        <img v-bind:src="imgSrc" /><br/>

        <!--
            버튼에서 disabled 속성이 true로 되어 있으면,
            버튼은 비활성화가 되고, 사용자가 클릭을 해도 이벤트가 발생하지 않음
        -->
        <div>
            <input type="text" v-model="textValue" />
            <!-- input type=text에 데이터가 입력되는 순간 버튼이 활성화됨 -->
            <button type="button" v-bind:disabled="textValue===''">Click</button>
        </div><br/>

        <!--
            클래스 바인딩
            클래스에 대한 바인딩 처리 시 특이점은 반드시
            적용해야 하는 클래스는 기존 html에서 사용하던 방식처럼 class 속성에 클래스명을 입력하면 되고,
            조건에 따라 바인딩할 클래스의 경우는 v-bind:class를 이용해 추가적으로 정의해서 사용할 수 있다는 것
            또한, 클래스의 경우, 다른 속성과 공존해서 사용할 수 있음

            클래스 바인딩의 경우 오브젝트 형태로 사용하며,
            바인딩할 클래스를 key로 잡고, 바인딩 여부를 true/false로 지정함
        -->
        <div class="container" v-bind:class="{
            'active': isActive, 'text-red': hasError
        }">
            Class Binding
        </div><br/>

        <!--
            배열을 사용해 클래스를 바인딩
            단, 배열을 사용할 경우, 특정 조건에 따른 클래스 바인딩 처리를 true/false로 할 수 없음
        -->
        <div class="container" v-bind:class="[activeClass, errorClass]">
            Class Binding Array
        </div><br/>

        <div>
            <!-- 인라인 스타일 바인딩 -->
            <div v-bind:style="styleObject">Inline Style Binding</div>
            <!-- 인라인 스타일 바인딩 by 배열-->
            <div v-bind:style="[baseStyle, addStyle]">Inline Style Binding by Array</div>
        </div><br/>

        <div>
            <!--
                리스트 렌더링(v-for) :
                v-for="(item, index) in items" 형식으로 사용
            -->
            <table>
                <thead>
                    <th>순번</th>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>배송료</th>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in productList" v-bind:key="product.productName">
                        <td>{{index}}</td>
                        <td>{{product.productName}}</td>
                        <td>{{product.price}}</td>
                        <td>{{product.category}}</td>
                        <td>{{product.deliveryPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div><br/>

        <div>
            <!-- 렌더링 문법(v-if, v-show) -->
            <!-- v-if는 조건에 맞을 경우, 그 순간에 html 블록이 생성됨 -->
            <h1 v-if="type==='a'">A</h1>
            <h1 v-else-if="type==='b'">B</h1>
            <h1 v-else>C</h1>
            <br/>
            <!-- v-show는 조건 여부에 상관없이 무조건 html 블록이 생성됨 -->
            <h1 v-show="bShow">bShow가 true이면, 현재 블록이 화면에 보임</h1>
        </div><br/>
    </div>
</template>
<script>
    export default {
        /* eslint-disable */
        name: 'Attribute Binding',       // 컴포넌트명
        components: {}, // 다른 컴포넌트 사용 시 컴포넌트를 import 하고 배열로 저장
        data() {        // html과 js 코드에서 사용할 데이터 변수 선언
            return {
                imgSrc: 'https://kr.vuejs.org/images/logo.png',
                textValue: '',

                isActive: true,
                hasError: false,

                activeClass: 'active',
                errorClass: 'text-red',

                styleBinding: {
                    color: 'red',
                    fontSize: '15px',
                },

                baseStyle: 'background-color:green; width:100%; height:120px;',
                addStyle: 'color:red; font-weight:bold;',

                productList: [
                    {
                        "productName": "키보드",
                        "price": 25000,
                        "category": "전자제품",
                        "deliveryPrice": 3000
                    },
                    {
                        "productName": "마우스",
                        "price": 15000,
                        "category": "전자제품",
                        "deliveryPrice": 3000
                    },
                    {
                        "productName": "모니터",
                        "price": 320000,
                        "category": "전자제품",
                        "deliveryPrice": 0
                    },
                    {
                        "productName": "충전기",
                        "price": 3000,
                        "category": "전자제품",
                        "deliveryPrice": 3000
                    }
                ],

                type: 'a',      // v-if
                bShow: true,    // v-show

            }
        },
        setup() {},     // 컴포지션 API
        created() {},   // 컴포넌트가 생성되면 실행
        mounted() {},   // template에 정의된 html 코드가 렌더링된 후 실행
        unmounted() {}, // unmount가 완료된 후 실행
        methods: {}     // 컴포넌트 내에서 사용할 메서드 정의
    }
</script>
<style scoped>
    .container {
        width: 100%;
        height: 100px;
    }
    .active {
        background-color: yellow;
        font-weight: bold;
    }
    .text-red {
        color: red;
    }

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid grey;
        text-align: left;
        padding: 10px;
    }
</style>