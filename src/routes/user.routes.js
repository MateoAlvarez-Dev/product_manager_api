const express = require('express');
const router = express.Router();

const validateUserData = require('../middlewares/validateUserData');
const User = require('../dao/models/userModel');

// Obtener todos los usuarios con paginación
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    User.paginate({}, { page, limit })
        .then((result) => {
            result.status = "success";
            res.status(200).json(result);
        })
        .catch((e) => {
            console.error('Error while paginating the users', e);
            res.status(500).send('Internal Error');
        });
});

// Obtener un usuario por ID
router.get('/:id', validateUserData, (req, res) => {
    const { id } = req.params;

    User.findById(id).then((user) => {
        if (user === null) {
            res.status(404).json({ status: "error", message: "Not Found" });
            return;
        }
        res.status(200).json(user);
    }).catch((e) => {
        console.error('Error while finding the user', e);
        res.status(500).send('Internal Error');
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    let newUser = new User(req.body);

    newUser.save().then((savedUser) => {
        res.status(201).send('User created');
    }).catch((e) => {
        console.error('Error while saving the user', e);
        res.status(500).send('Internal Error');
    });
});

// Actualizar un usuario por ID
router.put('/:id', validateUserData, (req, res) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, req.body, { new: true }).then((updatedUser) => {
        if (updatedUser === null) {
            res.status(404).json({ status: "error", message: "Not Found" });
            return;
        }
        res.status(200).send('User updated');
    }).catch((e) => {
        console.error('Error while updating the user', e);
        res.status(500).send('Internal Error');
    });
});

// Eliminar un usuario por ID
router.delete('/:id', validateUserData, (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id).then((userDeleted) => {
        if (userDeleted === null) {
            res.status(404).json({ status: "error", message: "Not Found" });
            return;
        }
        res.status(201).send('User deleted');
    }).catch((e) => {
        console.error('Error while deleting the user', e);
        res.status(500).send('Internal Error');
    });
});

module.exports = router;