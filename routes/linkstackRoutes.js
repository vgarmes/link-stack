const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const { uploadToServer } = require('../middleware/image-upload');

const {
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  uploadImage,
} = require('../controllers/linkstackController');

router
  .route('/')
  .get([authenticateUser, authorizePermissions('admin')], getAllLinkstacks);

router
  .route('/uploadAvatar')
  .post(authenticateUser, uploadToServer.single('avatar'), uploadImage);

router.route('/updateLinkstack').patch(authenticateUser, updateLinkstack);

router.route('/:username').get(getSingleLinkstack);

module.exports = router;
