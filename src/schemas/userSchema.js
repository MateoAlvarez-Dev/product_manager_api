const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
}, {
    collection: 'users' // Especificar la colección
});

userSchema.plugin(mongoosePaginate);

module.exports = userSchema;