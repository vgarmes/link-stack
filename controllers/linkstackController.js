const Linkstack = require('../models/Linkstack');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

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
  res.send('upload image');
};

module.exports = {
  createLinkstack,
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  deleteLinkstack,
  uploadImage,
};
