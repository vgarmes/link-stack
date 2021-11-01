const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const upload = require('../middleware/image-upload');

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
  .route('/uploadImage')
  .post(authenticateUser, upload.single('image'), uploadImage);

router.route('/updateLinkstack').patch(authenticateUser, updateLinkstack);

router.route('/:username').get(getSingleLinkstack);

module.exports = router;
