
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


const formatProduct = (p, port) => ({
  id: p._id,
  name: p.name,
  category: p.category,
  new_price: p.new_price,
  old_price: p.old_price,
  image: `http://localhost:${port}/images/${p.image}`
});




// //connect to mongodb
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>console.log('Connected to mongodb'))


//Image storage engine
const storage= multer.diskStorage({

      destination: path.join(__dirname, '../upload/images'),
    filename:(req, file, cb)=>{

        // cb(error, result. here: file name)
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}
)

// configure multer instance to storage engine
const upload= multer({storage:storage})


app.use('/images',express.static('upload/images'))

//create upload endpoint for images
app.post("/api/upload", upload.single('product'),(req,res)=>{
res.json({
success:1,
image_url:`http://localhost:${port}/images/${req.file.filename}`
}
)
console.log(`http://localhost:${port}/images/${req.file.filename}`)

})



// API routes
app.use("/api", require("./routes/authRoutes"));
// app.use("/api", require("./routes/productRoutes"));
// app.use("/api", require("./routes/cartRoutes"));



// //creating Endpoints
// app.post('/api/users',async(req,res)=>{
//     let check = await User.findOne({email:req.body.email})
//     if (check){
//         return res.status(400).json({success:false,error:"User already exists with the same email"})
//     }
//     let cart={};
 
//     const user= new User({
//         name:req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//         cartData:cart,
//     })

//     await user.save()

//     const data={
//         user:{
//             id:user.id
//         }
//     }
//     const token=jwt.sign(data,'secret_ecom')
//     res.json({success:true,token})

// })


// //Create endpoins for user login
// app.post('/api/auth/login',async(req,res)=>{
//     let user=await User.findOne({email:req.body.email})
//     if (user){
//         const password=req.body.password
//         if(password===user.password){
//             const data ={
//                 user:{
//                     id:user.id
//                 }

//             }
//             const token=jwt.sign(data,'secret_ecom');
//             res.json({success:true,token})
//         }
//         else{
//             res.json({success:false,error:"Wrong Password"})
//         } } 
//         else{
//             res.json({success:false,error:"No account associated with this Email."})
//         }
    
// })

// })




//************************************** */



// app.get('/api/products', async (req, res) => {
//   const products = await Product.find({});
  
//  const formatted = products.map(p => formatProduct(p, port));

//   res.json(formatted);
// });






// //Add products


// app.post('/api/products', upload.single("product"),async(req,res)=>{
   
// try{
//    // VALIDATION
//     if (!req.body.name || !req.body.category || !req.body.new_price || !req.body.old_price) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields"
//       });
//     }

//     // Ensure file exists
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image is required"
//       });
    
//     }

//       const product = new Product({

//         name:req.body.name,
//         image:req.file.filename,
//         category:req.body.category,
//         new_price:req.body.new_price,
//         old_price:req.body.old_price,
//       })

//     console.log(product)
//     await product.save()
//     console.log('product saved')
//  res.json({
//   success: true,
//   product: formatProduct(product, port),
// });

// }catch(error){
//         res.status(500).json({success:false,error:error.message})
//     }



//     })
     



// //Delete products
// app.delete('/api/products/:id', async (req, res) => {
//     try {
//         // console.log("BODY RECEIVED:", req.body);
//         const mongoId = req.params.id  // frontend sends "id"

//         if (!mongoose.Types.ObjectId.isValid(mongoId)) {
//   return res.status(400).json({
//     success: false,
//     message: "Invalid product ID"
//   });
// }

        

//         const deletedProduct = await Product.findByIdAndDelete(mongoId);

//         if (!deletedProduct) {
//             return res.json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         res.json({
//             success: true,
//             message: "Product removed",
//         });

//     } catch (err) {
//         res.json({ success: false, error: err.message });
//     }
// });



// //creating endpoint for new collection
// app.get('/api/products/new',async(req,res)=>{
    
//     let newcollections = await Product.find({  })
//      .sort({ _id: -1 }) 
//   .limit(8);
//     const formatted = newcollections.map(p => formatProduct(p, port));
//     console.log("New collections fetched")
//     res.send(formatted)
// })

// app.get('/api/products/popular',async(req,res)=>{
//     const category=req.query.category || "women"
//     let popular=  await Product.find({ category })
//   .limit(4);

//         const formatted = popular.map(p => formatProduct(p, port));

//     console.log('Popular in women fetched')
//     res.send(formatted)

// })
// app.get('/api/products/related', async (req, res) => {
//   const category = req.query.category;

//   let relatedProducts = await Product.find({ category })
//   .limit(4);
//   const formatted = relatedProducts.map(p => formatProduct(p, port));

//   console.log(`Related products for ${category}`);
//   res.send(formatted);
// });



// // endpoint to get cartdata
// app.get('/api/cart',fetchUser,async(req,res)=>{
//     console.log("GetCart")
//     const userId = req.user.id;

//     let userData = await User.findOne({_id:userId})
//     res.json(userData?.cartData||{})
// })



// //endpoint for adding products to cart
// app.put('/api/cart/:itemId', fetchUser, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const itemId = req.params.itemId

//         let user = await User.findById(userId);
//         let cart = user.cartData;

//           if (!cart || typeof cart !== "object") {
//             cart = {};
//         }
//         // If product already in cart, increase quantity
//         if (cart[itemId]) {
//             cart[itemId] += 1;
//         } else {
//             // Otherwise add it with quantity 1
//             cart[itemId] = 1;
//         }
//         // Save updated cart
//         await User.findByIdAndUpdate(userId, { cartData: cart });

//         res.json({
//             success: true,
//             cartData: cart
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// app.delete('/api/cart/:itemId', fetchUser, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const itemId = req.params.itemId;

//         let user = await User.findById(userId);

//         let cart = user.cartData;
//         if (!cart || typeof cart !== "object") {
//             return res.json({ success: false, error: "Cart is empty" });
//         }
//         // Decrease quantity
//         if (cart[itemId] > 1) {
//             cart[itemId] -= 1;
//          }else {
//             delete cart[itemId]; // REMOVE key from backend completely
//         }

//         // Update the database
//         await User.findByIdAndUpdate(userId, { cartData: cart });

//         res.json({ success: true, cartData: cart });

//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });


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