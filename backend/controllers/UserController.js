import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel.js'; 
import mongoose from 'mongoose';
import {generateOtp,sendMailOtp,generateVerificationToken} from '../services/otpgenerator.js';
import {transporter,testConnection} from '../config/nodemailer.js';
import logger from '../utils/logger.js';




// ============================== API TO REGISTER USER ==============================

 const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = email.toLowerCase();
    await testConnection();
    logger.debug('Register attempt for email  =  %s',cleanEmail);

    const existing = await UserModel.findOne({ 'personalInfo.email': cleanEmail });
    if (existing) {
      logger.warn('Registration blocked - user already defined %s',cleanEmail);
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const otp = generateOtp();
    
    const verificationToken = generateVerificationToken();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 10);

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
    logger.info("User registered successfully %s",cleanEmail);

    
    await sendMailOtp(cleanEmail, otp);
    logger.info("OTP send to the email %s",cleanEmail);

    return res.status(201).json({
      success: true,
      message: 'Registration successful. Check email for OTP',
      verificationToken : verificationToken
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
    logger.info("Attempt to login  %s",email);
    const cleanEmail = email.toLowerCase();
    await testConnection();

    const user = await UserModel.findOne({
      'personalInfo.email': cleanEmail,
      isDeleted: false
    }).select('+password +personalInfo.isVerified');

    if (!user) {
      logger.warn("User not Found %s",cleanEmail);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn("Login Failed .Incorrect Password %s",cleanEmail);
      return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    if (!user.personalInfo.isVerified) {
      logger.warn('Login blocked user not verified %s',cleanEmail);

        // =================== HERE SEND HIM THE VERIFICATION TOKEN AND REDIRECT HIM TO THE OTP PAGE

        const otp = generateOtp();
        const verificationToken = generateVerificationToken();
        
        await sendMailOtp(email,otp);
        logger.info("Send him the mail for  the otp %s",cleanEmail);


      return res.status(403).json({
        success: false,
        message: 'Account not verified',
        alert_data : 'Please check your email for otp',
        next_step: 'otp-verification'
      });
    }

    const userToken = jwt.sign(
      { userId: user._id, email: user.personalInfo.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );


    logger.info('User logged in successfully: %s', cleanEmail);

    return res.json({ success: true, userToken});

  } catch (error) {
     logger.error('Login error for email=%s — %s', req.body?.email, error.message);
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};




// ========================== API TO HANDLE THE OTP ===================================


const otpHandler = async(req,res) => {
  try{
    const {otp,verificationToken} = req.body;
    logger.info("Otp verification attempt token  = %s",verificationToken);
    const user = await UserModel.findOne({otp:otp,verificationToken:verificationToken,otp_expiry : {$gt : new Date()}});
    
    if(!user){
      logger.warn('OTP verification failed — invalid or expired token=%s', verificationToken);
      return res.json(403).json({success:false,message:"otp-expired"});
    }

    user.personalInfo.isVerified = true;
    user.otp = null;
    user.otp_expiry = null;
    user.verificationToken = null;


    await user.save();
    logger.info('User verified successfully: %s', user.personalInfo.email);


    // now give him jwt token 

    const userToken = jwt.sign({id:user._id,email:user.personalInfo.email},process.env.JWT_SECRET,{expiresIn:'15m'});
    res.status(200).json({success:true,userToken : userToken});




  }catch(error){
    logger.error('OTP verification error — %s', error.message);
    res.status(500).json({success:false,message:'Internal Error'});

  }
}











// ================================= API TO HANDLE THE RESEND OF THE OTP ========================

const resendOtpToTheUser = async (req, res) => {
  try {
    const { verificationToken } = req.body;

    logger.info("Resend OTP request received");

    if (!verificationToken) {
      logger.warn("Verification token not provided");
      return res.status(400).json({ success: false, message: "Verification token is required" });
    }

    const userData = await UserModel.findOne({ verificationToken });

    if (!userData) {
      logger.warn("Resend OTP failed — invalid token");
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    if (userData.personalInfo.isVerified) {
      logger.warn("Resend OTP attempted for already verified user %s", userData.personalInfo.email);
      return res.status(409).json({ success: false, message: "Account already verified" });
    }

    const otp = generateOtp();
    const newVerificationToken = generateVerificationToken();

    userData.otp = otp;
    userData.verificationToken = newVerificationToken;
    userData.otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

    await userData.save(); 

    await testConnection();
    await sendMailOtp(userData.personalInfo.email, otp);

    logger.info("OTP resent successfully to %s", userData.personalInfo.email);

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      verificationToken: newVerificationToken
    });

  } catch (error) {
    logger.error("Error in resend OTP — %s", error.message);
    return res.status(500).json({ success: false, message: "Internal Error" });
  }
};






export {registerUser,loginUser,otpHandler,resendOtpToTheUser}