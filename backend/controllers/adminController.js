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
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
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

        const payload = req.body.data;
        const files = req.files;
        

        if (!payload) {
            return res.status(400).json({ success: false, message: 'Product data is required' });
        }

        if (!files || !files.length) {
            return res.status(400).json({ success: false, message: 'Product images are required' });
        }

        let imageUrls;

        try {
            imageUrls = await uploadImagesToCloudinary(files);
        } catch (err) {
            logger.error('Cloudinary upload failed', err);
            return res.status(502).json({
                success: false,
                message: 'Image upload failed. Please try again.'
            });
        }


        const slug = payload.slug ? payload.slug.toLowerCase() : generateSlug(payload.name);

        const existing = await productModel.exists({ slug });
        if (existing) {
            return res.status(409).json({ success: false, message: 'Product slug already exists' });
        }


        if (!Array.isArray(payload.variants)) {
            return res.status(400).json({ success: false, message: 'Variants must be an array' });
        }

        const skuSet = new Set();
        for (const v of payload.variants) {
            if (skuSet.has(v.sku)) {
                return res.status(400).json({ success: false, message: `Duplicate SKU: ${v.sku}` });
            }
            skuSet.add(v.sku);
        }


        const pricing = payload.pricing || {};
        if (pricing.mrp && pricing.sellingPrice && !pricing.discountPercentage) {
            pricing.discountPercentage = Math.round(((pricing.mrp - pricing.sellingPrice) / pricing.mrp) * 100);
        }

        const productData = {
            ...payload,
            slug,
            pricing,
            image: imageUrls
        };

        const result = await productModel.create(productData);

        logger.info('Product added successfully', { id: result._id });

        return res.status(201).json({
            success: true,
            message: 'Product Added Successfully',
            result
        });
       

    } catch (error) {
        logger.error('Error happened in adding product', error);

        return res.status(500).json({
            success: false,
            message: error.message || 'Product Addition Failed'
        });
    }
};









export { loginAdmin, addProduct }