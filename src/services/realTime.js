const Product = require('./../dao/models/productModel');

function sendAllProducts(socketServer){
  Product.find().then((products) => {
    socketServer.emit("get_products", JSON.parse(JSON.stringify(products)));
  }).catch((e) => {
    console.log("Failed to show the products in real time...", e);
  })
}

module.exports = function (socket, socketServer) {

  socket.on("message", (messageObj) => {
    socket.broadcast.emit("message", messageObj);
  });


  // PRODUCT REAL TIME

  socket.on("new_product", (product) => {
    
    let newProduct = new Product(product);

    newProduct.save().then((savedProduct) => {
        sendAllProducts(socketServer);
    }).catch((e) => {
        console.log("Failed to save the product in real time...", e);
    });

  });

  socket.on("delete_product", (productId) => {
    Product.findByIdAndDelete(productId).then((productDeleted) => {
        if(productDeleted === null){
            console.log("Product not found ");
            return;
        }
        sendAllProducts(socketServer);
    }).catch((e) => {
        console.log("Failed to delete the product in real time...", e);
    });
  });

  socket.on("update_product", (productId, product) => {
    Product.findByIdAndUpdate(productId, product, { new: true }).then((updatedProduct) => {
        if(updatedProduct === null){
            console.log("Product not found");
            return;
        }
        sendAllProducts(socketServer);
    }).catch((e) => {
        console.log("Failed to update the product in real time...", e);
    });
  });

};