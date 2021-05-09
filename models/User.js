const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
	password: {
    type: String,
    required: true,
  },
  age: Number,
  gender: {
    type: String,
    enum: [
      'Male',
      'Female',
      'Other',
    ]
  },
  budget: Number,
  isSmoking: {
    type: Boolean,
    default: false
  },
  dietary: String
});

module.exports = mongoose.model('User', UserSchema);