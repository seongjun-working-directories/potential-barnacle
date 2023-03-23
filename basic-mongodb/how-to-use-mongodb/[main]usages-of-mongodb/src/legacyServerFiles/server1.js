const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/User');

const app = express();
const PORT = 3000;
const URI = 'mongodb+srv://admin:<password>@cluster0.gt8iz9t.mongodb.net/blogService';

// [TEST] mongoose.connect(uri).then(result => console.log(result));

const server = async () => {
  try {
    // mongodb와 연결
    await mongoose.connect(URI, {
      // mongoose는 아래의 세 속성이 항상 true인 것처럼 작동함
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    })
      .then(() => console.log('MongoDB Connection Success!'))
      .catch((err) => console.error(err));

    // javascript object를 json으로 변환하는 라우터 등록
    app.use(express.json());

    // GET
    app.get('/user', async (req, res) => {
      try {
        // find는 배열을 리턴, findOne은 객체 하나만 리턴
        const users = await User.find({});
        return res.status(200).send({ users });
      }
      catch (err) {
        console.error({ err: err.message });
      }
    });
    
    // POST
    app.post('/user', async (req, res) => {
      try {
        // 사용자가 형식에 맞지 않게 요청을 보내는 경우 에러를 반환
        let { username, name } = req.body;
        if (!username) {
          return res.status(400).send({ err: 'username is required!' });
        }
        if (!name || !name.firstname || !name.lastname) {
          return res.status(400).send({ err: 'firstname, lastname is required!' });
        }

        // req.body가 User의 형태와 같다고 간주
        // new User()를 통해 document 즉, user 인스턴스를 만듦
        const user = new User(req.body);
        await user.save();
        return res.send({ user });
      }
      catch (err) {
        console.error(err);
        return res.status(500).send({err: err.message});
      }
    });
    
    // 특정 PORT에서 요청을 받도록 함
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  }
  catch (e) {
    console.error(e);
  }

};

server();