const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name."],
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
        required: [true, "Please enter the category of the product."],
    },
    type: {
        type: String,
        required: [true, "Please enter the type of the product."],
    },
    size: {
        type: String,
        required: [true, "Please enter the size of the product."],
    },
    image: {
        type: [String], // Assuming the image field should contain an array of image URLs.
        required: true,
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
