<template>
    <!--
        Vue 컴포넌트에서 Mock 서버로 API를 호출하여
        데이터를 받아와 리스트 렌더링 처리하는 코드
    -->
    <div>
        <table>
            <thead>
                <tr>
                    <th>순번</th>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>배송료</th>
                </tr>
            </thead>
            <!-- <tbody v-if="productList.length > 0"> -->
            <tbody>
                <tr :key="i" v-for="(product, i) in productList">
                    <td>{{i}}</td>
                    <td>{{product.productName}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.category}}</td>
                    <td>{{product.deliveryPrice}}</td>
                </tr>
            </tbody>
            <!--
            <tbody v-else>
                <tr>데이터가 존재하지 않습니다.</tr>
            </tbody>
            -->
        </table>
    </div>
</template>
<script>
    export default {
        /* eslint-disable */
        name: 'Data Binding List',       // 컴포넌트명
        components: {}, // 다른 컴포넌트 사용 시 컴포넌트를 import 하고 배열로 저장
        data() {        // html과 js 코드에서 사용할 데이터 변수 선언
            return {
                productList: []
            }
        },
        setup() {},     // 컴포지션 API
        created() {     // 컴포넌트가 생성되면 실행
            // this.getList();
        },
        mounted() {     // template에 정의된 html 코드가 렌더링된 후 실행
            this.getList();
        },
        unmounted() {}, // unmount가 완료된 후 실행
        methods: {      // 컴포넌트 내에서 사용할 메서드 정의
            async getList() {
                // Postman에서 Mock Server를 누른 뒤 세팅한 서버의 `copy url` 버튼을 눌러 url을 가져옴
                this.productList = await this.$api(
                    'https://716215e9-f229-4b62-aa75-5cbc50b6a380.mock.pstmn.io/list',
                    'get'
                );
                console.log(productList);
            }
        }
    }
</script>
<style scoped>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid grey;
        text-align: left;
        padding: 8px;
    }
</style>