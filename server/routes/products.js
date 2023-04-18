const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const { verifyToken } = require("../middleware/auth");

router.get("/all-product", verifyToken, productController.getAllProduct);
router.post("/product-search/:key", verifyToken, productController.getSearchProduct);

router.post("/add-product", verifyToken, productController.postAddProduct);
router.post("/edit-product/:id", verifyToken, productController.postEditProduct);
router.post("/delete-product/:id", verifyToken, productController.getDeleteProduct);
router.get("/single-product/:id", verifyToken, productController.getSingleProduct);

module.exports = router;