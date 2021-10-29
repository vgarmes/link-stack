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
  res.send('get all linkstacks');
};

const getSingleLinkstack = async (req, res) => {
  res.send('get single linkstack');
};

const updateLinkstack = async (req, res) => {
  res.send('update linkstack');
};

const deleteLinkstack = async (req, res) => {
  res.send('delete linkstack');
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
