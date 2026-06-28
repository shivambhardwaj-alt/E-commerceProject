import express from 'express';
import { getAllProducts, getBestProducts ,getCartItems,getCategoryCollection,getOurFeaturedProducts, getProductViaId, getRelatedProducts, getWishListProducts } from '../controllers/productController.js';

const productRoutes = express.Router();


productRoutes.get("/bestSeller" ,getBestProducts);
productRoutes.get("/getFeaturedProducts",getOurFeaturedProducts);
productRoutes.get("/category-products/:category" , getCategoryCollection);
productRoutes.get("/main-product",getProductViaId);
productRoutes.get("/get-all-products",getAllProducts);
productRoutes.get("/related-products",getRelatedProducts);
productRoutes.post("/getWishlist",getWishListProducts);
productRoutes.post("/getCartItems" ,getCartItems);


export default productRoutes;