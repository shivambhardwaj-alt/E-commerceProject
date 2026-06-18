import {body, validationResult} from 'express-validator';
import logger from '../utils/logger.js';


const createEmailValidation = [
    body().custom((_,{req}) => {
        const {email, phone}  = req.body;
        if(!email && !phone){
            throw new Error("Email or phone is required");
        }
        return true;
    }),
    body("email").optional().isEmail().withMessage("Invalid Phone Number").bail(),
    body("phone").optional().isMobilePhone().withMessage("Invalid Phone Number").bail(),
];

const resetEmailValidation = (req,res,next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        logger.error("Validation of request failed of reseting Password");
        return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
    }else{
        logger.info("Validation for the  request of Resetting password successful");
    }
    next();

}


export {createEmailValidation, resetEmailValidation};