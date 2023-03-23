import axios from 'axios';

// Mock 서버의 API를 호출하는 함수
// 데이터에 대한 조회/수정/삭제/생성은 프로젝트 전반에 사용되므로
// mixins에 공통 함수로 등록해서 사용해야 함
export default {
    methods: {
        async $api(url, method, data) {
            return (await axios({
                method: method,
                url,
                data
            })
                .catch(e=>{
                    console.log(e);
                }))
                .data;
        }
    }
}
// 생성한 mixins는 Vue 컴포넌트에서 사용하기 위해
// main.js에 등록해야 함
