import express from 'express';
import { validateErrors, validateUserLogin, validateUserRegistration } from '../validators/userValidator.js';
import { handleResetPassword, loginUser, loginUserViaGoogle, otpHandler, registerUser, resendOtpToTheUser } from '../controllers/UserController.js';
import { otpValidation, otpValidator } from '../validators/otpValidator.js';
import { verificationTokenValidator,verificationTokenValidation } from '../validators/verificationToken.js';
import { createEmailValidation,resetEmailValidation } from '../validators/resetValidation.js';
const userRouter = express.Router();

userRouter.post('/login',validateUserLogin,validateErrors,loginUser);
userRouter.post('/register',validateUserRegistration,validateErrors,registerUser);
userRouter.post('/otp',otpValidation,otpValidator,verificationTokenValidation,verificationTokenValidator,otpHandler);
userRouter.post('/resend-otp',verificationTokenValidation,verificationTokenValidator,resendOtpToTheUser);
userRouter.post('/google-Auth',loginUserViaGoogle);
userRouter.post('/reset-password',createEmailValidation,resetEmailValidation,  handleResetPassword);



export default userRouter;
