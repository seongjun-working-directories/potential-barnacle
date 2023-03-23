// import {fastify} from 'fastify';
const {fastify} = require('fastify');
const dbConnectior = require('./plugins/db-connection');

async function main() {

    const app = await fastify({logger:true});

    app.register(dbConnectior);


    app.get('/', async (request, reply)=>{
        // https://www.fastify.io/docs/latest/Reference/Reply/

        return reply.code(201).send('Object Returned!').then((reply)=>{
            console.log('Reply Sent!');
        });
        // return reply.code(201).send('Object Returned!');
        // return 'Main Root';
    });

    app.delete('/delete', async (request, reply)=>{
        return 'Delete Request';
    });

    // Validation & Serialization
    // https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
    // Validation will only be attempted if the content-type is `application/json`.
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
    // Postman에서 Headers에 content-type을 application/json으로 변경해야 함
    // Postman에서 Body에 JSON Object를 넣어줘야 함

    // reply가 express 모듈을 response의 역할을 함
    app.post('/post', opts, async (request, reply)=>{
        // https://www.fastify.io/docs/latest/Reference/Request/

        // console.log(request.body);
        // console.log(request.query);
        // console.log(request.params);
        // console.log(request.headers);
        // console.log(request.raw);
        // console.log(request.server);
        // console.log(request.id);
        // console.log(request.ip);
        // console.log(request.ips);
        // console.log(request.hostname);
        // console.log(request.protocol);
        // console.log(request.url);
        // console.log(request.routerMethod);
        // console.log(request.routerPath);
        // request.log.info('some info');

        console.log(request.body);  // Postman Body에 넣어준 객체가 출력됨

        return { hello : 'world' };
        // return 'Post Request';
    });

    app.put('/put', async (request, reply)=>{
        return 'Put Request';
    })

    
    // app.get('/hello', async (request, reply)=>{
    //     return 'Hello World';
    // });

    app.listen({port: 3000}, (err, addr)=>{
        if(err){
            app.log.error(err);
            process.exit(1);
        }
        app.log.info(`Server Listening On ${addr}`);
    });

}

main();