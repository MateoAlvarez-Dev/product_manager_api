const express = require("express");
const pathLib = require("path");
const router = express.Router();
const { ProductManager } = require("./../models/products");
const productManager = new ProductManager(pathLib.join(__dirname, "..", "db", "persistence.json"));

router.get("/", (req, res) => {
  res.render("home", {
    products: productManager.getProducts(),
  });
});

router.get("/", (req, res) => {
  res.render("realtime", {
    products: productManager.getProducts(),
  });
});

module.exports = router;
