const express = require("express");
const router = express.Router();
const {verifyToken,isAdmin} = require('../middleware/auth')
const {
  getProduct,
  createProduct,
  updateProduct,
  getProductDetail,
  deleteProduct,
} = require("../controller/productController");
const upload = require('../middleware/multer')


router.route("/product").get(getProduct);
router.route("/product/admin/create").post(verifyToken,isAdmin,upload.array('image',5),createProduct);
router.route("/product/admin/update/:id").patch(updateProduct);
router.route("/product/:id").get(getProductDetail)
router.route("/product/admin/delete").delete(verifyToken,isAdmin,deleteProduct)

module.exports = router;
