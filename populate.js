const mongoose = require("mongoose");
const productsJson = require("./products.json");
const express = require("express");
const Product = require("./models/products.js");
const app = express();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to the DataBase");
    app.listen(process.env.PORT, () => {
      console.log(`server listens on port ${process.env.PORT}`);
    });
    await Product.deleteMany();
    await Product.create(productsJson);
    console.log("The DataBase has been prePopulated");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
