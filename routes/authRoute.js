const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logoutUser
} = require('./../controller/userCtrl');

const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh/token', handleRefreshToken);
router.get('/logout', logoutUser);
router.get('/all/users', authMiddleware, isAdmin, getAllUser);
router.get('/:id', authMiddleware, getUser);
router.delete('/:id', authMiddleware, isAdmin, deleteUser);
router.put('/update', authMiddleware, updateUser);
router.put('/block/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock/:id', authMiddleware, isAdmin, unblockUser);

module.exports = router;