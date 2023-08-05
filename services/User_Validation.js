const { validationResult, check } = require('express-validator');

const signupValidation = [
  check('email', 'Email length should be 10 to 30 characters').isEmail().isLength({ min: 10, max: 30 }),
  check('firstName', 'Name length should be min 2 characters').isLength({ min: 2 }),
  check('lastName', 'Name length should be min 2 characters').isLength({ min: 2 }),
  check('password', 'Password length should be 8 to 10 characters').isLength({ min: 8, max: 10 }),
];
const loginValidation = [
  check('email', 'Email length should be 10 to 30 characters').isEmail().isLength({ min: 10, max: 30 }),
  check('password', 'Password length should be 8 to 10 characters').isLength({ min: 8, max: 10 }),
];
module.exports = {
  signupValidation,loginValidation
};