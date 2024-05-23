const mongoose = require('mongoose');
const productSchema = require('./../schemas/productSchema.js');
const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;