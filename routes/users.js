const express = require('express');
const {
  landing,
  signupPage,
  signup,
  loginPage,
  login,
  logout,
  account,
  search,
  chat
} = require('../controllers/users');
const { isLoggedIn } = require('../middleware/auth');
const router = express.Router();

router.get('/', landing);
router.get('/signup', signupPage);
router.post('/signup', signup);
router.get('/login', loginPage);
router.post('/login', login);
router.get('/logout', logout);
router.get('/account', isLoggedIn, account);
router.get('/search', isLoggedIn, search);
router.get('/chat', isLoggedIn, chat);

module.exports = router;