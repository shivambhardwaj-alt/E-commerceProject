import { body, validationResult, query } from 'express-validator';
import logger from '../utils/logger.js';


const createProductValidation = [
   
    body('data')
        .notEmpty().withMessage('Product data is required'),

  
    body('data.name').trim().isLength({ min: 5 }).withMessage('Product name must be at least 5 characters'),
    body('data.category').isIn(['Men', 'Women', 'Kids','Unisex']).withMessage('Invalid category'),
    body('data.subCategory').trim().notEmpty().withMessage('Subcategory is required'),
    body('data.productType').trim().notEmpty().withMessage('Product type is required'),
    body('data.collection').trim().notEmpty().withMessage('Collection is required'),

 
    body('data.description.short').trim().isLength({ min: 10 }).withMessage('Short description must be at least 10 characters'),


    body('data.pricing.mrp').isFloat({ gt: 0 }).withMessage('MRP must be greater than 0'),
    body('data.pricing.sellingPrice').optional().isFloat({ gt: 0 }).withMessage('Selling price must be greater than 0'),
    body('data.pricing.discountPercentage').optional().isFloat({ min: 0 }).withMessage('Discount must be at least 0'),

 
    body('data.variants').isArray({ min: 1 }).withMessage('At least one variant is required'),
    body('data.variants.*.variantId').notEmpty().withMessage('Variant ID is required'),
    body('data.variants.*.color').notEmpty().withMessage('Variant color is required'),
    body('data.variants.*.size').isIn(['XS','S','M','L','XL','XXL','OS']).withMessage('Invalid variant size'),
    body('data.variants.*.sku').notEmpty().withMessage('Variant SKU is required'),
    body('data.variants.*.stock').isInt({ min: 0 }).withMessage('Variant stock must be a non-negative integer'),

 
    // body('data.attributes.neckline').notEmpty().withMessage('Neckline is required'),


    body('data.returnPolicy.returnable').isBoolean().withMessage('returnable must be boolean'),

  
    body('data.isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

// SAME middleware
const productValidationRequest = (req, res, next) => {
  console.log(req.body);
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation of the product failed', { errors: errors.array() });
        return res.status(422).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
}

export { createProductValidation, productValidationRequest };
