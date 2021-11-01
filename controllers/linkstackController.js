const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const getAllLinkstacks = async (req, res) => {
  const linkstacks = await User.find({}).select('linkstack');
  res.status(StatusCodes.OK).json({ linkstacks, count: linkstacks.length });
};

const getSingleLinkstack = async (req, res) => {
  const { username } = req.params;

  const { linkstack } = await User.findOne({ username }).select('linkstack');

  if (!linkstack) {
    throw new CustomError.NotFoundError(
      `No linkstack with username: ${username}`
    );
  }
  console.log(linkstack);
  res.status(StatusCodes.OK).json({ linkstack });
};

const updateLinkstack = async (req, res) => {
  const { linkstack } = req.body;

  const { linkstack: updatedLinkstack } = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { linkstack },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedLinkstack });
};

const uploadImage = async (req, res) => {
  if (!req.file) {
    throw new CustomError.BadRequestError('No file uploaded');
  }

  // upload to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'linkstack',
  });

  // delete tmp file
  fs.unlinkSync(req.file.path);

  if (!result) {
    throw new CustomError.BadRequestError('File upload failed');
  }

  res.status(StatusCodes.OK).json({ image: result.secure_url });
};

module.exports = {
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  uploadImage,
};
