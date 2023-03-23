// import {fastify} from 'fastify';
const {fastify} = require('fastify');

const app = await fastify({logger:true});

app.get('/', async (request, reply)=>{
    return {hello: 'world'};
});

app.listen(3000, (err, addr)=>{
    if(err){
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server Listening On ${addr}`);
})