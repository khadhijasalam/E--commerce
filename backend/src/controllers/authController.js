const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");





// POST /api/signup
exports.signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.json({ success: false, error: "User already exists" });
  }

  const user = new User({
    name: username,
    email,
    password,
    cartData: {}
  });

  await user.save();

   const data ={
                user:{
                    id:user.id
                }

            }
  const token = jwt.sign(
    data,
    "secret_ecom"
  );

  return res.json({ success: true, token });
});


exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      error: "No account associated with this Email."
    });
  }

  if (password !== user.password) {
    return res.json({
      success: false,
      error: "Wrong Password"
    });
  }

 const data ={
                user:{
                    id:user.id
                }

            }
            const token=jwt.sign(data,'secret_ecom');

  return res.json({ success: true, token });
});
