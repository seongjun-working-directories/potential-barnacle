// express 모듈을 이용해 구현된 웹서버 --> app.js를 실행하므로써 웹서버가 구동됨
// vue 프로젝트에서 $api 함수로 요청을 보내면, 웹서버인 app.js가 요청을 받아서 응답함
const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60  // 쿠키 유효시간 : 1h
    }
}));

app.use(express.json({
    limit: '50mb'
}));

const server = app.listen(3000, ()=>{
    console.log('SERVER STARTED ON PORT 3000');
});

let sql = require('./sql.js');

