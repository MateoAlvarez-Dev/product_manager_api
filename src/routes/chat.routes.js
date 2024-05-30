const express = require("express");
const router = express.Router();

router.get("/chat", (req, res) => {
    res.render("main", { layout: 'home', products: JSON.parse(JSON.stringify(products)) });
});

module.exports = router;
