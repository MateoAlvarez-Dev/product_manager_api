const Product = require('./../dao/models/productModel');
const Message = require('./../dao/models/messageModel');

const moment = require('moment');


function sendAllProducts(socketServer){
  Product.find().then((products) => {
    socketServer.emit("get_products", JSON.parse(JSON.stringify(products)));
  }).catch((e) => {
    console.log("Failed to show the products in real time...", e);
  })
}

module.exports = function (socket, socketServer) {

  socket.on("message", (messageObj) => {
    let actualTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    messageObj.time = actualTime;
    let newMessage = new Message(messageObj);

    newMessage.save().then((savedMessage) => {
      socket.broadcast.emit("message", messageObj);
    }).catch((e) => {
      console.log("An error has been ocurred while saving the message", e);
      socket.emit("message", { user: 'Server', message: 'Error while sending the message...', time: actualTime });
    })
    
  });

  socket.on("get_messages", () => {
    Message.find({}).then((messages) => {
      socket.emit("get_messages", JSON.parse(JSON.stringify(messages)));
    }).catch((e) => {
      console.log("An error has ocurred while obtaining the messages...", e);
      socket.emit("get_messages", [{ user: 'Server', message: 'Error while getting the messages...', time: actualTime }])
    });
  })


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