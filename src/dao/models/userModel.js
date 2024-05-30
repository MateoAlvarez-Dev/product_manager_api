const mongoose = require('mongoose');
const userSchema = require('../../schemas/userSchema.js');
const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;