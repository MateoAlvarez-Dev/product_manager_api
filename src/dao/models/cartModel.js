const mongoose = require('mongoose');
const cartSchema = require('../../schemas/cartSchema.js');
const cartModel = mongoose.model('Messages', cartSchema);

module.exports = cartModel;