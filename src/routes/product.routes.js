const express = require('express');
const router = express.Router();

const validateProductData = require('../middlewares/validateProductData');
const Product = require('./../dao/models/productModel');

router.get('/', (req, res) => {
    Product.find().then((products) => {
        res.status(200).json(products);
    }).catch((e) => {
        console.error('Error while finding the products', e);
        res.status(500).send('Internal Error');
    })
});


router.get('/:id', validateProductData, (req, res) => {
    const { id } = req.params;

    Product.findById(id).then((product) => {
        if(product === null){
            res.status(404).send("Not found")
            return;
        }
        res.status(200).json(product);
    }).catch((e) => {
        console.error('Error while finding the product', e);
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


router.put('/:id', validateProductData, (req, res) => {
    const { id } = req.params;

    Product.findByIdAndUpdate(id, req.body, { new: true }).then((updatedProduct) => {
        if(updatedProduct === null){
            res.status(404).send("Not found");
            return;
        }
        res.status(200).send('Product updated');
    }).catch((e) => {
        console.error('Error while updating the product', e);
        res.status(500).send('Internal Error');
    });

});


router.delete('/:id', validateProductData, (req, res) => {
    const { id } = req.params;
    
    Product.findByIdAndDelete(id).then((productDeleted) => {
        if(productDeleted === null){
            res.status(404).send("Not found");
            return;
        }
        res.status(201).send('Product deleted');
    }).catch((e) => {
        console.error('Error while deleting the product', e);
        res.status(500).send('Internal Error');
    });
});


module.exports = router;