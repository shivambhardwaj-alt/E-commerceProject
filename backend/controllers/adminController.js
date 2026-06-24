import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';
import productModel from '../models/productModel.js';
import { generateSlug } from '../services/generateSlug.js';
import { v2 as cloudinary } from 'cloudinary';
import uploadImagesToCloudinary from '../services/uploadImages.js';
import { processFiles } from '../utils/processFiles.js';




const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            logger.error("Error happened in Admin login");
            return res.status(400).json({ success: false, message: "Bad Credentials" });

        }
        if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
            const token = jwt.sign({ email: email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h", issuer: "winterx", audience: "admin", algorithm: "HS256" });
            return res.status(200).json({ success: true, adminToken: token });
        } else {
            logger.error("Mismatch between the credentials provided by admin and system");
            return res.status(400).json({ success: false, message: "Bad Credentials" });
        }

    } catch (error) {
        logger.warn("Information Provided by admin is Incorrect");
        return res.status(400).json({ success: false, message: "Bad Credentials" });
    }
}











// ================================ API TO ADD NEW WINTER PRODUCT IN THE DATABASE =======================



const addProduct = async (req, res) => {
    try {
        logger.info('Product Addition request generated here');
        const dataForDatabase = req.body;
      
        const imageFiles = req.files;
        logger.info("Uploading images on cloudinary to getting the url");
        const arrayOfFiles = processFiles(imageFiles)


        const variantImageUrls = [];
        for (let i = 0; i < arrayOfFiles.length; i++) {
            if (arrayOfFiles[i].length > 0) {
                logger.info(` Uploading images to cloudinary for ${i}th variants`);
                const imageUrls = await uploadImagesToCloudinary(arrayOfFiles[i]);
                variantImageUrls.push(imageUrls);
            } else {
                break;
            }
        }






        logger.info("Got the Urls from the Cloudinary!!!!");

        // //============== now adding the product into the database here//===============
        


        logger.info("Product variants added into againthe database form -> urls");
        const variants = dataForDatabase.variants.map((variant, index) => ({
            ...variant,
            image: variantImageUrls[index] || []
        }));


        logger.info("Adding the Product into the Database");
        
   


        console.log(variants);
        const product = {
            name: dataForDatabase.name,
            slug: generateSlug(dataForDatabase.name),
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


            collection: dataForDatabase.collection,

            variants: variants,

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

        try {
            const savedProduct = await ProductToBeAdded.save();
            logger.info(`Product saved successfully: ${savedProduct._id}`);
            return res.status(201).json({
                success: true,
                message: "Product added successfully",
                product: savedProduct,
            });
        } catch (err) {
            if (err.name === 'ValidationError') {
                logger.error("Validation failed!", err.message);
                return res.status(400).json({ success: false, message: err.message });
            }
            throw err;
        }

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.log("FULL ERROR:", error);
        logger.error("Error happened in adding product file => AdminController Function => addProduct", error);
        return res.status(500).json({
            success: false,
            message: "Bad Request",
            error: error.message || JSON.stringify(error)
        });
    }
};









export { loginAdmin, addProduct }