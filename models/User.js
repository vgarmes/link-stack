const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const SingleLinkSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 100 },
    icon: { type: String },
    url: { type: String, maxlength: 1000 },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please provide name'],
    minlength: [3, 'Username is too short'],
    maxlength: [50, 'Username is too long'],
    validate: {
      validator: function (v) {
        return validator.matches(v, '^[a-zA-Z0-9_.]*$');
      },
      message:
        'Usernames may only contain letters, numbers, underscores ("_") and periods (".")',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: [6, 'Password is too short'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Date,
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  avatar: String,
  headline: { type: String, maxlength: [100, 'Headline is too long'] },
  bio: { type: String, maxlength: [1000, 'Bio is too long'] },
  links: [SingleLinkSchema],
  social: [SingleLinkSchema],
});

// Hash password
UserSchema.pre('save', async function () {
  // hash password only if we updated it before calling 'save'
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
