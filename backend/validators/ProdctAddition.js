


import { body, validationResult } from "express-validator";
import logger from "../utils/logger.js";

const createProductValidation = [


  body("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Product name must be at least 5 characters"),

  body("category")
    .isIn(["Men", "Women", "Kids", "Unisex"])
    .withMessage("Invalid category"),

  body("subCategory")
    .trim()
    .notEmpty()
    .withMessage("Subcategory is required"),

  body("productType")
    .trim()
    .notEmpty()
    .withMessage("Product type is required"),

  body("collection")
    .trim()
    .notEmpty()
    .withMessage("Collection is required"),


  body("description.short")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Short description must be at least 10 characters"),

  body("description.long")
    .optional()
    .isString(),

 
  body("pricing.mrp")
    .isFloat({ gt: 0 })
    .withMessage("MRP must be greater than 0"),

  body("pricing.sellingPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Selling price must be greater than 0"),

  body("pricing.discountPercentage")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be at least 0"),

  body("pricing.gstPercentage")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("GST must be valid number"),

  body("pricing.currency")
    .optional()
    .isIn(["INR", "$"])
    .withMessage("Invalid currency"),

  body("pricing.taxIncluded")
    .optional()
    .isBoolean()
    .withMessage("taxIncluded must be boolean"),


  body("variants")
    .isArray({ min: 1 })
    .withMessage("At least one variant is required"),

  body("variants.*.variantId")
    .notEmpty()
    .withMessage("Variant ID is required"),

  body("variants.*.color")
    .notEmpty()
    .withMessage("Variant color is required"),

  body("variants.*.size")
    .isIn(["XS", "S", "M", "L", "XL", "XXL", "OS"])
    .withMessage("Invalid variant size"),

  body("variants.*.sku")
    .notEmpty()
    .withMessage("Variant SKU is required"),

  body("variants.*.stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),

  body("variants.*.priceAdjustment")
    .optional()
    .isNumeric(),

 
  body("attributes.material")
    .optional()
    .isString(),

  body("attributes.fit")
    .optional()
    .isString(),

  body("attributes.neckline")
    .optional()
    .isString(),

  body("attributes.sleeve")
    .optional()
    .isString(),

  body("attributes.fabricWeight")
    .optional()
    .isNumeric(),

  body("attributes.stretchable")
    .optional()
    .isBoolean(),


  body("returnPolicy.returnable")
    .optional()
    .isBoolean()
    .withMessage("returnable must be boolean"),

  body("returnPolicy.returnDays")
    .optional()
    .isInt({ min: 0 }),

  body("returnPolicy.exchangeAllowed")
    .optional()
    .isBoolean(),

 
  body("isActive").optional().isBoolean({loose : true}),

  body("bestseller")
    .optional()
    .isBoolean(),

  body("featured")
    .optional()
    .isBoolean(),

  body("newArrival")
    .optional()
    .isBoolean(),
];

// SAME middleware
const productValidationRequest = (req, res, next) => {

 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation of the product failed', { errors: errors.array() });
        return res.status(422).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }

    logger.info("Validation of Product successfully done");
    next();
}

export { createProductValidation, productValidationRequest };
