const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: {
    firstname: { type: String, required: true },
    lastname: {type: String, required: true},
  },
  age: Number,
  email: String,

  // timestamps는 생성 및 수정 일자를 기록함
}, { timestamps: true });

/*
User는 다음의 형식을 갖춰야 함
{
  "username": "username",
  "name": {
    "firstname": "firstname",
    "lastname": "lastname"
  },
  "age": 30
}
*/

const User = mongoose.model('user', UserSchema);
module.exports = { User }