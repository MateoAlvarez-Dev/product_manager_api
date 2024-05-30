const express = require("express");
const router = express.Router();

router.get("/chat", (req, res) => {
    res.send("OK");
});

module.exports = router;
