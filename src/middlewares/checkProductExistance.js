const { ProductManager } = require('./../models/products');
const pathLib = require('path');

module.exports = function (req, res, next){
    let productManager = new ProductManager(pathLib.join(__dirname, "..", "db", "persistence.json"));
    let product = productManager.getProductByCode(Number(req.params.pid));

    if(!product){
        res.send({ error: "not found" });
    }

    next();
}