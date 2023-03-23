/*
1.
REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처.
REST API는 REST를 기반으로 서비스 API를 구현한 것.

2.
REST API는 자원(Resource), 행위(Verb), 표현(Representations) 3요소로 구성됨.
REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용을 이해할 수 있음.
<구성 요소>     <내용>                <표현 방법>
자원            자원                  URI
행위            자원에 대한 행위       HTTP 요청 메서드
표현            행위의 구체적 내용     페이로드

3.
<REST API 설계 원칙>
(1) URI는 리소스를 표현하는 데에 집중함.
(2) 행위에 대한 정의는 HTTP 요청 메서드를 통해 함.

4.
"URI는 리소스를 표현해야 한다."
URI : 특정 리소스를 식별하는 통합 자원 식별자(Uniform Resource Identifier).
URL : URI의 서브셋, 흔히 웹 주소로 불림. 네트워크 상에 리소스가 어딨는지 알려줌.
URI는 리소스를 표현하는 데 중점을 두어야 함.
리소스를 식별할 수 있는 이름은 명사를 사용.
따라서 이름에 get, show 등과 같은 행위 표현이 들어가서는 안됨.

5.
"리소스에 대한 행위는 HTTP 요청 메서드로 표현한다."
HTTP 요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법.
리소스에 대한 행위(GET, POST, PUT, PATCH, DELETE)는
HTTP 요청 메서드를 통해 표현하며 URI에 표현하지 않음.

6.
HTTP 요청을 전송하고 응답을 받으려면 서버가 필요.
JSON Server로 가상 REST API 서버를 구축해 HTTP 요청을 전송하고 응답 받는 예제.

7.
<JSON Server 설치>
JSON Server는 json 파일을 사용해 가상 REST API 서버를 구축할 수 있는 툴.
터미널에 다음과 같이 명령어 입력.
'''
mkdir json-server-example && cd json-server-example
npm init -y
npm install json-server --save-dev
'''

8.
<db.json 파일 생성>
프로젝트 루트 폴더(/json-server-example)에 db.json 파일 생성.
db.json은 리소스를 제공하는 DB 역할을 함.
'''
{
    "todos": [
        {
            "id":1,
            "content":"html",
            "completed":true
        },
        {
            "id":2,
            "content":"css",
            "completed":false
        },
        {
            "id":3,
            "content":"javascript",
            "completed":true
        }
    ]
}
'''

9.
<JSON Server 실행>
터미널에 다음과 같이 명령어를 입력해 JSON Server 실행.
JSON Server가 DB 역할을 하는 db.json 파일의 변경을 감지하게 하려면
watch 옵션을 추가.
'''
## 기본 포트(3000) 사용 / watch 옵션 적용
$ json-server --watch db.json

## 포트 변경 / watch 옵션 적용
$ json-server --watch db.json --port 5000
'''

또는 다음과 같이 package.json 파일의 scripts를 수정해
JSON Server를 실행할 수 있음.
'''
{
    "name":"json-server-example",
    "version":"1.0.0",
    "scripts": {
        "start":"json-server --watch db.json"
    },
    "devDependencies": {
        "json-server":"^0.17.0"
    }
}
'''

이후 터미널에 npm start 명령어 입력해 JSON Server 실행.
Resources
  http://localhost:3000/todos

Home
  http://localhost:3000

10.
<GET 요청>
todo 리소스에서 모든 todo를 취득(index).
JSON Server의 루트 폴더(/json-server-example)에 public 폴더 생성 후,
JSON Server를 중단(ctrl+c -> y)하고 재실행함.
그리고 public 폴더에 다음 get_index.html을 추가.
이후 http://localhost:3000/get_index.html로 접속.
'''
<!doctype html>
<html>
<body>
    <pre></pre>
    <script>
        const xhr = new XMLHttpRequest();
        // HTTP 요청 초기화 : todos 리소스에서 모든 todo 취득(index)
        xhr.open('GET', '/todos');
        xhr.send();

        // load 이벤트는 요청이 성공적으로 완료된 경우 발생.
        xhr.onload = () => {
            if (xhr.status === 200) {
                document.querySelector('pre').textContent = xhr.response;
            }
            else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
</body>
</html>
'''

todos 리소스에서 id를 사용해 특정 todo를 취득(retrieve).
public 폴더에 get_retrieve.html을 추가하고
브라우저에서 http://localhost:3000/get_retrieve.html로 접속.
'''
<!doctype html>
<html>
<body>
        <pre></pre>
        <script>
            const xhr = new XMLHttpRequest();

            // HTTP 요청 초기화
            // todos 리소스에서 id를 사용해 특정 todo 취득(retrieve)
            xhr.open('GET', '/todos/1');
            xhr.send();

            xhr.onload = () => {
                if (xhr.status === 200) {
                    document.querySelector('pre').textContent = xhr.response;
                }
                else {
                    console.error('Error', xhr.status, xhr.statusText);
                }
            };
        </script>
</body>
</html>
'''

11.
<POST 요청>
todos 리소스에 새로운 todo 생성.
POST 요청 시에는 setRequestHeader 메서드로 요청 몸체에 담아
서버로 전송할 페이로드의 MIME 타입을 지정해야 함.

public 폴더에 post.html 추가 후
http://localhost:3000/post.html로 접속.
'''
<!doctype html>
<html>
<body>
        <pre></pre>
        <script>
            const xhr = new XMLHttpRequest();

            // HTTP 요청 초기화
            // todos 리소스에 새로운 todo를 생성
            xhr.open('POST', '/todos');
            xhr.setRequestHeader('content-type', 'application/json');

            // HTTP 요청 전송
            // 새로운 todo를 생성하기 위해 페이로드를 서버에 전송해야 함
            xhr.send(JSON.stringify({
                id:4, content:'Angular', completed:false
            }));

            xhr.onload = () => {
                // 200 : OK, 201 : Created
                if(xhr.status === 200 || xhr.status === 201) {
                    document.querySelector('pre')
                    .textContent = xhr.response;
                }
                else {
                    console.error('Error', xhr.status, xhr.statusText);
                }
            }
        </script>
</body>
</html>
'''

12.
<PUT 요청>
특정 리소스 전체를 교체할 때 사용.
todos 리소스에서 id로 todo를 특정해 id를 제외한 리소스 전체를 교체.
PUT 요청 시에는 setRequestHeader를 사용해 요청 몸체에 담아
서버로 전송할 페이로드의 MIME 타입을 지정해야 함.

public 폴더에 put.html을 추가하고
http://localhost:3000/put.html로 접속.
'''
<!doctype html>
<html>
<body>
    <pre></pre>
    <script>
        const xhr = new XMLHttpRequest();

        // HTTP 요청 초기화
        // todos 리소스에서 id로 todo를 특정해
        // id를 제외한 리소스 전체를 교체
        xhr.open('PUT', '/todos/4');

        xhr.setRequestHeader('content-type', 'application/json');

        xhr.send(JSON.stringify({
            id:4, content:'React', completed:true
        }));

        xhr.onload = () => {
            if (xhr.status === 200) {
                document.querySelector('pre')
                .textContent = xhr.response;
            }
            else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
</body>
</html>
'''

13.
<PATCH 요청>
특정 리소스의 일부를 수정할 때 사용.
todos 리소스의 id로 todo를 특정하여 completed만 수정.
PATCH 요청 시에는 setRequestHeader 메서드를 사용해
요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정해야 함.

public 폴더에 patch.html을 추가하고
http://localhost:3000/patch.html로 접속.
'''
<!doctype html>
<html>
<body>
    <pre></pre>
    <script>
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', 'todos/4/');
        xhr.send(JSON.stringify({completed:false}));

        xhr.onload = () => {
            if (xhr.status === 200) {
                document.querySelector('pre')
                .textContent = xhr.response;
            }
            else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        }
    </script>
</body>
</html>
'''

14.
<DELETE 요청>
todos 리소스에서 id를 사용해 todo를 삭제.
public 폴더에 delete.html을 추가하고
http://localhost:3000/delete.html로 접속.
'''
<!doctype html>
<html>
<body>
    <pre></pre>
    <script>
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/todos/4');
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                document.querySelector('pre')
                .textContent = xhr.response;
            }
            else {
                console.error('Error', xhr.status, xhr.statusText);
            }
        };
    </script>
</body>
</html>
'''
*/