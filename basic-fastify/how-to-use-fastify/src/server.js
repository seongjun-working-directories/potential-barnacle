const fastify = require('fastify')({
  logger: true
});
const PORT = 5000;

// fastify swagger를 register 시키면,
// http://localhost:5000/{routePrefix에 등록한 값} 에 문서화되어 있음
fastify.register(require('@fastify/swagger'), {
	// argument of options
	exposeRoute: true,
	routePrefix: '/docs',
	swagger: {
		info: {title: 'fastify-api'}
	}
});

// 라우터 등록
fastify.register(require('./routes/router'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  }
  catch(e) {
    fastify.log.error(e);
    process.exit(1);
  }
}

start();