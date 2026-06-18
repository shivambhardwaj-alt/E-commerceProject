import { body, validationResult } from "express-validator";
import logger from "../utils/logger.js";

const createResetPasswordValidation = [
    body("password").isEmpty().withMessage("Password should be present").bail().isStrongPassword().withMessage("Password Should be Strong").bail().isLength({ max: 100, min: 8 }).withMessage("Password should be at least 8 characters long"),
    body("cofirmPassword").isEmpty().withMessage("Password should be present").bail().isStrongPassword().withMessage("Password Should be Strong").bail().isLength({ max: 100, min: 8 }).withMessage("Password should be at least 8 characters long"),
    body("token").isEmpty().withMessage("token Should be provided").bail().isLength({ min: 64, max: 64 }).bail()

]

const doResetValidation = (req, res, next) => {
    logger.info("Request Generated here for the validation of resetting password");
    try {
        const results = validationResult(req.body);
  
        if (!results.isEmpty()) {
            logger.error("Validation of the Request failed here of doResettValidation");
            return res.status(400).json({
                success: false,
                errors: results.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }

        logger.info("Success in validation for resetting of the password");
        next();

    } catch (error) {
        logger.error("Validation to Change the password is failed");
    }
}

export { doResetValidation, createResetPasswordValidation };