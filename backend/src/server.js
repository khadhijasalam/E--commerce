require('dotenv').config()
const express= require('express')
const path= require("path")
const cors= require("cors")
//DB
const connectDB = require("./config/db");


const app= express()
const port= process.env.PORT || 4000


//Middlewares

//all request from response will automatically be passes through json
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// connect DB
connectDB();

//Static image folder
//opens image in new tab as http://localhost:4000/images/product_2.png
app.use("/images", express.static(path.join(__dirname, "../upload/images")));





// API routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/cartRoutes"));



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