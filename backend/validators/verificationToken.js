import {body,validationResult} from 'express-validator';



const verificationTokenValidation = [
    body('verificationToken')
    .exists().withMessage("Verification Token is required")
    .bail()
    .isString().withMessage("Verification Token should be a String")
    .bail()
    .trim()
    .notEmpty().withMessage("Verification Token cannot be empty")
    .isLength({min:64 , max:64})
    .bail()
    .matches(/^[a-f0-9]+$/).withMessage('Invalid verification token format')


]



const verificationTokenValidator = (req, res, next) => {
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


export {verificationTokenValidator,verificationTokenValidation};