// Use npm packages
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

// Use routes
const userRoutes = require('./routes/users');
const CustomError = require('./utils/CustomError');

// Connect to database
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Connect to mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));

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
