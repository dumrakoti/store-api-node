const User = require('./../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } else {
    // res.status(422).json({ message: 'User email already exists.' });
    throw new Error('User email already exists.');
  }
});

module.exports = { createUser };