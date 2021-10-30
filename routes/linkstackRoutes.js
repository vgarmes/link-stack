const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const upload = require('../middleware/image-upload');

const {
  createLinkstack,
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  deleteLinkstack,
  uploadImage,
} = require('../controllers/linkstackController');

router
  .route('/')
  .post(authenticateUser, createLinkstack)
  .get([authenticateUser, authorizePermissions('admin')], getAllLinkstacks);

router
  .route('/:id')
  .get(getSingleLinkstack)
  .patch([authenticateUser, authorizePermissions('admin')], updateLinkstack)
  .delete([authenticateUser, authorizePermissions('admin')], deleteLinkstack);

router
  .route('/uploadImage')
  .post(
    [authenticateUser, authorizePermissions('admin')],
    upload.single('image'),
    uploadImage
  );

module.exports = router;
