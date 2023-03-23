<template>
  <main class="mt-3">
    <div class="container">
      <!-- 첫 번째 줄 -->
      <div class="row">
        <!-- 왼쪽 상단의 제품 이미지 -->
        <div class="col-md-5">
          <!-- 상품의 이미지를 Bootstrap의 Carousel을 통해 노출 -->
          <!-- https://getbootstrap.com/docs/4.0/components/carousel/ -->
          <div
						id="carouselExampleIndicators"
						class="carousel carousel-dark slide"
						data-bs-ride="carousel"
          >
            <!-- carousel-indicators : 위치 표시 --> 
            <ol class="carousel-indicators">
              <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
              <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
              <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
            </ol>

            <div class="carousel-inner">
              <div
                :class="`carousel-item ${i==0?'active':''}`"
                :key="i" v-for="(pimg, i) in productImage"
              >
                <img :src="`/download/${productId}/${pimg.path}`" class="d-block w-100" alt="..." />
              </div>
            </div>

            <!-- 이전/다음의 컨트롤을 추가할 때 권장하는 것은 <button> 요소지만,
            role="button"을 사용한 <a> 요소를 사용할 수도 있습니다. -->
            <a class="carousel-control-prev" href="#carouselExampleIndicators"
              role="button" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators"
              role="button" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </a>
          </div>
        </div>

        <!-- 오른쪽 상단의 제품 구매 정보 -->
        <div class="col-md-7">
          <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">{{productDetails.product_name}}</h5>
                <h5 class="card-title pt-3 pb-3 border-top">
                  {{getCurrencyFormat(productDetails.product_price)}}원
                </h5>
                <p class="card-text border-top pt-3">
                  <span class="badge bg-dark me-1">{{productDetails.category1}}</span>
                  <span class="badge bg-dark me-1">{{productDetails.category2}}</span>
                  <span class="badge bg-dark">{{productDetails.category3}}</span>
                </p>
                <p class="card-text pb-3">
                  배송비 {{getCurrencyFormat(productDetails.delivery_price)}} 원 |
                  도서산간(제주도) 배송비 추가 {{getCurrencyFormat(productDetails.add_delivery_price)}} 원 |
                  택배 배송 | {{productDetails.outbound_days}} 일 이내 출고 (주말, 공휴일 제외)
                </p>
                <div class="card-text border-top pb-3">
                  <div class="row">
										<div class="col-auto">
											<label class="col-form-label">구매수량</label>
										</div>
										<div class="col-auto">
											<div class="input-group">
												<span
                          class="input-group-text" style="cursor:pointer;"
                          @click="calculatePrice(-1);">
													-
                        </span>
                        <input
                          type="text" class="form-control"
                          style="width:40px;" v-model="total"
                        />
                        <span
                          class="input-group-text" style="cursor:pointer;"
                          @click="calculatePrice(1);">
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
				<!-- 두 번째 줄 -->
				<div>
				</div>
    </div>
  </main>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Product Details',
  data() {
    return {
      sampleData: ''
    }
  },
  created() {     // 컴포넌트가 생성되면 실행

  },
  methods: {

  }
}
</script>