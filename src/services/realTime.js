const { ProductManager, Product } = require("./../models/products");
const pathLib = require("path");
const productManager = new ProductManager(pathLib.join(__dirname, "..", "db", "persistence.json"));

module.exports = function (socket, socketServer) {
  socket.on("new_product", (product) => {
    const productObject = new Product(product);
    const isCreated = productManager.addProduct(productObject);
    if (isCreated) socketServer.emit("get_products", productManager.getProducts());
  });

  socket.on("delete_product", (productId) => {
    const isDeleted = productManager.deleteProduct(productId);
    if (isDeleted) socketServer.emit("get_products", productManager.getProducts());
  });

  socket.on("update_product", (productId, product) => {
    const productObject = new Product(product);
    const isUpdated = productManager.updateProduct(productId, productObject);
    if (isUpdated) socketServer.emit("get_products", productManager.getProducts());
  });
};
