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

const router = express.Router();

router.get('/', landing);
router.get('/signup', signupPage);
router.post('/signup', signup);
router.get('/login', loginPage);
router.post('/login', login);
router.get('/logout', logout);
router.get('/:id', account);
router.get('/:id/search', search);
router.get('/:id/chat', chat);

module.exports = router;