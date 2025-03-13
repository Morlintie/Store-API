const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be provided"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "price must be provided"],
  },
  company: {
    type: String,
    enum: {
      values: ["marcos", "liddy", "ikea", "caressa"],
      message: "the company name not found",
    },
    trim: true,
  },

  featured: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 4.5,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Products", productsSchema);

module.exports = Product;
