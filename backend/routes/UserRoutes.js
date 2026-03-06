import express from 'express';
import { validateErrors, validateUserLogin, validateUserRegistration } from '../validators/userValidator.js';
import { loginUser, otpHandler, registerUser, resendOtpToTheUser } from '../controllers/UserController.js';
import { otpValidation, otpValidator } from '../validators/otpValidator.js';
import { verificationTokenValidator,verificationTokenValidation } from '../validators/verificationToken.js';

const userRouter = express.Router();

userRouter.post('/login',validateUserLogin,validateErrors,loginUser);
userRouter.post('/register',validateUserRegistration,validateErrors,registerUser);
userRouter.post('/otp',otpValidation,otpValidator,verificationTokenValidation,verificationTokenValidator,otpHandler)
userRouter.post('/resend-otp',verificationTokenValidation,verificationTokenValidator,resendOtpToTheUser);// not working
export default userRouter;
