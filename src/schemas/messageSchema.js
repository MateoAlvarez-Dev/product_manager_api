const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const messageSchema = new Schema({
    user: String,
    message: String
}, {
    collection: 'messages' // Especificar la colección
});

messageSchema.plugin(mongoosePaginate);

module.exports = messageSchema;