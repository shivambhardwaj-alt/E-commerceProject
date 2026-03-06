import logger from '../utils/logger.js';

const parseFormData = (req, res, next) => {
    try {
    
        
        if (req.body && req.body.data) {
            req.body.data =  JSON.parse(req.body.data);  
        }
        
        
        next();
    } catch (error) {
        logger.error("Parsing Failed of form data:", error.message);
        return res.status(400).json({ 
            success: false, 
            message: "Invalid JSON in data field" 
        });
    }
};

export { parseFormData };
