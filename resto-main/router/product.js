const express= require('express');
const { getProducts, getProductById, addProduct, deleteProduct, updateProduct } = require('../controler/product');
const isauth = require('../middleware/isauth');
const productRouter = express.Router();
productRouter.get("/getproducts",getProducts)
productRouter.get("/getproduct/:id",getProductById)
productRouter.post("/addproduct",isauth,addProduct)
productRouter.delete("/deleteproduct",isauth,deleteProduct)
productRouter.put("/updateproduct/:id",isauth,updateProduct)

module.exports = productRouter;