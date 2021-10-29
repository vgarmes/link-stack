const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createLinkstack,
  getAllLinkstacks,
  getSingleLinkstack,
  updateLinkstack,
  deleteLinkstack,
  uploadImage,
} = require('../controllers/linkstackController');

router.route('/').post(authenticateUser, createLinkstack).get(getAllLinkstacks);

router
  .route('/:id')
  .get(getSingleLinkstack)
  .patch([authenticateUser, authorizePermissions('admin')], updateLinkstack)
  .delete([authenticateUser, authorizePermissions('admin')], deleteLinkstack);

router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage);

module.exports = router;
