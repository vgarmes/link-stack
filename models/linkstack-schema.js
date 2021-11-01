const mongoose = require('mongoose');

const SingleLinkSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 100 },
    icon: { type: String },
    url: { type: String, maxlength: 1000 },
  },
  { _id: false }
);

const SingleSocialSchema = new mongoose.Schema(
  {
    icon: { type: String },
    url: { type: String, maxlength: 1000 },
  },
  { _id: false }
);

const LinkstackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio can not be more than 1000 characters'],
    },
    image: {
      type: String,
    },
    links: [SingleLinkSchema],
    social: [SingleSocialSchema],
  },
  { _id: false, timestamps: true }
);

module.exports = LinkstackSchema;
