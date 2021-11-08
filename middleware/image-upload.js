const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const dir = '/tmp/';
const maxSize = 1e6; // maximum file size in bytes

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const uploadToServer = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: {
    fileSize: maxSize,
  },
});

const uploadCloudinary = async (req, res, next) => {
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

  req.file_url = result.secure_url;
  next();
  //res.status(StatusCodes.OK).json({ image: result.secure_url });
};

module.exports = {
  uploadToServer,
  uploadCloudinary,
};
