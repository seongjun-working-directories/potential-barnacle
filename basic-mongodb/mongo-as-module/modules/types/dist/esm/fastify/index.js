// import 'fastify';
// import type { UserInfo } from '../user';
export {};
/*
  `declare` 키워드

  ▣ 변수, 상수, 함수, 또는 클래스가 어딘가에 이미 선언되어 있음을 알린다.
  ▣ 즉, JS 코드로는 컴파일 되지 않고, TypeScript 컴파일러에게 타입 정보를 알리기만 한다.
  ▣ `declare` 블록 (`declare namespace`, `declare module`, `declare global`)
    ◉ 앰비언트 컨텍스트(Ambient Context)로 정의되는 영역이다.
    ◉ 이 영역 안에서는 `declare` 키워드가 기본으로 붙는다. 즉 굳이 또 붙여줄 필요가 없다.
    ◉ 또한 이 영역 안에서는 선언 코드가 아닌 일반 코드를 작성할 수 없다.
    ◉ `declare namespace ABC`:
      원래대로라면 JS 일반 객체로 컴파일 되는 네임스페이스이겠지만, declare 키워드를 붙여줌으로써 JS 코드로 컴파일 되지 않게 한다.
      이는 JS 모듈이 실제로 내보내는 것이 일반 객체인 경우에 그 객체의 타입 정보만을 알리기 위한 목적이다.
      이 블록은 앰비언트 네임스페이스 혹은 내부 모듈이라고도 부른다.
    ◉ `declare module "ABC"`:
      앰비언트 모듈 선언(Ambient Module Declaration) 파일에 작성하는 블록으로, 앰비언트 모듈 혹은 외부 모듈이라고도 부른다.
      이러한 앰비언트 모듈 선언 파일은 컴파일 대상에 포함되기만 한다면(예를 들어 Triple Slash 디렉티브를 사용한다든가 해서)
      그곳에 선언된 모듈(여기서는 ABC)의 타입 정보를 참조할 수 있게 된다.
      그리고 이 블록 역시 네임스페이스와 마찬가지로 export를 붙인 필드만 외부에서 참조가 가능하다.
    ◉ `declare global`:
      모듈 파일에서도 전역 참조가 가능한 선언 코드를 작성하고 싶을 때 사용한다.
      전역 참조가 가능하다는 것은 해당 선언의 참조를 위해 별도의 불러오기 코드가 필요 없다는 뜻이다.
      참고로 이 블록은 오로지 declare module 블록 안에서만 중첩이 가능하다.
*/
// declare module 'fastify' {
//   export interface FastifyInstance {
//     user: UserInfo;
//   }
// }
// export interface FastifyReplyWithUserInfo extends FastifyReply {
//   locals: {
//     userInfo: UserInfo | null;
//   },
//   user: UserInfo | null;
// }
//# sourceMappingURL=index.js.map