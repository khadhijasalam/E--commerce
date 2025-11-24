
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
const fetchUser= require('./middleware/fetchUser')

const app= express()

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



//APIs
app.get("/",(req,res)=>{
    res.send("hello")
})



//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Connected to mongodb'))


//Image storage engine
const storage= multer.diskStorage({

    destination:'./upload/images',
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
app.post("/upload", upload.single('product'),(req,res)=>{
res.json({
success:1,
image_url:`http://localhost:${port}/images/${req.file.filename}`
}
)
console.log(`http://localhost:${port}/images/${req.file.filename}`)

})



//creating Endpoints
app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if (check){
        return res.status(400).json({success:false,error:"User already exists with the same email"})
    }
    let cart={};
 
    const user= new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save()

    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom')
    res.json({success:true,token})

})


//Create endpoins for user login
app.post('/login',async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if (user){
        const password=req.body.password
        if(password===user.password){
            const data ={
                user:{
                    id:user.id
                }

            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,error:"Wrong Password"})
        } } 
        else{
            res.json({success:false,error:"No account associated with this Email."})
        }
    
})

// })
app.get('/allproducts', async (req, res) => {
  const products = await Product.find({});
  
 const formatted = products.map(p => formatProduct(p, port));

  res.json(formatted);
});






//Add products


app.post('/addproduct', upload.single("product"),async(req,res)=>{
   
try{
   // VALIDATION
    if (!req.body.name || !req.body.category || !req.body.new_price || !req.body.old_price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Ensure file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    
    }

      const product = new Product({

        name:req.body.name,
        image:req.file.filename,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
      })

    console.log(product)
    await product.save()
    console.log('product saved')
 res.json({
  success: true,
  product: formatProduct(product, port),
});

}catch(error){
        res.status(500).json({success:false,error:error.message})
    }



    })
     



//Delete products
app.post('/removeproduct', async (req, res) => {
    try {
        // console.log("BODY RECEIVED:", req.body);
        const mongoId = req.body.id;  // frontend sends "id"

        if (!mongoId) {
            return res.json({
                success: false,
                message: "No id provided"
            });
        }

        const deletedProduct = await Product.findByIdAndDelete(mongoId);

        if (!deletedProduct) {
            return res.json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product removed",
        });

    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});



//creating endpoint for new collection
app.get('/newcollections',async(req,res)=>{
    let products= await Product.find({});
    let newcollections = products.slice(-8)
    const formatted = newcollections.map(p => formatProduct(p, port));
    console.log("New collections fetched")
    res.send(formatted)
})

app.get('/popular-women',async(req,res)=>{
    let products= await Product.find({category:"women"});
    let popularWomen=products.slice(0,4);
        const formatted = popularWomen.map(p => formatProduct(p, port));

    console.log('Popular in women fetched')
    res.send(formatted)

})
app.get('/related-products', async (req, res) => {
  const category = req.query.category;

  let products = await Product.find({ category });
  let relatedProducts = products.slice(0, 4);
  const formatted = relatedProducts.map(p => formatProduct(p, port));

  console.log(`Related products for ${category}`);
  res.send(formatted);
});





//endpoint for adding products to cart
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const itemId = req.body.itemId;

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

app.post('/removefromcart', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const itemId = req.body.itemId;

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

//create endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart")
    const userId = req.user.id;

    let userData = await User.findOne({_id:userId})
    res.json(userData.cartData)
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})