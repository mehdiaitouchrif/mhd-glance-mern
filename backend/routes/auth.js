const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getCurrent,
  logout
} = require('../controllers/auth');

const { requireAuth } = require('../middleweare/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout)
router.get('/currentUser', requireAuth, getCurrent)

module.exports = router;
