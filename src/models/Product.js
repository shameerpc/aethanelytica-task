import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    description: {
      type: String,
      trim: true,
        },
    
        size: {
            type: String,
            enum: ["S", "M", "L", "XL"],
            index: true,
        },

        color: {
            type: String,
            index: true,
        },
   
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },

    
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    
    image: {
      type: String,
      required: true,
    },

   
    category: {
      type: String,
      required: true,
      index: true,
    },

    
    type: {
      type: String,
      enum: ["product", "service"],
      default: "product",
      index: true,
    },

    
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);


productSchema.index({ category: 1, price: 1 });

export default mongoose.model("Product", productSchema);