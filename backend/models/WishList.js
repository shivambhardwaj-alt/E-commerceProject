import mongoose, { Mongoose } from "mongoose";

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

const WishListSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : "products",
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "users"   
    },
    variantId : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true ,
    },
    name : {
        type : String , 
        required : true,
    },
    slug : {
        type : String , 
        required : true,
    },
    pricing : {
        mrp : Number,
        sellingPrice : Number, 
        discountPercentage : Number, 
        gstPercentage : Number, 
        taxIncluded : {type : boolean ,default : true },
        currency : {type  : String , enum : ["INR" , "$"] , default : "INR"}, 
    },
    pricingAdjustment : {
        type : Number, 
        defualt : 0,  
    },
    size : {
        type : String  , 
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL','OS'],
        defualt : 'L',
    },
    collection : {
        type : String, 
        required : true, 
    },
    color : {
        type : String , 
        required : true,
    },
    ratings : ratingSchema,
    image : {
        type : String, 
        required : true , 

    },



});

const WishListModel = mongoose.model("WishLists"  , WishListSchema);


export default WishListModel;