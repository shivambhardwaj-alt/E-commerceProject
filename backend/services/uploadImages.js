import { v2 as cloudinary } from 'cloudinary';
import logger from '../utils/logger.js';

const uploadImagesToCloudinary = async (files) => {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('No files provided for upload');
  }

  try {
    const uploadPromises = files.map(file =>
      cloudinary.uploader.upload(file.path, { resource_type: 'image' })
    );

    const results = await Promise.all(uploadPromises);

    logger.info('Images uploaded to Cloudinary successfully');

    return results.map(r => r.secure_url);

  } catch (error) {
    logger.error('Images uploading failed', error);
    throw error; 
  }
};

export default uploadImagesToCloudinary;
