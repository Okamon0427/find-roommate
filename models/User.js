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
  phone: String,
  preference: String,
  budget: Number,
  gender: {
    type: String,
    enum: [
      'Male',
      'Female',
      'Other',
    ]
  },
  location: String,
  isSharedBathroom: {
    type: Boolean,
    default: false
  },
  isHavingPets: {
    type: Boolean,
    default: false
  },
  isSmoking: {
    type: Boolean,
    default: false
  },
  dietary: String
});

module.exports = mongoose.model('User', UserSchema);