
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

const app= express()

//all request from response will automatically be passes through json
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



//APIs
app.get("/",(req,res)=>{
    res.send("hello")
})


app.get("/login",(req,res)=>{

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


//Get all products
app.get('/allproducts',async(req,res)=>{
    let products= await Product.find({})
    console.log("all products!!!!")
    console.log(products[0])

    

    res.send(products)
    

})



//Add products


app.post('/addproduct', upload.single("product"),async(req,res)=>{
    // let products= await Product.find({});
    // let id;
    // if (products.length>0){
    //     let last_product_array= products.slice(-1)
    //     let last_product=last_product_array[0]
    //     id=last_product.id+1


    // }else{
    //     id=1
    // }
    
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
        success:true,
        name: req.body.name
    })
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


//creating Endpoints
app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email:req.body.email})
    if (check){
        return res.status(400).json({success:false,error:"User already exists with the same email"})
    }
    let cart={};
    for( let i=0 ; i<300;i++){
        cart[i]=0;
    }
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

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})