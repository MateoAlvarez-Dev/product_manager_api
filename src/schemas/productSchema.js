const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnail_url: String,
    isActive: Boolean
});

module.exports = productSchema;