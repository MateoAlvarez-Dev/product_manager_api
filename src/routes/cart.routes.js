const express = require('express');
const router = express.Router();

const Cart = require('../dao/models/cartModel');
const Product = require('../dao/models/productModel');


router.post('/:cartId/products', async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        if (!product.isActive || product.stock < quantity) {
            return res.status(400).json({ status: "error", message: "Product is not available in the requested quantity" });
        }

        const existingProductIndex = cart.products.findIndex(p => p._id.toString() === productId);
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].qty += quantity;
        } else {
            cart.products.push({ _id: productId, qty: quantity });
        }

        product.stock -= quantity;
        await product.save();
        await cart.save();
        res.status(200).json(cart);

    } catch (e) {

        console.error('Error while adding product to cart', e);
        res.status(500).send('Internal Error');

    }
});

router.put('/:cartId/products/:productId', async (req, res) => {

    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        const productIndex = cart.products.findIndex(p => p._id.toString() === productId);
        if (productIndex >= 0) {
            const currentQty = cart.products[productIndex].qty;
            const qtyDifference = quantity - currentQty;

            if (product.stock < qtyDifference) {
                return res.status(400).json({ status: "error", message: "Insufficient stock for the requested quantity" });
            }

            cart.products[productIndex].qty = quantity;
            product.stock -= qtyDifference;
            await product.save();
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ status: "error", message: "Product not found in cart" });
        }
    } catch (e) {
        console.error('Error while updating product quantity in cart', e);
        res.status(500).send('Internal Error');
    }
    
});

router.delete('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p._id.toString() === productId);
        if (productIndex >= 0) {
            const product = await Product.findById(productId);
            const qtyToRemove = cart.products[productIndex].qty;

            cart.products = cart.products.filter(p => p._id.toString() !== productId);
            product.stock += qtyToRemove;

            await product.save();
            await cart.save();

            res.status(200).json(cart);
        } else {
            res.status(404).json({ status: "error", message: "Product not found in cart" });
        }
    } catch (e) {
        console.error('Error while removing product from cart', e);
        res.status(500).send('Internal Error');
    }
});

module.exports = router;