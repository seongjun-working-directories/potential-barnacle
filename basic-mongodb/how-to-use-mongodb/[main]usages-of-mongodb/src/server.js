const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/userRoute');

const app = express();
const PORT = 3000;
const URI = 'mongodb+srv://admin:qoSxhhLUpPHBSeAj@cluster0.gt8iz9t.mongodb.net/blogService';

const server = async () => {
  try {
    await mongoose.connect(URI);

    mongoose.set('debug', true);

    app.use(express.json());

    // url이 /user로 시작할 경우, userRouter가 처리함
    app.use('/user', userRouter);
    
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
  }
  catch (e) {
    console.error(e);
  }

};

server();