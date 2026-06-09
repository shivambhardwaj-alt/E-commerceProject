import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';


const authUser = (req,res,next) => {
    try{    
        const token = req.headers['authorization']?.split(' ')[1] || req.body.userToken;
        if(!token){
            logger.warn("Token not provided");
            return res.status(401).json({success:false,message:"Unauthorized Action"});
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decodedToken;
        logger.info('User is verified!')
        next();

    }catch(error){

        if(error.name === 'TokenExpiredError'){
            logger.warn('Token Expired');
            return res.status(401).json({success:false,message:"Token Expired"});
        }
        if(error.name === 'JsonWebTokenError'){
            logger.warn('Invalid Token');
            return res.status(401).json({success:false,message:"Invalid Token"});
        }

        logger.error("Erorr happened in the middleware authUser",error);
        return res.status(500).json({success:false,message:'Internal Error'});



    }

}

export default authUser;