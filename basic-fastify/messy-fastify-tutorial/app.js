const { fastify } = require('fastify');

const dbConnectior = require('./plugins/db-connection');

async function main() {
    const app = await fastify({ logger: {level: "info"} });
    
    app.register(dbConnectior);

    // https://www.fastify.io/docs/latest/Reference/Middleware/
    // await app.register(require('@fastify/express'))
    // app.use(require('cors')())
    // app.use(require('dns-prefetch-control')())
    // app.use(require('frameguard')())
    // app.use(require('hsts')())
    // app.use(require('ienoopen')())
    // app.use(require('x-xss-protection')())

    // https://www.fastify.io/docs/latest/Reference/Hooks/
    app.addHook('onRequest', (request, reply, done)=>{
        console.log('onRequest');
        request.log.info('onRequest');
        done();
    });

    // app.addHook('onRequest', async (request, reply)=>{
    //     console.log('onRequest');
    //     request.log.info('onRequest');
    // });  // --> done() 없이 여러 훅을 쓰면, 하나가 종료되지 않아 나머지가 호출되지 않는 문제가 발생할 수 있음

    app.addHook('preHandler', async (request, reply)=>{
        console.log('preHandler');
        request.log.info('preHandler');
    });

    app.get('/', async (request, reply)=>{
        return reply.code(201).send('Object Returned!');
    });

    app.delete('/delete', async (request, reply)=>{
        return 'Delete Request';
    });

    const opts = {
        schema: {
          body: {
            type: 'object',
            properties: {
              someKey: { type: 'string' },
              someOtherKey: { type: 'number' }
            }
          }
        }
    }

    app.post('/post', opts, async (request, reply)=>{
        return { hello : 'world' };
    });

    app.put('/put', async (request, reply)=>{
        return 'Put Request';
    });

    app.listen({port: 3000}, (err, addr)=>{
        if(err){
            app.log.error(err);
            process.exit(1);
        }
        app.log.info(`Server Listening On ${addr}`);
    });

}

main();

/* [LifeCycle] */
// Incoming Request
//   │
//   └─▶ Routing
//         │
//         └─▶ Instance Logger
//              │
//    4**/5** ◀─┴─▶ onRequest Hook
//    │
//    4**/5** ◀─┴─▶ preParsing Hook
//                    │
//          4**/5** ◀─┴─▶ Parsing
//                         │
//               4**/5** ◀─┴─▶ preValidation Hook
//                              │
//                        400 ◀─┴─▶ Validation
//                                    │
//                          4**/5** ◀─┴─▶ preHandler Hook
//                                          │
//                                4**/5** ◀─┴─▶ User Handler
//                                                │
//                                                └─▶ Reply
//                                                      │
//                                            4**/5** ◀─┴─▶ preSerialization Hook
//                                                            │
//                                                            └─▶ onSend Hook
//                                                                  │
//                                                        4**/5** ◀─┴─▶ Outgoing Response
//                                                                        │
//                                                                        └─▶ onResponse Hook


/* [Reply LifeCycle] */
// ★ schema validation Error
// │
// └─▶ schemaErrorFormatter
//            │
// reply sent ◀── JSON ─┴─ Error instance
//                   │
//                   │         ★ throw an Error
// ★ send or return                 │                 │
// │                         │                 │
// │                         ▼                 │
// reply sent ◀── JSON ─┴─ Error instance ──▶ setErrorHandler ◀─────┘
//                   │
// reply sent ◀── JSON ─┴─ Error instance ──▶ onError Hook
//                                             │
//                                             └─▶ reply sent