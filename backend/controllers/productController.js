import { FAILOVER_MODES, TIME_SERIES_BUCKET_TIMESTAMP } from "redis";
import productModel from "../models/productModel.js";
import logger from "../utils/logger.js";
import e from "express";
import mongoose from "mongoose";
import { generateProductRelatedProducts, generateWishListProducts, makeProducts } from "../services/processQueries.js";



// ===================== CONTROLLER TO GET BEST PRODUCTS FOR HOMEPAGE I HAVE TO DELIVER ONLY 4 BEST ==============================



const getBestProducts = async (req, res) => {
    logger.info("Request Generated here for the best Seller Home page");



    try {
        logger.info("Trying to find the products");
        const products = await productModel.aggregate([
            {
                $match: {
                    isActive: true,
                    isDeleted: false,
                },
            },
            {
                $addFields: {
                    score: {
                        $add: [
                            { $multiply: ["$ratings.average", 20] },
                            { $multiply: ["$ratings.totalReviews", 2] },
                            { $cond: ["$featured", 10, 0] },
                            { $cond: ["$newArrival", 5, 0] },
                        ],
                    },
                },
            },
            {
                $sort: {
                    score: -1,
                },
            },
            {
                $limit: 4,
            },
        ]);



        if (products.length === 0) {
            logger.warn("Product length was zero in best Seller home page ");
            return res.status(404).json({ success: false, message: "Product Not found" });
        }

        return res.status(200).json({ success: true, data: products, message: "products for the home page" });




    } catch (error) {
        logger.error("Error happened bestSeller", error.message);
        return res.status(500).json({ success: false, message: "Internal Error" });
    }












}



// ================================ CONTROLLER FOR OUT FEATURED PRODUCTS (HOME PAGE) =========================
const getOurFeaturedProducts = async (req, res) => {
    logger.info("Query generated for the our featured products");
    try {
        logger.info("trying to fetch the products from the database");

        const featuredProducts = await productModel.aggregate([
            {
                $match: {
                    featured: true,
                    isActive: true,
                    isDeleted: false,
                }

            },

            {
                $addFields: {
                    score: {
                        $add: [
                            { $multiply: ["$ratings.average", 20] },
                            { $multiply: ["$ratings.totalReviews", 2] },
                            { $cond: ["$newArrival", 5, 0] },
                        ]
                    }
                }
            },
            {
                $limit: 4,
            },
            {
                $sort: { score: 1 }, // don't forget to sort in descending order    
            },





        ]);



        logger.info("Products fetched for  our featured products homepage");


        if (featuredProducts.length === 0) {
            logger.warn("Length of Our featured product found 0 at this query");
            return res.status(404).json({ success: false, message: "products not Found" });
        }
        logger.info("Query Successful");
        return res.status(200).json({ message: "products for Our featured", success: true, data: featuredProducts });

    } catch (error) {
        logger.error("Error happened in get Our featured Products", error.message);
        return res.status(500).message({ success: false, message: "Internal Error" });
    }




}

// ================================ CONTROLLER FOR GETTING ALL THE PRODUCTS (ADMIN) ========================


const getAllProducts = async (req, res) => {

    logger.info("Query generated at getAllProducts");
    try {
        const { page } = req.query;

        const options = {
            page: parseInt(page),
            limit: 5,

        }

        const products = await productModel.paginate({}, options);
       
        if (!res) {
            logger.info("Result is not found in getAllProducts");
            return res.status(404).json({ success: false, message: "Products Not Found" });
        }
        const dataforAdmin = [];
  

for (const product of products.docs) {
    for (const variant of product.variants) {
        const temp = {};
        temp.name = product.name;
        temp.slug = product.slug;
        temp.brand = product.brand;
        temp.pricing = product.pricing;
        temp.category = product.category;
        temp.subCategory = product.subCategory;

        temp.color = variant.color;
        temp.size = variant.size;
        temp.stock = variant.stock;
        temp.priceAdjustment = variant.priceAdjustment;
        temp.image = variant.image;

        temp.shipping = product.shipping;
        temp.ratings = product.ratings;
        temp.isActive = product.isActive;
        temp.lowStock = variant.stock <= 5  ;

        dataforAdmin.push(temp);
    }


}

       const frontendData =  {
            docs : dataforAdmin,
            totalDocs : products.totalDocs,
            limit : products.limit,
            totalPages : products.totalPages,
            page : products.page,
            pagingCounter : products.pagingCounter,
            hasPrevPage : products.hasPrevPage,
            hasNextPage :products.hasNextPage,
            prevPage : products.prevPage,
            nextpage : products.nextPage,

        }

        logger.info("Query Successful");
        return res.status(200).json({ success: true, message: "All products for admin", product: frontendData});

    } catch (error) {
        logger.warn("Query Failed");
        logger.warn("Error happened at getAllProducts", error);
        return res.status(500).json({ success: false, message: "Internal Error" });

    }
}


// ===========================CONTROLLER FOR category COLLECTION PAGE(FRONTEND) ================ 

const getCategoryCollection = async (req, res) => {
    logger.info("Query Generated at getCategoryCollections");
    try {
        let { category } = req.params;

        const products = await productModel.find({
            isActive: true, isDeleted: false, $or: [
                { category },

            ]
        });

        const processedProducts = makeProducts(products);

        if (products.length === 0) {
            logger.info("products length is 0 for this query ");
            return res.status(404).json({ success: false, message: "Products Not Found" });
        }
        return res.status(200).json({ success: true, message: `Products for ${category} Collection`, data: processedProducts });
    } catch (error) {
        logger.warn("Query Failed");
        logger.warn("Error happened at getMensCollection", error);

        return res.status(500).json({ success: false, message: "Internal Error" });
    }
}


// ========================== CONTROLLER FOR GETTING PRODUCT VIA ID (FRONTEND)======================


const getProductViaId = async (req, res) => {
    logger.info("Query generated here here getProductViaId and query parameter is slug");
    try {

        const { slug } = req.query;
        console.log(req.query);

        const product = await productModel.findOne({ slug: slug });

        if (!product) {
            logger.info("Product not Found in the database");
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }
        logger.info("Query  Successful");
        return res.status(200).json({ success: true, message: "Product Details for Product Page", data: product });

    } catch (error) {
        logger.error("Error happened at getProductViaId", error);
        return res.status(500).json({ success: false, message: "Internal Error" });

    }
}


const getRelatedProducts = async (req, res) => {
    logger.info("Query Generated at getRelatedProducts");
    try {

        const { category, brand } = req.query;
        const products = await productModel.find({ category, brand });
        const processedProducts = generateProductRelatedProducts(products);
        logger.info("fetched Products if available from database");
        if (!products) {
            logger.warn("No related Product found here");
            return res.status(404).json({ success: false, message: "Products Not Found" });
        }
        logger.info("Query Successful");
        return res.status(200).json({ success: true, message: "Related Products Via category and brand", data: processedProducts });




    } catch (error) {
        logger.error("Error happened at getRelatedProducts", error);
        return res.status(500).json({ success: false, message: "Internal Error" });
    }
}




const getWishListProducts = async (req, res) => {
    logger.info("Query Generated for the getWishList")
    try {

        const { productsId } = req.body;

        let products = await productModel.find({
            _id: {
                $in: productsId,
            }
        });


        products = generateWishListProducts(products);

        if (!products) {
            logger.warn("Product Not found the request");
            return res.status(404).json({ success: false, message: "Product Not Found" });
        }
        logger.info("Query Successful");
        return res.status(200).json({ success: true, message: "Products for the  Wishlist", data: products });

    } catch (error) {
        logger.error("Error happened in getWishListProducts", error);
        return res.status(500).json({ success: false, message: "Internal Error" });

    }
}





const getCartItems = async (req, res) => {
    logger.info("Query Generated at getCartItems");
    try {
        const { variantsId } = req.body;
        if(variantsId.length === 0){
              return res.status(200).json({
            success: true,
            data: [],
            message: "Products for the cartItems",
        });
        }

        const ids = variantsId.map(
            id => new mongoose.Types.ObjectId(id)
        );

        const products = await productModel.aggregate([
            {
                $match: {
                    "variants._id": {
                        $in: ids
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    slug: 1,
                    brand: 1,
                    pricing: 1,
                    ratings: 1,
                    bestSeller: 1,
                    newArrival: 1,
                    category: 1,

                    variants: {
                        $filter: {
                            input: "$variants",
                            as: "variant",
                            cond: {
                                $in: [
                                    "$$variant._id",
                                    ids
                                ]
                            }
                        }
                    }
                }
            }
        ]);
        if (!products || products.length === 0) {
            logger.warn("Products Not Found for getCartItems");
            return res.status(404).json({ success: false, message: "Product Not found" });
        }




        logger.info("Query  Successful");

        return res.status(200).json({
            success: true,
            data: products,
            message: "Products for the cartItems",
        });

    } catch (error) {
        logger.error("Error happened at getCartItems ", error);
        return res.status(500).json({
            success: false
        });
    }
}


export {
    getBestProducts, getOurFeaturedProducts, getAllProducts, getCategoryCollection, getProductViaId,
    getRelatedProducts,
    getWishListProducts,

    getCartItems,

};