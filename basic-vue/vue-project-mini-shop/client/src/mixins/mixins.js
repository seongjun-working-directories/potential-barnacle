// mixins를 사용할 컴포넌트는 export default 안에 `mixins: [mixin_name]`과 같이 등록해야 함
// 이로 인해 해당 믹스인(mixin)에 정의해둔 모든 옵션이 컴포넌트의 고유 옵션에 혼합됨
import axios from 'axios';

export default {
    // 메서드명 앞에 $를 붙인 이유는
    // 믹스인 메서드의 이름과 하위 컴포넌트에 정의된 메서드의 이름 충돌을 막기 위함
    methods: {
        // 서버와의 데이터 통신을 위한 메서드
        async $api(url, data) {
            // axios(config) : 서버에 요청을 보내기 위한 메서드
            // config에는 method(post, get 등), url, data 등이 담김
            return (await axios({
                method: 'post',
                url,
                data
            }))
                .catch((err)=>{
                    console.log(err);
                })
                .data;
        },

        // 제품 이미지를 서버로 업로드하기 위해
        // 이미지 파일을 base64 String으로 변환하기 위한 메서드
        $base64(file) {
            // base64 :
            // 8비트 이진 데이터(예를 들어 실행 파일이나, ZIP 파일 등)를
            // 문자 코드에 영향을 받지 않는 공통 ASCII 영역의 문자들로만 이루어진
            // 일련의 문자열로 바꾸는 인코딩 방식
            return new Promise((resolve)=>{
                const reader = new FileReader();
                // FileReader.onload() :
                // load 이벤트의 핸들러로, 읽기 동작이 성공적으로 완료되었을 때마다 발생
                reader.onload = (e)=>resolve(e.target.result);
                // FileReader.readAsDataURL() :
                // 컨텐츠를 특정 Blob 이나 File에서 읽어 오는 역할을 함
                reader.readAsDataURL(file);
            })
        },

        // 제품 가격의 금액 표기를 위한 메서드
        $currencyFormat(value, format='#,###') {
            if (value==0 || value==null) return 0;

            // 금액의 환율을 currency 변수에 저장
            let currency = format.substring(0, 1);

            // KRW, USD가 금액 앞에 붙어있을 경우 제거
            if (currency === '$' || currency === '\\') {
                format = format.substring(1, format.length);
            }
            else { currency = ''; }

            let groupingSeparator = ',';
            let maxFractionDigits = 0;
            let decimalSeparator = '.';
            
            // 찾을 문자열이 없을 경우
            if (format.indexOf('.') == -1) {
                groupingSeparator = ',';
            }
            // 문자열에 점(.)이 있는 경우
            else {
                if (format.indexOf(',') < format.indexOf('.')) {
                    groupingSeparator = ',';
                    decimalSeparator = '.';
                    maxFractionDigits = format.length - format.indexOf('.') - 1;
                }
                else {
                    groupingSeparator = '.';
                    decimalSeparator = ',';
                    maxFractionDigits = format.length - format.indexOf(',') - 1;
                }
            }

            let prefix = '';
            let d = '';
            let dec = 1;

            for (let i=0; i<maxFractionDigits; i++) {
                dec = dec*10;
            }

            let v = String(Math.round(parseFloat(value)*dec)/dec);

            if (v.indexOf('-') > -1) {
                prefix = '-';
                v = v.substring(1);
            }
            if (maxFractionDigits > 0 && format.substring(format.length - 1, format.length) == '0') {
                v = String(parseFloat(v).toFixed(maxFractionDigits));
            }
            if (maxFractionDigits > 0 && v.indexOf('.') > -1) {
                d = v.substring(v.indexOf('.'));
                d = d.replace('.', decimalSeparator);
                v = v.substring(0, v.indexOf('.'));
            }

            const regExp = /\D/g;
            v = v.replace(regExp, '');
            const reg = /(\d+)(\d{3})/;
            while(reg.test(v)) {
                v = v.replace(reg, '$1'+groupingSeparator+'$2');
            }

            return prefix + currency + String(v) + String(d);
        }
    }
}

// 생성한 mixins는 vue 컴포넌트에서 사용하기 위해 main.js에 등록되어 있음
// Mixins는 Vue 컴포넌트에 재사용 가능한 기능을 배포하는 유연한 방법