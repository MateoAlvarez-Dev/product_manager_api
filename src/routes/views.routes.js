const express = require("express");
const router = express.Router();

const Product = require('./../dao/models/productModel');

router.get("/", (req, res) => {
  Product.find().then((products) => {
    res.render("main", { layout: 'home', products: JSON.parse(JSON.stringify(products)) });
  }).catch((e) => {

    console.error('Error while finding the products', e);
    res.send('Cannot load the product data...');

  })
});

router.get("/realTime", (req, res) => {
  /*res.render("realtime", {
    products: productManager.getProducts(),
  });*/
});

module.exports = router;
