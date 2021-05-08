const User = require('../models/User');
const CustomError = require('../utils/CustomError');

exports.landing = async (req, res, next) => {
  res.render('landing');
};

exports.signupPage = (req, res, next) => {
  res.render('signup');
};

exports.loginPage = (req, res, next) => {
  res.render('login');
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/landing');
};

exports.account = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
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