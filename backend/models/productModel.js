  import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
  const pricingSchema = new mongoose.Schema({
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number },
    discountPercentage: { type: Number, default: 0, min: 0 },
    currency: { type: String, enum: ['INR', '$'], default: '$' }, 
    taxIncluded: { type: Boolean, default: true },
    gstPercentage: { type: Number, default: 0, min: 0 },
  }, { _id: false });

  const variantSchema = new mongoose.Schema({
   
    color: { type: String, required: true },
    size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL','OS'], required: true ,default : "M" },
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, min: 0, default: 0 },
    image: [String], 
    priceAdjustment: { type: Number, default: 0 },
  }, { _id: true }); 

  const ratingSchema = new mongoose.Schema({
    average: { type: Number, default: 0, min: 0 },
    totalReviews: { type: Number, default: 0, min: 0 },
    breakdown: {
      5: { type: Number, default: 0, min: 0 }, 
      4: { type: Number, default: 0, min: 0 },
      3: { type: Number, default: 0, min: 0 },
      2: { type: Number, default: 0, min: 0 },
      1: { type: Number, default: 0, min: 0 },
    }
  }, { _id: false });

  const productSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5 },
    slug: { type: String,  unique: true, minlength: 5 }, 
    brand: { type: String, required: true, default: "Winter-X" },
    description: {
      short: { type: String, required: true, minlength: 10 },
      long: { type: String }
    },
    pricing: pricingSchema,
    category: { type: String, enum: ['Men', 'Women', 'Kids','Unisex'], required: true },
    subCategory: { type: String, required: true, maxlength: 20 },
    productType: { type: String, required: true },
    collection: { type: String, required: true },
    variants: [variantSchema],
    attributes: {
      material: { type: String, default: '100% Cotton' },
      fit: { type: String, default: 'Regular fit' }, 
      neckline: { type: String,  },
      sleeve: { type: String },
      fabricWeight: { type: String, default: "250" }, 
      stretchable: { type: Boolean, default: false },
    },
    winterSpecs: {
      temperature_rating: { type: String, default: "8°C - 25°C" },
      layeringFriendly: { type: Boolean, default: false },
      insulationLevel: { type: String, enum: ['High', 'Medium', 'Low','Extra Heavy','Heavy','Light'], default: 'Medium' },
    },
    sizeGuide: {
      modelHeight: { type: String, default: '5ft 11 inch' },
      modelSize: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL','OS'], default: 'L' },
      fitAdvice: { type: String, default: "True to size" } 
    },
    shipping: {
      weightInGrams: { type: String, default: '250GMS' },
      dimensions: { type: String, default: "30x25x2 cm" },
      freeShipping: { type: Boolean, default: false },
      estimatedDeliveryDays: { type: Number, min: 1, default: 3 },
    },
    returnPolicy: {
      returnable: { type: Boolean, required: true, default: false },
      returnDays: { type: Number, default: 7, min: 0 },
      exchangeAllowed: { type: Boolean, default: false },
    },
    ratings: ratingSchema,
    tags: [String], 
    bestseller: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: true },
    seo: {
      title: { type: String, default: "WinterX" },
      description: { type: String, default: "Buy premium cotton winter clothes" },
      keywords: [String], 
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  }, {
    timestamps: true, 
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true }
  });

  productSchema.plugin(mongoosePaginate);


  productSchema.index({ slug: 1 });
  productSchema.index({ category: 1, subCategory: 1 });
  productSchema.index({ 'variants.sku': 1 });

  const productModel =  mongoose.model('Product', productSchema);

  export default productModel;
