const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password, address, phone } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  var isnum = /^\d+$/.test(phone);

  if (phone.length !== 10 || isnum == false) {
    const error = new HttpError(
      'Please enter a valid mobile number',
      422
    );
    return next(error);
  }

  let coordinatesArray;
  try {
    coordinatesArray = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  if (coordinatesArray[3] !== 'India') {
    const error = new HttpError(
      'Please enter an address in India',
      422
    );
    return next(error);
  }

  if (coordinatesArray[1] == undefined || coordinatesArray[2] == undefined) {
    const error = new HttpError(
      'Could not get district and state from address. Please enter full address.',
      422
    );
    return next(error);
  }
  
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    address,
    phone,
    location: coordinatesArray[0],
    district: coordinatesArray[1],
    state: coordinatesArray[2],
    country: coordinatesArray[3],
    places: [],
    products: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email }, 
        'supersecret_dont_share', 
        { expiresIn: '1h'}
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ 
      userId: createdUser.id, 
      email: createdUser.email, 
      token: token 
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch(err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }
  
  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email }, 
        'supersecret_dont_share', 
        { expiresIn: '1h'}
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again.',
      500
    );
    return next(error);
  }

  res.json({ 
      userId: existingUser.id, 
      email: existingUser.email, 
      token: token 
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
