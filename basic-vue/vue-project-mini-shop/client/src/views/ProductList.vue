<template>
    <main class="mt-3">
        <div class="container">
            <div class="row mb-2">
                <div class="col-12">
                    <select class="form-select">
                        <option selected></option>
                        <option value="1">Notebook</option>
                        <option value="2">Monitor</option>
                        <option value="3">Mouse and Keyboard</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6" :key="i" v-for="(product, i) in productList">
                    <div class="card" style="width:18rem;">
                        <a @click="goToDetail(product.id)" style="cursor:pointer;">
                            <img
                                :src="'/download/${produt.id}/${product.path}'"
                                class="card-img-top" alt="..." />
                        </a>

                        <div class="card-body">
                            <h5 class="card-title">{{product.product_name}}</h5>
                            <p class="card-text">
                                <span class="badge bg-dark text-white mr-1">{{product.category}}</span>
                                <span class="badge bg-dark text-white mr-1">{{product.category2}}</span>
                                <span class="badge bg-dark text-white">{{product.category3}}</span>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">
                                        Cart
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondarys">
                                        Buy
                                    </button>
                                </div>
                                <small class="text-dark">{{product.product_price}} KRW</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
/* eslint-disable */
export default {
    name: 'Product List', 
    data() {
        return {
            productList: []
        };
    },
    setup() {},     // 컴포지션 API
    created() {     // 컴포넌트가 생성되면 실행
        // 제품 리스트 화면이 열림과 동시에 화면상에 제품 목록을 출력해야 하므로
        // created() 메서드 안에 getProductList() 메서드가 들어감
        this.getProductList();
    },
    mounted() {},   // template에 정의된 html 코드가 렌더링된 후 실행
    unmounted() {}, // unmount가 완료된 후 실행
    methods: {
        async getProductList() {
            this.productList = await this.$api('/api/productList', {});
            // [TEST]
            console.log(this.productList);
        },
        goToDetail(product_id){
            this.$router.push({path: '/details', query:{product_id: product_id}});
        }
    }
}
</script>