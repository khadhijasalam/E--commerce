const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const formatProduct = require("../utils/formatProduct");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

//Get all products
// GET /api/products
exports.getAll = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  const formatted = products.map(p => formatProduct(p, PORT));
  // console.log(formatted[0])
  return res.json(formatted);
});

// Add products in admin
// POST /api/products
exports.create = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.category || !req.body.new_price || !req.body.old_price) {
    return res.json({ success: false, error: "Missing required fields" });
  }

  if (!req.file) {
    return res.json({ success: false, error: "Image is required" });
  }

  const product = new Product({
    name: req.body.name,
    image: req.file.filename,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price
  });

  await product.save();
      console.log('product saved')


  return res.json({
    success: true,
    product: formatProduct(product, PORT)
  });
});

//Delete Product in Admin
// DELETE /api/products/:id
exports.remove = asyncHandler(async (req, res) => {

        const mongoId = req.params.id  // frontend sends "id"
 if (!mongoose.isValidObjectId(mongoId)) {
  return res.status(400).json({ success: false, error: "Invalid product ID" });
}

  const deleted = await Product.findByIdAndDelete(mongoId);
 

  if (!deleted) {
    return res.json({ success: false, error: "Product not found" });
  }

  return res.json({ success: true, message: "Product removed" });
});


//Fetch New Collections
// GET /api/products/new
exports.getNew = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ _id: -1 }).limit(8);
  const formatted = products.map(p => formatProduct(p, PORT));
console.log("New collections fetched")
   return res.json(formatted);
});

//Fetch Popular Section in shop page
// GET /api/products/popular
exports.getPopular = asyncHandler(async (req, res) => {
  const category = req.query.category || "women";
  const products = await Product.find({ category }).limit(4);
  const formatted = products.map(p => formatProduct(p, PORT));
console.log(`Popular in ${category} fetched`)
  return res.json(formatted);
});

//Fetch Related Products
// GET /api/products/related
exports.getRelated = asyncHandler(async (req, res) => {
  const category = req.query.category;
  const products = await Product.find({ category }).limit(4);
  const formatted = products.map(p => formatProduct(p, PORT));
console.log(`Related Products fetched`)


  return res.json(formatted);
});
