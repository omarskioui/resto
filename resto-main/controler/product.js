const product = require("../models/product");
exports.getProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).send({msg:"products fetched successfully",products});
    } catch (error) {
        res.status(500).send({ msg: "failed to fetch products", error });
        
    }
}
exports.addProduct = async (req, res) => {
    try {
        if(req.user.role == "admin"){
            const newproduct = new product(req.body);
            await newproduct.save();
            res.status(200).send({ msg: "product added successfully", newproduct });
        }
        else{
            res.status(403).send({ msg: "Only admin can add products" });
        }
        
    } catch (error) {
        res.status(500).send({ msg: "failed to add product", error });
        
    }
}

exports.updateProduct = async (req, res) => {
    try {       
        if(req.user.role == "admin"){
            const updatedProduct = await product.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!updatedProduct){
                return res.status(404).send({ msg: "Product not found" });
            }
            res.status(200).send({ msg: "product updated successfully", updatedProduct });
        }
        else{
            res.status(403).send({ msg: "Only admin can update products" });
        }
        
    } catch (error) {
        res.status(500).send({ msg: "failed to update product", error });
        
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        if(req.user.role == "admin"){
            const deletedProduct = await product.findByIdAndDelete(req.params.id);
            if(!deletedProduct){
                return res.status(404).send({ msg: "Product not found" });
            }
            res.status(200).send({ msg: "product deleted successfully" });
        }
        else{
            res.status(403).send({ msg: "Only admin can delete products" });
        }
        
    } catch (error) {
        res.status(500).send({ msg: "failed to delete product", error });
        
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await product.findById(req.params.id);
        if(!product){
            return res.status(404).send({ msg: "Product not found" });
        }
        res.status(200).send({ msg: "product fetched successfully", product });
    } catch (error) {
        res.status(500).send({ msg: "failed to fetch product", error });
        
    }
}
