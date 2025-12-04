const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/users", signup);
router.post("/auth/login", login);

module.exports = router;
