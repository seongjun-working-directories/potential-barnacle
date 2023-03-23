const { Router } = require('express');
const { User } = require('../models/User');
const mongoose = require('mongoose');

const userRouter = Router();

// GET : all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({ users });
  }
  catch (err) {
    console.error({ err: err.message });
  }
});

// GET : specific user by _id
userRouter.get('/:userId', async (req, res) => {

  try {
    const { userId } = req.params;

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
userRouter.post('/', async (req, res) => {
  try {
    let { username, name } = req.body;
    if (!username) {
      return res.status(400).send({ err: 'username is required!' });
    }
    if (!name || !name.firstname || !name.lastname) {
      return res.status(400).send({ err: 'firstname, lastname is required!' });
    }

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
userRouter.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ err: 'invalid userId' });
    }

    if (!age) return res.status(400).send({ err: 'age is required' });
    if (typeof age !== 'number') {
      return res.status(400).send({ err: 'age should be an integer value' });
    }
    
    const user = await User.findOneAndDelete({ _id: userId });

    return res.send({ user });
  }
  catch (err) {
    console.error(err);
    return res.status(500).send({err: err.message});
  }
});

/*
// PUT : specific user's age or name by _id
userRouter.put('/:userId', async (req, res) => {
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
*/

// PUT : separate findOne & save
userRouter.put('/:userId', async (req, res) => {
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

    let user = await User.findById(userId);
    if (age) user.age = age;
    if (name) user.name = name;

    await user.save();
    return res.send({ user });
  }
  catch (err) {
    console.error(err);
    return res.status(500).send({ err: err.message });
  }
});


module.exports = {
  userRouter
};