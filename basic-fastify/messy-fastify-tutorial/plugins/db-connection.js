// 해당 코드를 작성하기 이전에 package.json에서 "type"을 commonjs로 변경했는지 확인할 것
const fastifyPlugin = require('fastify-plugin');

// mongodb 및 mongodb compass를 설치하고
// localhost:27017에 연결한 뒤, fastify-basic 데이터베이스를 생성한 뒤 실행 가능

async function dbConnector (fastify, options) {
    fastify.register(require('fastify-mongodb'), {
        url: 'mongodb://localhost:27017/fastify-basic'
    });
}

module.exports = fastifyPlugin(dbConnector);