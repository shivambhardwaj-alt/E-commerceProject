import {body,validationResult} from 'express-validator';
import logger from '../utils/logger.js';



const adminValidationToArray = [
    body("email")
    .trim()
    .normalizeEmail()
    .isEmail().withMessage("It should be email")
    .bail()
    .notEmpty().withMessage("It should not be empty")
    .bail()
    .toLowerCase()
    .isLength({ min: 4, max: 70 }).withMessage('Email must be between 4-70 characters'),
    ,
    body("password")
     .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character')
]


const adminValidator =(req,res,next) => {
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        logger.error("Error in email or password in admin Login");
         return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
    

  next();
}


export {adminValidationToArray,adminValidator};