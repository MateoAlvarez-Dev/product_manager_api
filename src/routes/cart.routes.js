const express = require('express');
const router = express.Router();

const validateCartData = require('../middlewares/validateCartData');
const Cart = require('../dao/models/cartModel');

// Obtener todos los carritos de compras con paginación
router.get('/', (req, res) => {
    Cart.find({})
        .then((result) => {
            result.status = "success";
            res.status(200).json(result);
        })
        .catch((e) => {
            console.error('Error while paginating the carts', e);
            res.status(500).send('Internal Error');
        });
});

// Obtener un carrito de compras por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Cart.findById(id).then((cart) => {
        if (cart === null) {
            res.status(404).json({ status: "error", message: "Not Found" });
            return;
        }
        res.status(200).json(cart);
    }).catch((e) => {
        console.error('Error while finding the cart', e);
        res.status(500).send('Internal Error');
    });
});

// Crear un nuevo carrito de compras
router.post('/', (req, res) => {
    let newCart = new Cart(req.body);

    newCart.save().then((savedCart) => {
        res.status(201).send('Cart created');
    }).catch((e) => {
        console.error('Error while saving the cart', e);
        res.status(500).send('Internal Error');
    });
});

// Actualizar un carrito de compras por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;

    Cart.findByIdAndUpdate(id, req.body, { new: true }).then((updatedCart) => {
        if (updatedCart === null) {
            res.status(404).json({ status: "error", message: "Not Found" });
            return;
        }
        res.status(200).send('Cart updated');
    }).catch((e) => {
        console.error('Error while updating the cart', e);
        res.status(500).send('Internal Error');
    });
});

// Eliminar un carrito de compras por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Cart.findByIdAndDelete(id).then((cartDeleted) => {
        if (cartDeleted === null) {
            res.status(404).json({ status: "error", message: "Not Found" });
            return;
        }
        res.status(201).send('Cart deleted');
    }).catch((e) => {
        console.error('Error while deleting the cart', e);
        res.status(500).send('Internal Error');
    });
});

module.exports = router;