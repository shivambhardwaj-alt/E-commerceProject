import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  addressId: { type: String, default: 'Not Available' },
  name: { type: String,  trim: true },
  line1: { type: String,  },
  city: { type: String,  },
  state: { type: String,  },
  pincode: { type: String,  },  
  isDefault: { type: Boolean, default: false } 
}, { _id: false, timestamps: true });

const preferencesSchema = new mongoose.Schema({
  sizePreference: { 
    type: String, 
    enum: ['XS','S','M','L','XL','XXL'], 
    default: 'L' 
  },
  colorPreference: [{     
    type: String,
    enum: ['red', 'blue', 'black', 'white', 'grey']
  }],
  notification: {
    email: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: false },
    sms: { type: Boolean, default: false }
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  role: { 
    type: String, 
    enum: ['customer', 'admin', ], 
    default: 'customer',
    index: true 
  },
  personalInfo: {
    name: { type: String, required: [true, 'Name required'], trim: true, maxlength: 50 },
    email: { 
      type: String, 
      required: [true, 'Email required'], 
      unique: true, 
      lowercase: true 
    },
    phone: { type: String, match: [/^\+?[1-9]\d{9,14}$/] }, 

    isVerified: { type: Boolean, default: false },
    
  },
  addresses: [addressSchema],
  preferences: preferencesSchema,
  wallet: {
    balance: { type: Number, default: 0, min: 0 },
    loyaltyPoints: { type: Number, default: 0, min: 0 }
  },
  authProvider : {
    type : String, 
    enum : ['google', 'local'],
    default : 'local'
  },
  password: { type: String, select : false } ,
  isDeleted : {type:Boolean, default : false},
  otp : {type : String},
  otp_expiry : {type : Date},
  verificationToken : {type:String},
 


}, {
  timestamps: true,
  toJSON: { virtuals: true, versionKey: false },
  toObject: { virtuals: true }
});


userSchema.index({ 'personalInfo.email': 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'personalInfo.phone': 1 }, { sparse: true });

const UserModel = mongoose.model("User" ,userSchema);




export default UserModel;
