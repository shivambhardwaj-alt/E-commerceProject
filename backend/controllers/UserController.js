import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js';
import mongoose from 'mongoose';
import { generateOtp, sendMailOtp, generateVerificationToken ,sendMailResetLink } from '../services/otpgenerator.js';
import { transporter, testConnection } from '../config/nodemailer.js';
import logger from '../utils/logger.js';
import { compareOtp } from '../utils/allCompare.js';




// ============================== API TO REGISTER USER ==============================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = email.toLowerCase();
    logger.debug('Register attempt for email  =  %s', cleanEmail);
    const existing = await UserModel.findOne({ 'personalInfo.email': cleanEmail });
    if (existing) {
      logger.warn('Registration blocked - user already defined %s', cleanEmail);
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const numericalOtp = generateOtp();
    const otp = await bcrypt.hash(numericalOtp, 10);



    const verificationToken = generateVerificationToken();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);


    // i should hash the otp also here 


    await UserModel.create({
      role: 'customer',
      personalInfo: {
        name,
        email: cleanEmail,
        isVerified: false
      },
      password: hashedPassword,
      otp,
      otp_expiry,
      verificationToken
    });
    logger.info("User registered successfully %s", cleanEmail);


    await sendMailOtp(cleanEmail, numericalOtp);
    logger.info("OTP send to the email %s", cleanEmail);

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Check email for OTP',
      verificationToken: verificationToken
    });

  } catch (error) {
    // console.error(error);
    logger.error('Register failed for email=%s — %s', req.body?.email, error.message);
    return res.status(500).json({ success: false, message: 'Registration failed' });
  }
};




//  ====================== API FOR THE LOGIN OF THE USER ===============================


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("Attempt to login  %s", email);
    const cleanEmail = email.toLowerCase();
    const user = await UserModel.findOne({
      'personalInfo.email': cleanEmail,
      isDeleted: false
    }).select('+password +personalInfo.isVerified');
    if (!user) {
      logger.warn("User not Found %s", cleanEmail);
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn("Login Failed .Incorrect Password %s", cleanEmail);
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    if (!user.personalInfo.isVerified) {
      logger.warn('Login blocked user not verified %s', cleanEmail);

      // =================== HERE SEND HIM THE VERIFICATION TOKEN AND REDIRECT HIM TO THE OTP PAGE

      const otp = generateOtp();
      const verificationToken = generateVerificationToken();

      await sendMailOtp(email, otp);
      logger.info("Send him the mail for  the otp %s", cleanEmail);


      return res.status(403).json({
        success: false,
        message: 'Account not verified',
        alert_data: 'Please check your email for otp',
        next_step: 'otp-verification'
      });
    }

    const userToken = jwt.sign(
      { userId: user._id, email: user.personalInfo.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );


    logger.info('User logged in successfully: %s', cleanEmail);

    return res.json({ success: true, userToken });

  } catch (error) {
    logger.error('Login error for email=%s — %s', req.body?.email, error.message);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};




// ========================== API TO HANDLE THE OTP ===================================


const otpHandler = async (req, res) => {
  try {
    const { otp, verificationToken } = req.body;

    logger.info("Otp verification attempt token  = %s", verificationToken);

    //do it here step by  step 
    const user = await UserModel.findOne({ verificationToken: verificationToken });

    if (!user) {
      logger.warn('OTP verification failed — invalid or expired token=%s', verificationToken);
      return res.status(404).json({ success: false, message: "User Not Found" });
    }
    if (user.otp_expiry <= new Date()) {
      logger.warn("OTP timelimit Expired!");
      return res.status(403).json({ success: false, message: "otp-expired" });
    }
    const comparisonResult = await compareOtp(otp, user.otp);
    if (!comparisonResult) {
      logger.info("Wrong Otp filled");
      return res.status(401).json({ success: false, message: "Please fill otp correctly" });
    }
    user.personalInfo.isVerified = true;
    user.otp = null;
    user.otp_expiry = null;
    user.verificationToken = null;
    await user.save();
    logger.info('User verified successfully: %s', user.personalInfo.email);
    // now give him jwt token 
    const userToken = jwt.sign({ id: user._id, email: user.personalInfo.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.status(200).json({ success: true, userToken: userToken });
    logger.info("Message after verifying user has been send !");

  } catch (error) {
    logger.error('OTP verification error — %s', error.message);
    res.status(500).json({ success: false, message: 'Internal Error' });

  }
}

// ================================= API TO HANDLE THE RESEND OF THE OTP ========================

// don't forget to limit count of resend otp
const resendOtpToTheUser = async (req, res) => {
  try {
    const { verificationToken } = req.body;

    logger.info("Resend OTP request received");

    if (!verificationToken) {
      logger.warn("Verification token not provided");
      return res.status(400).json({ success: false, message: "Verification token is required" });
    }

    const userData = await UserModel.findOne({ verificationToken: verificationToken });

    if (!userData) {
      logger.warn("Resend OTP failed — invalid token");
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }



    const numericalotp = generateOtp();
    const otp = await bcrypt.hash(numericalotp, 10);
    userData.otp = otp;

    userData.otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
    await userData.save();
    await sendMailOtp(userData.personalInfo.email, numericalotp);
    logger.info("OTP resent successfully to %s", userData.personalInfo.email);
    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",

    });

  } catch (error) {
    logger.error("Error in resend OTP — %s", error.message);
    return res.status(500).json({ success: false, message: "Internal Error" });
  }
};




const loginUserViaGoogle = async (req, res) => {
  try {
    logger.info("Login Attempt Request Generated here in via Oauth");
    const data = req.body;
    const newDocumentToSave = {
      personalInfo: {
        name: data.name,
        email: data.email,
        isVerified: true,
        sub: data.sub,
      },
      authProvider: "google",
    }
    logger.info("Document formed to save into the database for login via Oauth");
    const documentToSave = new UserModel(newDocumentToSave);
    const checkfind = await UserModel.findOne({$or : [{"googleId" : data.sub } , {"personalInfo.email" : email}]});
    console.log(checkfind);
    if (!checkfind) {
      logger.info("Adding new user into the database");
      try {
        const result = await documentToSave.save();
        if (result) {
          logging.info("Document Saved of the user via Oauth");
          const token = jwt.sign({ userId: result._id, email: result.personalInfo.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' });
          return res.status(200).json({success : true ,message : "Registration Successful" , userToken : token});

        } else {
          logger.error("Failed to Save the Document");
          return res.status(400).json({ success: false, message: "Registration Failed" });
        }
      } catch (error) {
        logger.info("Registration of the user failed via Oauth");
        return res.stats(400).json({ success: false, message: "Login Failed" });
      }
    }else{
      try{ 
        logging.info("User Exists via Oauth and trying to Login");
      const _id = checkfind._id;
      const email = checkfind.personalInfo.email ;
      const token = jwt.sign({userId : result._id,email : result.personalInfo.email} , process.env.JWT_SECRET,{expiresIn : '15m'});
      return res.status(200).json({success : true, message : "Login Successful", userToken : token});
      }catch(error){
        logger.error("login Failed via Oauth");
        return res.status(400).json({success : false, message : "Login Failed"});
      }
    }
  } catch (error) {
    logger.error("Failed in login with google attempt for request");
    return res.status(400).json({ success: false, message: "Login failed" });
  }
}


// ================== API for the handling of resetting of passsword ========================


const handleResetPassword = async(req,res) => {
  logger.info("Request generated here for resetting password");
  try{
    const {email , phone} = req.body;
    console.log()
    if(email){
      const user = await UserModel.findOne({$or: [
        {"personalInfo.email" : email},
        {"personalInfo.phone" : phone}
      ]});
      if(!user){
        logger.info("User not found in the database");
        return res.status(404).json({success : false, message : "User Not Found"});
      }
      
      const token = generateVerificationToken();
      await sendMailResetLink(email , token);
      
      
      // token expiry is need here so don't forget that
      try{
        const _id = await UserModel.updateOne({_id : user._id} , {$set : { reset_token : token }});
        logger.info("token given and user saved successfully with token :")
        logger.info("Mail sent successfully");
        return res.status(200).json({success : true, token: token});
      }catch(error){
        logger.info("failed in saving into the  database");
        throw new error;
      }

    }else if(phone){
        return res.status(503).json({success : false , message : "Service Unavailable , Please try email"});
    }else{
      return res.status(404).json({success : false , message : "No user Exists"});
    }

  }catch(error){
    return res.status(500).json({success : false, message : "Internal Error"});
  }
}

// ========================== API TO HANDLE CHANGING OF THE PASSWORD===============================
const ResetPasswordOfTheUser = async(req,res) => {
  logger.info("Request Generate here for the resetting of the password here ");

  try{
    
    const {password, confirmPassword, token} = req.body;
    if(password !== confirmPassword){
      logger.error("Password doesn't matched of the user here failed");
      return res.status(400).json({success : false, message : "Password doesn't matched"})
    }
    const user = await UserModel.findOne({"reset_token" : token});
    if(!user){
      logger.info("User not found in the database");
      return res.status(404).json({success : false, message : "User Not found"});
    }
    // now change the password of the user here
    const newPasswordhash = await bcrypt.hash(password,10);
      logger.info("Saving the user after update");
     try{
      user.password = newPasswordhash;
      user.reset_token = null;

      const newUser = await user.save();
      if(!newUser){
        logger.info("Saving of the user failed");
        throw new Error("Something went wrong with saving of user in ResetPasswordOftheuser");
      }else{
        const userToken = jwt.sign({userId:newUser._id ,email : newUser.personalInfo.email} , process.env.JWT_SECRET , {expiresIn:"15m"});
        logger.info("jwt token has been assigned to the user"); 
        return res.status(200).json({success : true , message : "Password changed Successfully" , token : userToken});
      }
    }catch(error){
      logger.info("Error happened in saving of the user for changing password here");
      throw new Error("Something went wrrong with saving of user in ResetPasswordoftheuser");
    }



  }catch(error){
    console.log(error);
    logger.info("Error happened here ");
    return res.status(500).json({success :false, message : "Internal Error"});

  }

}




export { registerUser, loginUser, otpHandler, resendOtpToTheUser, loginUserViaGoogle ,handleResetPassword,ResetPasswordOfTheUser };