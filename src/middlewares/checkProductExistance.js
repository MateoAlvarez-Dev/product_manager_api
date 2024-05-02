const { ProductManager } = require('./../models/products');

module.exports = function (req, res, next){
    let productManager = new ProductManager();
    let product = productManager.getProductByCode(Number(req.params.pid));

    if(!product){
        res.send({ error: "not found" });
    }

    next();
}