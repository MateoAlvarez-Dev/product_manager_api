const express = require('express');
const pathLib = require('path');
const router = express.Router();
const { ProductManager } = require('./../models/products');
const productManager = new ProductManager(pathLib.join(__dirname, "..", "db", "persistence.json"));


router.get('/realtimeproducts', (req, res) => {

    res.render("index", {
        title: "HOLA",
        products: productManager.getProducts()
    });
});



module.exports = router;