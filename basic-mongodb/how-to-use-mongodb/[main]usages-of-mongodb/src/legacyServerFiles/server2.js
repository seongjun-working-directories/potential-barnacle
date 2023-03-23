const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/User');

const app = express();
const PORT = 3000;
const URI = 'mongodb+srv://admin:<password>@cluster0.gt8iz9t.mongodb.net/blogService';

const server = async () => {
  try {
    await mongoose.connect(URI);

    // mongoose가 내부적으로 어떤 작업을 하는지 알려면 다음의 코드를 추가
    // 해당 코드는 mongoose가 정확히 어떤 쿼리를 실행하는지 알 수 있음
    mongoose.set('debug', true);

    app.use(express.json());

    // GET : all users
    app.get('/user', async (req, res) => {
      try {
        const users = await User.find({});
        return res.status(200).send({ users });
      }
      catch (err) {
        console.error({ err: err.message });
      }
    });

    // GET : specific user by _id
    app.get('/user/:userId', async (req, res) => {
      // [TEST] console.log(req.params);

      try {
        const { userId } = req.params;

        // mongoose가 ObjectId 형식에 맞는 string인지 검사함
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ err: 'invalid userId' });
        }

        const user = await User.findOne({ _id: userId });
        return res.send({ user });
      }
      catch (err) {
        console.error({ err: err.message });
      }
    });
    
    // POST : create user
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

    // DELTE : specific user by _id
    app.delete('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ err: 'invalid userId' });
        }

        // age 값이 존재하는지 확인
        if (!age) return res.status(400).send({ err: 'age is required' });

        // age 값의 타입 확인
        if (typeof age !== 'number') {
          return res.status(400).send({ err: 'age should be an integer value' });
        }
        
        const user = await User.findOneAndDelete({ _id: userId });

        // user를 받아올 필요가 없다면 다음과 같이 deleteOne만 써도 됨
        // await User.deleteOne({ _id: userId });

        return res.send({ user });
      }
      catch (err) {
        console.error(err);
        return res.status(500).send({err: err.message});
      }
    });

    // PUT : specific user's age by _id
    app.put('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ err: 'invalid userId' });
        }

        const { age } = req.body;
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { $set: { age } },
          // new 속성을 true로 주지 않으면, update 되기 전의 값을 반환함
          { new: true }
        );
        return res.send({ user });
      }
      catch (err) {
        console.error(err);
        return res.status(500).send({ err: err.message });
      }
    });

    // PUT : specific user's age or name by _id
    app.put('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ err: 'invalid userId' });
        }

        const { age, name } = req.body;

        if (!age && !name) {
          return res.status(400).send({ err: 'age or name is required' });
        }
        if (age && typeof age !== 'number') {
          return res.status(400).send({ err: 'age should be an integer value' });
        }
        if (name && typeof name.firstname !== 'string' && typeof name.lastname !== 'string') {
          return res.status(400).send({ err: 'firstname, lastname should be string values' });
        }

        let customizedBody = {};
        if (age) customizedBody.age = age;
        if (name) customizedBody.name = name;

        const user = await User.findByIdAndUpdate(userId, customizedBody, { new: true });

        return res.send({ user });
      }
      catch (err) {
        console.error(err);
        return res.status(500).send({ err: err.message });
      }
    });
    
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  }
  catch (e) {
    console.error(e);
  }

};

server();