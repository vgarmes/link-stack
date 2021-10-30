const Linkstack = require('../models/Linkstack');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const createLinkstack = async (req, res) => {
  req.body.user = req.user.userId;

  const linkstackAlreadyExists = await Linkstack.findOne({
    user: req.body.user,
  });
  if (linkstackAlreadyExists) {
    throw new CustomError.BadRequestError(
      `Linkstack already exists for user ${req.body.user}`
    );
  }

  const linkstack = await Linkstack.create(req.body);

  res.status(StatusCodes.CREATED).json({ linkstack });
};

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

  /* const linkstackImage = req.files.image;

  if (!linkstackImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload an image');
  }

  const maxSize = 1024 * 1024;

  if (linkstackImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    );
  } */

  /* const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: 'linkstack' }
  ); */

  console.log(req.file);

  //res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
  res.status(StatusCodes.OK).json({ msg: 'Success' });
};

module.exports = {
  createLinkstack,
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  deleteLinkstack,
  uploadImage,
};
