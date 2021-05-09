const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const CustomError = require('../utils/CustomError');

exports.landing = async (req, res, next) => {
  res.render('landing');
};

exports.signupPage = (req, res, next) => {
  res.render('signup');
};

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(401).render('signup');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    return next(error);
  }
};

exports.loginPage = (req, res, next) => {
  res.render('login');
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    // successFlash: 'Welcome!',
    // failureFlash: 'Invalid email or password.'
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

exports.account = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.render('account', {
      user
    });
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    return next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    res.render('search');
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    return next(error);
  }
};

exports.chat = async (req, res, next) => {
  try {
    res.render('chat');
  } catch (err) {
    const error = new CustomError('Something went wrong', 500);
    return next(error);
  }
};