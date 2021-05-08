const express = require('express');

const {
  landing,
  signupPage,
  loginPage,
  logout
} = require('../controllers/users');

const router = express.Router();

router.get('/', landing);
router.get('/signup', signupPage);
// router.post('/signup', signup);
router.get('/login', loginPage);
// router.post('/login', login);
router.get('/logout', logout);

module.exports = router;