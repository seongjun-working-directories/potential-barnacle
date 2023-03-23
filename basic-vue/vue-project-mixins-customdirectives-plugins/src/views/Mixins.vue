<!-- eslint-disable -->
<template>
    <div>
        <!-- $callAPI로 불러온 productList를 활용하는 코드 -->
        <p>Sample</p>
    </div>
</template>
<script>
import ApiMixins from '../apis/api.js';

export default {
    mixins: [ApiMixins],
    
    data() {
        return {
            productList: []
        }
    },
    
    async mounted() {
        this.productList = await this.$callAPI(
            // Postman에서 실행 중인 Mock Server의 URL
            'https://716215e9-f229-4b62-aa75-5cbc50b6a380.mock.pstmn.io/list',
            'get'
        );
        console.log(this.productList);
    }
}
</script>