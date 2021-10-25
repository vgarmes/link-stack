const User = require('../models/User');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require('../utils');
const crypto = require('crypto');

function getOrigin(request) {
  return process.env.NODE_ENV === 'production'
    ? request.get('origin')
    : 'http://localhost:3000';
}

const register = async (req, res) => {
  // check for duplicated email (though it's also set up as unique on the db)
  const { email, username, password } = req.body;
  const emailAlredyExists = await User.findOne({ email });
  if (emailAlredyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    email,
    username,
    password,
    role,
    verificationToken,
  });

  const origin = getOrigin(req);

  await sendVerificationEmail({
    username: user.username,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // send verification token back only while testing in postman!
  res.status(StatusCodes.CREATED).json({
    msg: 'Success!',
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Verification failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError('Verification failed');
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email verified' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  /* UNCOMMENT THIS WHEN USING EMAIL VERIFICATION! 
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('Please verify your email.');
  } 
  */

  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = '';

  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError.BadRequestError('Please provide valid email');
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex');
    // send email

    const origin = getOrigin(req);

    await sendResetPasswordEmail({
      username: user.username,
      email: user.email,
      token: passwordToken,
      origin,
    });
    const expiration = 1000 * 60 * 10; // 10 minutes
    const passwordTokenExpirationDate = new Date(Date.now() + expiration);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  // we always send the same response so possible attackers can't know if an email exists or not
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for forget password link' });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    throw new CustomError.BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: 'Success' });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
