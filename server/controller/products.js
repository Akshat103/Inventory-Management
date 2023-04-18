const { json } = require("express");
const productModel = require("../models/products");
const { toTitleCase } = require("../config/functions")

class Product {

    async getAllProduct(req, res) {
        try {
            let Products = await productModel
                .find({})
            if (Products) {
                return res.json({ Products });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getSingleProduct(req, res) {
        let pId = req.params.id;
        if (!pId) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {
                let singleProduct = await productModel
                    .findById(pId)
                if (singleProduct) {
                    return res.json({ Product: singleProduct });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    async postAddProduct(req, res) {
        let { name, price, category, company } = req.body;

        // Validation
        if (
            !name |
            !price |
            !category |
            !company
        ) {
            return res.json({ error: "All filled must be required" });
        }
        // Validate Name and description
        else if (name.length > 255) {
            return res.json({
                error: "Name must not be 255 charecter long",
            });
        }
        else {
            try {
                name = toTitleCase(name);
                category = toTitleCase(category);
                company = toTitleCase(company);
                let newProduct = new productModel({
                    name,
                    price,
                    category,
                    company
                });
                let save = await newProduct.save();
                if (save) {
                    return res.json({ success: "Product created successfully" });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    async postEditProduct(req, res) {
        let { name, price, category, company } = req.body;
        let pId = req.params.id;
        // Validate other fileds
        if (
            !name |
            !price |
            !category |
            !company
        ) {
            return res.json({ error: "All filled must be required" });
        }
        // Validate Name and description
        else if (name.length > 255) {
            return res.json({
                error: "Name must not be 255 charecter long",
            });
        }
        else {
            name = toTitleCase(name);
            category = toTitleCase(category);
            company = toTitleCase(company);
            let editData = {
                name,
                price,
                category,
                company
            };

            try {
                let editProduct = productModel.findByIdAndUpdate(pId, editData);
                editProduct.exec((err) => {
                    if (err) console.log(err);
                    return res.json({ success: "Product edit successfully" });
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    async getDeleteProduct(req, res) {
        let pId = req.params.id;
        if (!pId) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {
                let deleteProduct = await productModel.findByIdAndDelete(pId);
                if (deleteProduct) {
                    return res.json({ success: "Product deleted successfully" });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    async getSearchProduct(req, res) {
        let key = req.params.key;

        if (!key) {
            return res.json({ error: "All filled must be required" });
        } else {
            try {
                key = toTitleCase(key);
                let products = await productModel
                    .find({
                        '$or': [
                            { name: { $regex: req.params.key } },
                            { category: { $regex: req.params.key } },
                            { company: { $regex: req.params.key } }
                        ]
                    })
                if (products) {
                    return res.json(products);
                }
            } catch (err) {
                return res.json({ error: "Search product wrong" });
            }
        }
    }

}

const productController = new Product();
module.exports = productController;
