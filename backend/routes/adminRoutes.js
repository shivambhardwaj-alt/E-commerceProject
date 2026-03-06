import express from 'express';
import { adminValidationToArray, adminValidator } from '../validators/adminValidator.js';
import { addProduct, loginAdmin } from '../controllers/adminController.js';
import { createProductValidation, productValidationRequest } from '../validators/ProdctAddition.js';
import uploads from '../middlewares/multer.js';
import { parseFormData } from '../middlewares/formParsing.js';
import authAdmin from '../middlewares/authAdmin.js';


const adminRouter = express.Router();
adminRouter.post('/login',adminValidationToArray,adminValidator,loginAdmin);
//  i have to add more routes for the admin related with profile 


adminRouter.post('/addProduct',authAdmin,uploads.array('image',10),parseFormData,createProductValidation,productValidationRequest,addProduct);






export default adminRouter;