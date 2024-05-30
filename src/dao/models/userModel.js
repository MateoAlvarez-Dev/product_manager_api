const mongoose = require('mongoose');
const userSchema = require('../../schemas/userSchema.js');
const userModel = mongoose.model('Messages', userSchema);

module.exports = userModel;