import { body, validationResult } from 'express-validator';

const otpValidation = [
  body('otp')
    .exists().withMessage('OTP is required')
    .bail()
    .isString().withMessage('OTP must be a string')
    .bail()
    .trim()
    .notEmpty().withMessage('OTP cannot be empty')
    .bail()
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be exactly 6 digits')
    .bail()
    .isNumeric().withMessage('OTP must contain only numbers')
];

const otpValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

export { otpValidation, otpValidator };
