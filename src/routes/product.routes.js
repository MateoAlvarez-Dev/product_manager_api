const express = require('express');
const router = express.Router();
const { ProductManager, Product } = require('./../models/products');
const productManager = new ProductManager();


router.get('/', (req, res) => {
    let products = productManager.getProducts();

    if(req.query.limit){
        return res.json(products.slice(0, Number(req.query.limit)));
    }

    res.json(products);

});

router.get('/:pid', (req, res) => {
    let product = productManager.getProductByCode(Number(req.params.pid));
    res.json(product);
});


module.exports = router;