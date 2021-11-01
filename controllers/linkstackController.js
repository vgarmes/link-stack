const Linkstack = require('../models/Linkstack');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const getAllLinkstacks = async (req, res) => {
  const linkstacks = await Linkstack.find({});
  res.status(StatusCodes.OK).json({ linkstacks, count: linkstacks.length });
};

const getSingleLinkstack = async (req, res) => {
  const { id: linkstackId } = req.params;

  const linkstack = await Linkstack.findOne({ _id: linkstackId });

  if (!linkstack) {
    throw new CustomError.NotFoundError(`No linkstack with id: ${linkstackId}`);
  }
  res.status(StatusCodes.OK).json({ linkstack });
};

const updateLinkstack = async (req, res) => {
  const { id: linkstackId } = req.params;

  const linkstack = await Linkstack.findOneAndUpdate(
    { _id: linkstackId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!linkstack) {
    throw new CustomError.NotFoundError(`No linkstack with id: ${linkstackId}`);
  }

  res.status(StatusCodes.OK).json({ linkstack });
};

const deleteLinkstack = async (req, res) => {
  const { id: linkstackId } = req.params;
  const linkstack = await Linkstack.findOne({ _id: linkstackId });

  if (!linkstack) {
    throw new CustomError.NotFoundError(`No linkstack with id: ${linkstackId}`);
  }

  await linkstack.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Linkstack removed' });
};

const uploadImage = async (req, res) => {
  if (!req.file) {
    throw new CustomError.BadRequestError('No file uploaded');
  }

  //const linkstackId = Linkstack.findOne({ user: req.user.userId });

  // upload to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'linkstack',
  });

  // delete tmp file
  fs.unlinkSync(req.file.path);

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  deleteLinkstack,
  uploadImage,
};
