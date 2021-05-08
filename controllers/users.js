const User = require('../models/User');

exports.landing = async (req, res, next) => {
  res.render('landing');
};

exports.signupPage = (req, res, next) => {
  res.render('auth/signup');
};

exports.loginPage = (req, res, next) => {
  res.render('auth/login');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/landing');
};