
require('dotenv').config()
const express= require('express')
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken')
const multer= require("multer")
const path= require("path")
const cors= require("cors")
const port= process.env.PORT || 4000

const Product= require('./models/Product.js')
const User= require('./models/User.js')
const fetchUser= require('./middleware/fetchUser.js')






const app= express()




const connectDB = require("./config/db");
// connect DB
connectDB();




//all request from response will automatically be passes through json
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())






// //connect to mongodb
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>console.log('Connected to mongodb'))



app.use("/images", express.static(path.join(__dirname, "../upload/images")));

// ********************************
// upload
// ****************************************


// //Image storage engine
// const storage= multer.diskStorage({

//       destination: path.join(__dirname, '../upload/images'),
//     filename:(req, file, cb)=>{

//         // cb(error, result. here: file name)
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// }
// )

// // configure multer instance to storage engine
// const upload= multer({storage:storage})


// app.use('/images',express.static('upload/images'))

// //create upload endpoint for images
// app.post("/api/upload", upload.single('product'),(req,res)=>{
// res.json({
// success:1,
// image_url:`http://localhost:${port}/images/${req.file.filename}`
// }
// )
// console.log(`http://localhost:${port}/images/${req.file.filename}`)

// })



// API routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/productRoutes"));
// app.use("/api", require("./routes/cartRoutes"));







// endpoint to get cartdata
app.get('/api/cart',fetchUser,async(req,res)=>{
    console.log("GetCart")
    const userId = req.user.id;

    let userData = await User.findOne({_id:userId})
    res.json(userData?.cartData||{})
})



//endpoint for adding products to cart
app.put('/api/cart/:itemId', fetchUser, async (req, res) => {
    try {
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
        // Save updated cart
        await User.findByIdAndUpdate(userId, { cartData: cart });

        res.json({
            success: true,
            cartData: cart
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/cart/:itemId', fetchUser, async (req, res) => {
    try {
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

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// GLOBAL ERROR HANDLER (for asyncHandler)
app.use((err, req, res, next) => {
  console.error("BACKEND ERROR:", err.message);
  res.json({
    success: false,
    error: err.message
  });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})