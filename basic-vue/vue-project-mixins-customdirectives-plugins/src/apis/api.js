import axios from 'axios';

export default {
    methods: {
        // $라는 prefix를 사용하므로써,
        // 믹스인 파일을 사용하는 컴포넌트 내에 동일한 메서드 명이 있어
        // 메서드가 오버라이딩 되는 것을 방지함
        async $callAPI(url, method, data) {
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