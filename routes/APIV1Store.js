const express = require("express");
const { getAll } = require("../controllers/getControllers.js");
const router = express.Router();

router.get("/items/get", getAll);

module.exports = router;
