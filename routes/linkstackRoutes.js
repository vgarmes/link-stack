const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  uploadToServer,
  uploadCloudinary,
} = require('../middleware/image-upload');

const {
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  updateAvatar,
} = require('../controllers/linkstackController');

router
  .route('/')
  .get([authenticateUser, authorizePermissions('admin')], getAllLinkstacks);

router
  .route('/updateAvatar')
  .patch(
    authenticateUser,
    uploadToServer.single('avatar'),
    uploadCloudinary,
    updateAvatar
  );

router.route('/updateLinkstack').patch(authenticateUser, updateLinkstack);

router.route('/:username').get(getSingleLinkstack);

module.exports = router;
