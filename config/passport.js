const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function (passport) {
  // Passport Local
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      (email, password, done) => {
        User.findOne({ email }, (err, user) => {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};