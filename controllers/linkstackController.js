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

  const linkstack = await User.findOne({ username }).select(
    'avatar headline bio links social'
  );

  if (!linkstack) {
    throw new CustomError.NotFoundError(
      `No linkstack with username: ${username}`
    );
  }

  res.status(StatusCodes.OK).json({ linkstack });
};

const updateLinkstack = async (req, res) => {
  const { avatar, headline, bio, links, social } = req.body;

  const updatedLinkstack = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { avatar, headline, bio, links, social },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedLinkstack });
};

const updateAvatar = async (req, res) => {
  if (!req.file_url) {
    throw new CustomError.BadRequestError('No file uploaded to cloud');
  }

  await User.findOneAndUpdate(
    { _id: req.user.userId },
    { avatar: req.file_url },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ avatar: req.file_url });
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
  updateAvatar,
  uploadImage,
};
