const express = require('express');
const router = express.Router();
//const { ProductManager } = require('./../models/products');
//const productManager = new ProductManager(pathLib.join(__dirname, "..", "db", "persistence.json"));

const checkProductExistance = require('../middlewares/checkProductExistance');
const Product = require('./../dao/models/productModel');

router.get('/', (req, res) => {
    Product.find().then((products) => {
        res.status(200).json(products);
    }).catch((e) => {
        console.error('Error while finding the products', e);
        res.status(500).send('Internal Error');
    })
});


router.get('/:id', checkProductExistance, (req, res) => {
    const { id } = req.params;

    Product.findById(id).then((product) => {
        if(product === null){
            res.status(404).send("Not found")
            return;
        }
        res.status(200).json(product);
    }).catch((e) => {
        console.error('Error while finding the products', e);
        res.status(500).send('Internal Error');
    });

});


router.post('/', (req, res) => {
    
    // MONGO
    let newProduct = new Product(req.body);

    newProduct.save().then((savedProduct) => {
        res.status(201).send('Product created');
    }).catch((e) => {
        console.error('Error while saving the product', e);
        res.status(500).send('Internal Error');
    });

});


router.put('/:pid', checkProductExistance, (req, res) => {
    /*let productId = Number(req.params.pid);

    productManager.updateProduct(productId, req.body);
    res.status(200).json({ data: "Product Updated" });*/
});


router.delete('/:pid', checkProductExistance, (req, res) => {
    /*let productId = Number(req.params.pid);
    let isDeleted = productManager.deleteProduct(productId);
    
    if(isDeleted) res.status(200).json({ data: "Product Deleted" });
    else res.status(400).json({ error: "Product not Deleted" });*/
});


module.exports = router;