const mongoose = require('mongoose');

const SingleLinkSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  icon: { type: String, required: true },
  url: { type: String, required: true, maxlength: 1000 },
});

const SingleSocialSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  url: { type: String, required: true, maxlength: 1000 },
});

const LinkstackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio can not be more than 1000 characters'],
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    links: [SingleLinkSchema],
    social: [SingleSocialSchema],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = LinkstackSchema;
