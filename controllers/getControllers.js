const Product = require("../models/products.js");

const getAll = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ nmHits: products.length, products: products });
};

module.exports = {
  getAll,
};
