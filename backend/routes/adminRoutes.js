import express from 'express';
import { adminValidationToArray, adminValidator } from '../validators/adminValidator.js';
import { addProduct, loginAdmin } from '../controllers/adminController.js';
import { createProductValidation, productValidationRequest } from '../validators/ProdctAddition.js';
import uploads from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { logPayload } from '../middlewares/printPayload.js';
import { parseFormData } from '../middlewares/formParsing.js';
const adminRouter = express.Router();
adminRouter.post('/login',adminValidationToArray,adminValidator,loginAdmin);
adminRouter.post('/addProduct', uploads.array('images',10),parseFormData,createProductValidation , productValidationRequest,addProduct);
 
export default adminRouter;