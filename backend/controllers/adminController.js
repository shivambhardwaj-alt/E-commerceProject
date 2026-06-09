import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';
import productModel from '../models/productModel.js';
import { generateSlug } from '../services/generateSlug.js';
import { v2 as cloudinary } from 'cloudinary';
import uploadImagesToCloudinary from '../services/uploadImages.js';



const loginAdmin = (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info("Admin Login Attempt");
        if (!email || !password) {
            logger.warn("Invalid Credentials");
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }
        if (email !== process.env.ADMIN_GMAIL || password !== process.env.ADMIN_PASSWORD) {
            logger.warn("Invalid Admin Credentials");
            return res.status(400).json({ success: false, message: "Invalid Admin Credentials" });
        }
        const adminToken = jwt.sign({ admin_email: process.env.ADMIN_EMAIL, role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info("Token assigned to the Admin");
        return res.status(200).json({ success: true, adminToken: adminToken });

    } catch (error) {

        logger.error("Internal Error", error);
        res.status(500).json({ success: false, message: "Internal Error" });

    }
}











// ================================ API TO ADD NEW WINTER PRODUCT IN THE DATABASE =======================



const addProduct = async (req, res) => {
    try {
        logger.info('Product Addition request generated here');
        const dataForDatabase = req.body;
        const imageFiles = req.files;
        logger.info("Uploading images on cloudinary to getting the url");
        const res = await uploadImagesToCloudinary(imageFiles);
        if (res) {
            logger.info("Got the urls from the cloudinary");
        } else {
            logger.info("Failed to get the url from cloudinary");
        }
        //============== now adding the product into the database here//===============
        logger.info("Adding the Product into the Database");

        // making json of the product 

        const product = {
            name: dataForDatabase.name,
            slug: dataForDatabase.slug,
            brand: dataForDatabase.brand,
            description: {
                short: dataForDatabase.description.short,
                long: dataForDatabase.description.long,
            },
            pricing: {
                mrp: Number(dataForDatabase.pricing.mrp),
                discountPercentage: Number(dataForDatabase.pricing.discountPercentage || 0),
                gstPercentage: Number(dataForDatabase.pricing.gstPercentage || 0),
                currency: dataForDatabase.pricing.currency || 'INR',
                taxIncluded: dataForDatabase.pricing.taxIncluded,
                sellingPrice: (() => {
                    const mrp = Number(dataForDatabase.pricing.mrp || 0);
                    const discountPercentage = Number(dataForDatabase.pricing.discountPercentage || 0);
                    const gstPercentage = Number(dataForDatabase.pricing.gstPercentage || 0);

                    const discounted = mrp - (mrp * (discountPercentage / 100));
                    return discounted + (discounted * (gstPercentage / 100));
                })(),
            },
            category: dataForDatabase.category,
            subCategory: dataForDatabase.subCategory,
            productType: dataForDatabase.productType,
            //  images added to be here 
            images: [res],
            collection: dataForDatabase.collection,

            variants: dataForDatabase.variants,

            attributes: {
                material: dataForDatabase.attributes.material,
                fit: dataForDatabase.attributes.fit,
                neckline: dataForDatabase.attributes.neckline,
                sleeve: dataForDatabase.attributes.sleeve,
                fabricWeight: dataForDatabase.attributes.fabricWeight,
                stretchable: dataForDatabase.attributes.stretchable

            },

            winterSpecs: {
                temperature_rating: dataForDatabase.winterSpecs.temperature_rating,
                layeringFriendly: dataForDatabase.winterSpecs.layeringFriendly,
                insulationLevel: dataForDatabase.winterSpecs.insulationLevel,

            },
            sizeGuide: {
                modelHeight: dataForDatabase.sizeGuide.modelHeight,
                modelSize: dataForDatabase.sizeGuide.modelSize,
                fitAdvice: dataForDatabase.sizeGuide.fitAdvice,
            },
            shipping: {
                weightInGrams: dataForDatabase.shipping.weightInGrams,
                dimensions: dataForDatabase.shipping.dimensions,
                freeShipping: dataForDatabase.shipping.freeShipping,
                estimatedDeliveryDays: dataForDatabase.shipping.estimatedDeliveryDays,

            },
            returnPolicy: {
                returnable: dataForDatabase.returnPolicy.returnable,
                returnDays: dataForDatabase.returnPolicy.returnDays,
                exchangeAllowed: dataForDatabase.returnPolicy.exchangeAllowed,
            },
            ratings: {
                average: dataForDatabase.ratings.average,
                totalReviews: dataForDatabase.ratings.totalReviews,
                breakdown: {
                    5: dataForDatabase.ratings.breakdown[5] || 0,
                    4: dataForDatabase.ratings.breakdown[4] || 0,
                    3: dataForDatabase.ratings.breakdown[3] || 0,
                    2: dataForDatabase.ratings.breakdown[2] || 0,
                    1: dataForDatabase.ratings.breakdown[1] || 0,
                }

            },
            bestSeller: dataForDatabase.bestseller,
            featured: dataForDatabase.featured,
            newArrival: dataForDatabase.newArrival,
            seo: {
                title: dataForDatabase.seo.title,
                description: dataForDatabase.seo.description,
                keywords: dataForDatabase.seo.keywords,

            },
            isActive: dataForDatabase.isActive,
            isDeleted: dataForDatabase.isDeleted,

        }
        logger.info("Product formed to save into the Database");
        const ProductToBeAdded = new productModel(product);

        const savedProduct = await ProductToBeAdded.save();

        console.log(savedProduct);

        logger.info(`Product saved successfully: ${savedProduct._id}`);

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: savedProduct,
        });
    } catch (error) {
        logger.error("Error happened in adding product file => AdminController Function => addProduct");
        return res.status(500).json({ success: false, message: "Bad Request", error: error.message });
    }
};









export { loginAdmin, addProduct }