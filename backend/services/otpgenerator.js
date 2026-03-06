import crypto from 'crypto';
import {transporter, testConnection} from '../config/nodemailer.js';
import 'dotenv/config';
const generateOtp = () => {
    return crypto.randomInt(100000,999999).toString();
}


const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
}




const sendMailOtp = async(email,otp) =>{
    try{
        transporter.sendMail({
            from : process.env.NODEMAILER_APP_EMAIL,
            to : email,
            subject : "one time verification",
            text:"Here is your one time verification code",
            html:`<h1> Your one time verification code is ${otp}</h1>
            
            <br />
            <h1> Thank You </h1>
            `

        })
    }catch(error){

            console.log('Error happened in sending of otp',error);



    }
}


export {generateOtp,sendMailOtp,generateVerificationToken};