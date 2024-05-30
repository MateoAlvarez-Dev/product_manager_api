const mongoose = require('mongoose');
const messageSchema = require('../../schemas/messageSchema.js');
const messageModel = mongoose.model('Messages', messageSchema);

module.exports = messageModel;