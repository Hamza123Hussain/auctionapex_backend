import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  _id: { type: String }, // Use String type for _id
  productName: { type: String, required: true }, // Name of the product
  description: { type: String }, // Description of the product
  price: { type: Number, required: true }, // Starting price for the auction
  image: { type: String }, // URL or path to the product image
  //   category: { type: String }, // Category of the product
  auctionEndDate: { type: String, required: true }, // Date and time when the auction ends
  bids: [
    {
      // Array to store bids placed on the product
      userId: { type: String, ref: 'users' },
      bidAmount: { type: Number },
      bidTime: { type: Date, default: Date.now },
    },
  ],
  sellerId: {
    type: String,
    ref: 'users',
    required: true,
  }, // Seller's ID
  status: {
    // Status of the product (e.g., active, sold, canceled)
    type: String,
    enum: ['active', 'sold', 'canceled'],
    default: 'active',
  },
})

export const ProductModel = mongoose.model('Product', ProductSchema)
