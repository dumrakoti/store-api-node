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

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all/users', authMiddleware, isAdmin, getAllUser);
router.get('/:id', authMiddleware, getUser);
router.delete('/:id', authMiddleware, isAdmin, deleteUser);
router.put('/update', authMiddleware, updateUser);

module.exports = router;