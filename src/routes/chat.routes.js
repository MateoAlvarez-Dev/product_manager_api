const express = require("express");
const router = express.Router();

router.get("/chat", (req, res) => {
    res.render("main", { layout: 'chat' });
});

module.exports = router;
