const mongoose = require('mongoose');

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
    },
    image: {
      type: String,
    },
    links: {
      type: String,
    },
    social: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Linkstack', LinkstackSchema);
