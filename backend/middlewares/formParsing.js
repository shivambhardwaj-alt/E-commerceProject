import logger from '../utils/logger.js';

export const parseFormData = (req, res, next) => {
  try {
    if (req.body) {
      // Keys that are JSON objects/arrays
      const keys_to_parse = [
        "description",
        "pricing",
        "variants",
        "attributes",
        "winterSpecs",
        "sizeGuide",  
        "shipping",
        "returnPolicy",
        "seo",
        "tags",
        "ratings"
      ];

     
      keys_to_parse.forEach((key) => {
        if (req.body[key]) {
          try {
            req.body[key] = JSON.parse(req.body[key]);
          } catch (error) {
            logger.error(`Key "${key}" can't be parsed as JSON:`, error.message);
        
          }
        }
      });

  
      const booleanKeys = [
        "bestseller",
        "featured",
        "newArrival",
        "isActive",
        "isDeleted",
        "taxIncluded",
        "stretchable",
        "layeringFriendly",
        "freeShipping",
        "returnable",
        "exchangeAllowed"
      ];

      booleanKeys.forEach((key) => {
        if (req.body[key] === 'true') {
          req.body[key] = true;
        } else if (req.body[key] === 'false') {
          req.body[key] = false;
        }
      });

     
      const numberKeys = [
        "mrp",
        "sellingPrice",
        "discountPercentage",
        "gstPercentage",
        "stock",
        "priceAdjustment",
        "fabricWeight",
        "returnDays",
        "estimatedDeliveryDays",
        "average",
        "totalReviews"
      ];

      numberKeys.forEach((key) => {
        if (req.body[key] && typeof req.body[key] === 'string') {
          const num = Number(req.body[key]);
          if (!isNaN(num)) {
            req.body[key] = num;
          }
        }
      });

      if (req.body.pricing && typeof req.body.pricing === 'object') {
        const pricingNumberKeys = ['mrp', 'sellingPrice', 'discountPercentage', 'gstPercentage'];
        pricingNumberKeys.forEach((key) => {
          if (req.body.pricing[key]) {
            req.body.pricing[key] = Number(req.body.pricing[key]);
          }
        });
      }
    }

    logger.info("Parsing became Successful here!");
    next();
  } catch (error) {
    logger.error("Parsing Failed of form data:", error.message);
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in data field"
    });
  }
};