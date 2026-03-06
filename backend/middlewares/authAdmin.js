import jwt from 'jsonwebtoken';
import 'dotenv/config';
import logger from '../utils/logger.js';
const authAdmin = (req,res,next) => {
    try{
        const token  = req.headers['authorization']?.split(' ')[1] || req.body.adminToken;
        if(!token){
            logger.warn("Token Not provided for the admin");
            return res.status(401).json({success:false,message:"Unauthorized action"});
        }

        const decodedToken  = jwt.verify(token,process.env.JWT_SECRET);
        req.admin = decodedToken;
        logger.info("Admin is Verified");
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


export default authAdmin;