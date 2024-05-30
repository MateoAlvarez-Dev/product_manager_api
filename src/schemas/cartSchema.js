const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const cartSchema = new Schema({
    _user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    products: { type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number }], required: true, ref: 'products' }
}, {
    collection: 'carts' // Especificar la colección
});

cartSchema.plugin(mongoosePaginate);

module.exports = cartSchema;