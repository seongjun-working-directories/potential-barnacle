//config 내 코멘트 이동
//tsconfig.json
".COMMENT": "풀잇글〔comment〕 하나 제대로 달지 못 하는 `tsconfig.json`을 TypeScript가 버리는 날이 어서 오기를 바랍니다…",
"compilerOptions.baseUrl.COMMENT": [
"외부 모듈이 아닌 이상 상대 경로로 모듈을 가져와야 한다.",
"baseUrl은 외부 모듈이 아닌 모듈들을 가져올 때 절대 경로로 참조할 수 있게 해준다.",
"만약 baseUrl 을 \"src\"로 설정할 경우, src/ 를 기준으로 절대 경로로 모듈 참조가 가능해진다."
],
"compilerOptions.esModuleInterop.COMMENT": [
"CommonJS 방식으로 내보낸 모듈을 ES 모듈 방식의 import로 가져올 수 있게 해준다.",
"CommonJS 모듈을 ES6 모듈 코드베이스로 가져오려고 할 때 문제가 발생하는데",
"\"esModuleInterop\" : true 로 설정할 경우 ES6 모듈 사양을 준수하여 CommonJS 모듈을 가져올 수 있게 된다."
],
"compilerOptions.lib.COMMENT": [
"타입 정의 파일(.d.ts)이 목표로 하는 런타임 환경을 알려준다.",
"컴파일 된 JavaScript 파일이 어디에서 동작할 것인지 알려주는 설정값."
],
"compilerOptions.paths.COMMENT": [
"모듈을 참조할 때 baseUrl 을 기준으로 다시 매핑시킬 수 있다.",
"경로에 별칭을 붙여서 사용하는 것 역시 가능하다."
],
"compilerOptions.target.COMMENT": "TypeScript를 컴파일 할 때 어떤 버전의 JavaScript로 변환할지 설정",
"include.COMMENT": [
"TypeScript가 해당 디렉토리 안의 모든 파일을 확인한다는 것을 의미.",
"TypeScript로 컴파일 할 시 포함할 파일과 포함하지 않을 파일을 구분할 수 있다."
]
"exclude.COMMENT": "컴파일 대상에서 제외하는 설정값",

//tsconfig.esm.json
"compilerOptions.baseUrl.COMMENT": [
"외부 모듈이 아닌 이상 상대 경로로 모듈을 가져와야 한다.",
"baseUrl은 외부 모듈이 아닌 모듈들을 가져올 때 절대 경로로 참조할 수 있게 해준다.",
"만약 baseUrl 을 \"src\"로 설정할 경우, src/ 를 기준으로 절대 경로로 모듈 참조가 가능해진다."
],
"compilerOptions.esModuleInterop.COMMENT": [
"CommonJS 방식으로 내보낸 모듈을 ES 모듈 방식의 import로 가져올 수 있게 해준다.",
"CommonJS 모듈을 ES6 모듈 코드베이스로 가져오려고 할 때 문제가 발생하는데",
"\"esModuleInterop\" : true 로 설정할 경우 ES6 모듈 사양을 준수하여 CommonJS 모듈을 가져올 수 있게 된다."
],
"compilerOptions.lib.COMMENT": [
"타입 정의 파일(.d.ts)이 목표로 하는 런타임 환경을 알려준다.",
"컴파일 된 JavaScript 파일이 어디에서 동작할 것인지 알려주는 설정값."
],
"compilerOptions.paths.COMMENT": [
"모듈을 참조할 때 baseUrl 을 기준으로 다시 매핑시킬 수 있다.",
"경로에 별칭을 붙여서 사용하는 것 역시 가능하다."
],
"compilerOptions.target.COMMENT": "TypeScript를 컴파일 할 때 어떤 버전의 JavaScript로 변환할지 설정",

"exclude.COMMENT": "컴파일 대상에서 제외하는 설정값",

"include.COMMENT": [
"TypeScript가 해당 디렉토리 안의 모든 파일을 확인한다는 것을 의미.",
"TypeScript로 컴파일 할 시 포함할 파일과 포함하지 않을 파일을 구분할 수 있다."
]

".COMMENT": "풀잇글〔comment〕 하나 제대로 달지 못 하는 `tsconfig.json`을 TypeScript가 버리는 날이 어서 오기를 바랍니다…",

//tsconfig.cjs.json
"compilerOptions.baseUrl.COMMENT": [
"외부 모듈이 아닌 이상 상대 경로로 모듈을 가져와야 한다.",
"baseUrl은 외부 모듈이 아닌 모듈들을 가져올 때 절대 경로로 참조할 수 있게 해준다.",
"만약 baseUrl 을 \"src\"로 설정할 경우, src/ 를 기준으로 절대 경로로 모듈 참조가 가능해진다."
],
"compilerOptions.esModuleInterop.COMMENT": [
"CommonJS 방식으로 내보낸 모듈을 ES 모듈 방식의 import로 가져올 수 있게 해준다.",
"CommonJS 모듈을 ES6 모듈 코드베이스로 가져오려고 할 때 문제가 발생하는데",
"\"esModuleInterop\" : true 로 설정할 경우 ES6 모듈 사양을 준수하여 CommonJS 모듈을 가져올 수 있게 된다."
],
"compilerOptions.lib.COMMENT": [
"타입 정의 파일(.d.ts)이 목표로 하는 런타임 환경을 알려준다.",
"컴파일 된 JavaScript 파일이 어디에서 동작할 것인지 알려주는 설정값."
],
"compilerOptions.paths.COMMENT": [
"모듈을 참조할 때 baseUrl 을 기준으로 다시 매핑시킬 수 있다.",
"경로에 별칭을 붙여서 사용하는 것 역시 가능하다."
],
"compilerOptions.target.COMMENT": "TypeScript를 컴파일 할 때 어떤 버전의 JavaScript로 변환할지 설정",
"include.COMMENT": [
"TypeScript가 해당 디렉토리 안의 모든 파일을 확인한다는 것을 의미.",
"TypeScript로 컴파일 할 시 포함할 파일과 포함하지 않을 파일을 구분할 수 있다."
]
//tsconfig.node.json
".COMMENT": "풀잇글〔comment〕 하나 제대로 달지 못 하는 `tsconfig.json`을 TypeScript가 버리는 날이 어서 오기를 바랍니다…",

"compilerOptions.baseUrl.COMMENT": [
"외부 모듈이 아닌 이상 상대 경로로 모듈을 가져와야 한다.",
"baseUrl은 외부 모듈이 아닌 모듈들을 가져올 때 절대 경로로 참조할 수 있게 해준다.",
"만약 baseUrl 을 \"src\"로 설정할 경우, src/ 를 기준으로 절대 경로로 모듈 참조가 가능해진다."
],
"compilerOptions.esModuleInterop.COMMENT": [
"CommonJS 방식으로 내보낸 모듈을 ES 모듈 방식의 import로 가져올 수 있게 해준다.",
"CommonJS 모듈을 ES6 모듈 코드베이스로 가져오려고 할 때 문제가 발생하는데",
"\"esModuleInterop\" : true 로 설정할 경우 ES6 모듈 사양을 준수하여 CommonJS 모듈을 가져올 수 있게 된다."
],
"compilerOptions.lib.COMMENT": [
"타입 정의 파일(.d.ts)이 목표로 하는 런타임 환경을 알려준다.",
"컴파일 된 JavaScript 파일이 어디에서 동작할 것인지 알려주는 설정값."
],
"compilerOptions.paths.COMMENT": [
"모듈을 참조할 때 baseUrl 을 기준으로 다시 매핑시킬 수 있다.",
"경로에 별칭을 붙여서 사용하는 것 역시 가능하다."
],
"compilerOptions.target.COMMENT": "TypeScript를 컴파일 할 때 어떤 버전의 JavaScript로 변환할지 설정",
"exclude.COMMENT": "컴파일 대상에서 제외하는 설정값",
"include.COMMENT": [
"TypeScript가 해당 디렉토리 안의 모든 파일을 확인한다는 것을 의미.",
"TypeScript로 컴파일 할 시 포함할 파일과 포함하지 않을 파일을 구분할 수 있다."
]
