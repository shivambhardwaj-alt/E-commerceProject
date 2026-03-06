import { body, validationResult } from 'express-validator';

// ================= USER REGISTRATION VALIDATION =================
export const validateUserRegistration = [
  // Name validation
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3, max: 20 }).withMessage('Name must be between 3-20 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can contain only letters and spaces'),

  // Email validation
  body('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ min: 4, max: 70 }).withMessage('Email must be between 4-70 characters'),

  // Password validation
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character')
];


export const validateUserLogin = [
     body('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ min: 4, max: 70 }).withMessage('Email must be between 4-70 characters'),

  // Password validation
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character')
]









// ================= VALIDATION ERROR HANDLING MIDDLEWARE =================
export const validateErrors = (req, res, next) => {
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
