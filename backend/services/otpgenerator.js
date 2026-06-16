import crypto from 'crypto';
import { transporter, testConnection } from '../config/nodemailer.js';
import logger from '../utils/logger.js';
import 'dotenv/config';
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
}

const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
}

const sendMailOtp = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.NODEMAILER_APP_EMAIL,
            to: email,
            subject: "one time verification",
            text: "Here is your one time verification code",
            html: `<h1> Your one time verification code is ${otp}</h1>
            <br />
            <h1> Thank You </h1>
            `
        })
    } catch (error) {
        logger.info('Error happened in sending of otp', error);
        return res.status(500).json({success : false , message : "Internal Error"});
    }
}



const sendMailResetLink = async (email, token) => {
    logger.info("SendMailResetLink generated here");
    console.log(token);
    console.log(token.length);
    try {
        await transporter.sendMail({
             from: process.env.NODEMAILER_APP_EMAIL,
            to : email,
            subject : "Resetting Password",
            text : "Please Click on the link below to change Password",
            html : `<h4>Change Password : ${process.env.FRONTEND_LINK}/reset-password/${token}</h4>`

        })
        logger.info("Mail just sent!!");

    } catch (error) {
        logger.info("Failed At sending resetting link");
        throw new error
        
    }




}

export { generateOtp, sendMailOtp, generateVerificationToken,sendMailResetLink };