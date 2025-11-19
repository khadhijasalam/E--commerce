// seed/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./data");

(async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    
    console.log("Seeding products...");
    await Product.insertMany(products);

    console.log("Seeding completed successfully!");
    process.exit(0);

  } catch (err) {
    console.error("Seed Error:", err);
    process.exit(1);
  }
})();
