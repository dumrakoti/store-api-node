const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser
} = require('./../controller/userCtrl');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all/users', getAllUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;