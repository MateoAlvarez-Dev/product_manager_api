const express = require('express');
const router = express.Router();

const validateProductData = require('../middlewares/validateProductData');
const Product = require('./../dao/models/productModel');


// Filter use example /products?page=1&limit=10&sortBy=name&sortOrder=asc

router.get('/', (req, res) => {
    const { page = 1, limit = 10, sortOrder } = req.query;
    const sortOptions = (sortOrder) ? { 'price': (sortOrder == "desc") ? -1 : 1 } : {};

    Product.paginate({}, { page, limit, sort: sortOptions })
        .then((result) => {
            result.status = "success";
            res.status(200).json(result);
        })
        .catch((e) => {
            console.error('Error while paginating the products', e);
            res.status(500).send('Internal Error');
        });
});


router.get('/:id', validateProductData, (req, res) => {
    const { id } = req.params;

    Product.findById(id).then((product) => {
        if(product === null){
            res.status(404).json({ status: "error", message: "Not Found" });
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
            res.status(404).json({ status: "error", message: "Not Found" });
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
            res.status(404).json({ status: "error", message: "Not Found" });
            return;
        }
        res.status(201).send('Product deleted');
    }).catch((e) => {
        console.error('Error while deleting the product', e);
        res.status(500).send('Internal Error');
    });
});


module.exports = router;