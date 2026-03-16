const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  dietary: [String],
  unit: {
    type: String,
    default: "piece"
  },
  price: Number,
  salePrice: Number,
  isBestSeller: {
    type: Boolean,
    default: false
  },
  totalStock: Number,
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)