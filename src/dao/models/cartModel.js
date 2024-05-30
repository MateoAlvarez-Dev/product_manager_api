const mongoose = require('mongoose');
const cartSchema = require('../../schemas/cartSchema.js');
const cartModel = mongoose.model('Carts', cartSchema);

module.exports = cartModel;