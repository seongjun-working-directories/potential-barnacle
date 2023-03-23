const path = require('path');

// webpack의 핵심은 이 파일이라고 볼 수 있음
module.exports = {
    name: 'multi-table-setting', // webpack 설정의 이름
    mode: 'development',    // 실제 서비스에서는 production 사용
    devtool: 'eval',    // 빠르게 실행하겠다는 의미
    resolve: {
        // entry에 들어가는 파일의 확장자를 여기에 입력하면,
        // entry에서 확장자 생략 가능
        extensions: ['.js', '.jsx'],
    },

    // webpack 설정에서 가장 중요한 속성
    // 입력(Input) : 합쳐야 하는 파일을 배열로 나열
    entry: {
        // 사실 client.jsx에서 이미 WordChain을 import하고 있으므로, WordChain.jsx는 생략 가능
        // app: ['./client.jsx', 'WordChain.jsx'],
        app: ['./client'],
    },

    // Babel 세팅 : entry에 module을 적용해서 output으로 출력
    module: {
        rules: [{
            // js나 jsx 파일에 babel-loader를 적용
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {  // babel의 옵션
                // 사실 presets 또한 플러그인들의 집합을 모아둔 것
                presets: ['@babel/preset-env', '@babel/preset-react'],
                // babel 에러가 뜰 경우에만, plugins 추가
                plugins: [],
            },
        }],
    },

    // 출력(Output) : 출력되는 파일의 속성을 설정
    output: {
        // __dirname : 현재 파일이 속해 있는 디렉토리
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
};

// 그 후 webpack 명령어를 등록하고 터미널에서 webpack이라고 입력하면 됨
// 명령어 등록 방법
// (1) package.json의 scripts에 "dev": "webpack" 등록
// -> 터미널에 `npm run dev` 입력
// (2) npx webpack을 바로 터미널에 입력
// 위의 둘 중 하나의 방법을 선택하면, dist 폴더 안에 app.js가 생성됨