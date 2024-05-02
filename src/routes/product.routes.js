const express = require('express');
const pathLib = require('path');
const router = express.Router();
const { ProductManager } = require('./../models/products');
const checkProductExistance = require('../middlewares/checkProductExistance');
const productManager = new ProductManager(pathLib.join(__dirname, "..", "db", "persistence.json"));


router.get('/', (req, res) => {
    let products = productManager.getProducts();

    if(req.query.limit){
        return res.json(products.slice(0, Number(req.query.limit)));
    }

    res.json(products);

});


router.get('/:pid', checkProductExistance, (req, res) => {
    let product = productManager.getProductByCode(Number(req.params.pid));
    res.json(product);
});


router.post('/', (req, res) => {
    console.log(req.body);
    let productCreated = productManager.addProduct(req.body);
    if(productCreated){
        res.status(200).send({ data: "Product Created" });
        console.log("Product Ready: ", productCreated);
    }else{
        res.status(400).send({ error: "Not Created" });
    }
});


router.put('/:pid', checkProductExistance, (req, res) => {
    let productId = Number(req.params.pid);

    productManager.updateProduct(productId, req.body);
    res.status(200).json({ data: "Product Updated" });
});


router.delete('/:pid', checkProductExistance, (req, res) => {
    let productId = Number(req.params.pid);

    productManager.deleteProduct(productId);
    res.status(200).json({ data: "Product Deleted" })
});


module.exports = router;