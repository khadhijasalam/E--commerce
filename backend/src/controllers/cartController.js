const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/cart
exports.getCart = asyncHandler(async (req, res) => {

    console.log("GetCart")
    const userId = req.user.id;
  const user = await User.findById(userId);
 return res.json(user?.cartData||{})
});

// PUT /api/cart/:itemId
exports.add = asyncHandler(async (req, res) => {
            const userId = req.user.id;
        const itemId = req.params.itemId

        let user = await User.findById(userId);
        let cart = user.cartData;

          if (!cart || typeof cart !== "object") {
            cart = {};
        }
        // If product already in cart, increase quantity
        if (cart[itemId]) {
            cart[itemId] += 1;
        } else {
            // Otherwise add it with quantity 1
            cart[itemId] = 1;
        }


  await User.findByIdAndUpdate(req.user.id, { cartData: cart });

  return res.json({ success: true, cartData: cart });
});

// DELETE /api/cart/:itemId
exports.remove = asyncHandler(async (req, res) => {
            const userId = req.user.id;
        const itemId = req.params.itemId;

        let user = await User.findById(userId);

        let cart = user.cartData;
        if (!cart || typeof cart !== "object") {
            return res.json({ success: false, error: "Cart is empty" });
        }
        // Decrease quantity
        if (cart[itemId] > 1) {
            cart[itemId] -= 1;
         }else {
            delete cart[itemId]; // REMOVE key from backend completely
        }

        // Update the database
        await User.findByIdAndUpdate(userId, { cartData: cart });

        res.json({ success: true, cartData: cart });

  
});
