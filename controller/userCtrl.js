const { generateToken } = require('../config/jwtToken');
const User = require('./../models/userModel');
const asyncHandler = require('express-async-handler');

// register user
const registerUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const user = await User.create(req.body);
    res.status(200).json({ user });
  } else {
    throw new Error('User email already exists.');
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exist or not
  const findUser = await User.findOne({ email });
  if (findUser && await findUser.isPasswordMatched(password)) {

    res.status(200).json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      phone: findUser?.phone,
      token: generateToken(findUser?._id),
      role: findUser?.role
    });
  } else {
    throw new Error('Invalid user credentials.');
  }
});

// update a user
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      phone: req?.body?.phone,
      email: req?.body?.email
    }, { new: true });
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    throw new Error(error);
  }
});

// get all user
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// get single user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const isUser = await User.findById(id);
    if (isUser) {
      res.status(200).json({
        _id: isUser?._id,
        firstname: isUser?.firstname,
        lastname: isUser?.lastname,
        email: isUser?.email,
        phone: isUser?.phone,
        role: isUser?.role
      });
    } else {
      throw new Error('Invalid user id.');
    }
  } catch (error) {
    throw new Error(error);
  }
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (deleteUser) {
      res.status(200).json({ message: 'User deleted.', data: deleteUser });
    } else {
      throw new Error('Invalid user id.');
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser
};