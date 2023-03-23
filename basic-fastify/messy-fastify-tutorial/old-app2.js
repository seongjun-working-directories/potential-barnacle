const { fastify } = require('fastify');

const dbConnectior = require('./plugins/db-connection');

async function main() {

    // https://github.com/pinojs/pino-pretty
    const app = await fastify({logger: {
            "level":30,
            "time":1522431328992,
            "msg":"hello world",
            "pid":42,
            "hostname":"foo",
            "v":1,
            "file": './log.txt',
        }
    });
    
    app.register(dbConnectior);
    
    // https://www.fastify.io/docs/latest/Reference/Decorators/
    app.decorate('conf', {
        db: 'My Custom Database',
        port: 3000
    });

    /*
    The dependencies parameter is an optional list of decorators that the decorator being defined relies upon.
    This list is simply a list of string names of other decorators.
    In the following example, the "utility" decorator depends upon "greet" and "log" decorators:
    fastify.decorate('utility', fn, ['greet', 'log']);
    */

    app.get('/', async (request, reply)=>{
        console.log(app.hasDecorator('conf'));
        console.log(app.conf.db);
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

    // https://www.fastify.io/docs/latest/Reference/ContentTypeParser/
    // Handle multiple content types with the same function
    // https://www.npmjs.com/package/xml-parser
    // app.addContentTypeParser(['text/xml', 'application/xml'], function (request, payload, done) {
    //     xmlParser(payload, function (err, body) {
    //         done(err, body);
    //     });
    // });

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