// Use npm packages
require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');

// Use routes
const userRoutes = require('./routes/users');
const CustomError = require('./utils/CustomError');
const authenticate = require('./config/passport');
const database = require('./config/database');

// Connect to database
database().catch(err => next(err));

// Connect to passport
authenticate(passport);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));

// Config session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // res.locals.currentUser = req.user;
  next();
});

// Routing
app.use('/', userRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new CustomError('Could not find this route.', 404);
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message || 'Something went wrong';
  res.status(status).render('error', { message });
});

// Connect to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`)
});
