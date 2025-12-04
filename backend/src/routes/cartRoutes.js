const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { getCart, add, remove } = require("../controllers/cartController");

const router = express.Router();

//Get all cart Items
router.get("/cart", fetchUser, getCart);
//Add new item to cart
router.put("/cart/:itemId", fetchUser, add);

//delete item from cart
router.delete("/cart/:itemId", fetchUser, remove);

module.exports = router;
