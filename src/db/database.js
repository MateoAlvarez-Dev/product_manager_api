const mongoose = require('mongoose');

module.exports = function createDBConnection (){
    return mongoose.connect('mongodb+srv://ecommercexaple:exampleCommerce83@ecommerce.dsq1wls.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}