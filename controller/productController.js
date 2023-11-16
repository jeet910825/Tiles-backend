const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const path = require("path");
const fs = require('fs');
const fsPromise = require('fs').promises

// get all products
const getProduct = asyncHandler(async (req, res) => {
  const { category, type, page , search } = req.query;
  const itemsPerPage = 9;
  const currentPage = page ? parseInt(page) : 1;
  

  // Define the filter based on the provided category and type
  const filter = {};
  if(search){
    filter.name = { $regex: new RegExp(search, 'i') };
  }
  if (category) {
    filter.category = category;
  }
  if (type) {
    filter.type = type;
  }
  // Calculate the skip and limit values for pagination
  const skip = (currentPage - 1) * itemsPerPage;
  const limit = itemsPerPage;

  // Query the products with the filter and pagination parameters
  const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
  

  // Count the total number of products that match the filter
  const totalProducts = await Product.countDocuments(filter);

  res.status(200).json({
    products:products,
    currentPage:currentPage,
    totalPages: Math.ceil(totalProducts / itemsPerPage),
  });
});


const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, type, size } = req.body;
  const category = req.body?.category ? req.body.category : " "

  const images = req.files.map((file) => `/images/${file.filename}`);

  const product = await Product.findOne({ name }).exec();
  if (product) {
    return res.status(401).json({ success: false, message: "Product already exists" });
  }

  const saveProduct = await Product.create({ name, brand, type, size, category, image: images });
  res.status(200).json({ success: true, product: saveProduct });
});


const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  const product = await Product.findById(id).exec();
  if (!product) {
    return res
      .status(404)
      .json({ sucess: false, message: "product does not exists" });
  }
  await product.updateOne(value);
  await product.save();
  res
    .status(200)
    .json({ sucess: true, message: "product updated sucessfully" });
});

const getProductDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  if (!product) {
    return res
      .status(404)
      .json({ sucess: false, message: "product does not exists" });
  }
  res.status(200).json({ sucess: true, product: product });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.body.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Add logic to check permissions and ownership, e.g., the user can delete their own products.

    // Delete associated images
    for (const imagePath of product.image) {
      // Remove the image file from the "public/images" folder
      await fsPromise.unlink(path.join(__dirname,'../public',imagePath));
    }

    // Remove the product document
    await product.deleteOne();

    res.status(200).json({ success: true, message: "Product and associated images deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "An error occurred while deleting the product and images" });
  }
});

module.exports = deleteProduct;
module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  getProductDetail,
  deleteProduct,
};
