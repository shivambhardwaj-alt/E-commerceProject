import express from 'express';
import { getAllProducts, getBestProducts ,getCategoryCollection,getOurFeaturedProducts, getProductViaId } from '../controllers/productController.js';

const productRoutes = express.Router();


productRoutes.get("/bestSeller" ,getBestProducts);
productRoutes.get("/getFeaturedProducts",getOurFeaturedProducts);
productRoutes.get("/category-products/:category" , getCategoryCollection);
productRoutes.get("/main-product",getProductViaId);
productRoutes.get("/get-all-products",getAllProducts);


export default productRoutes;