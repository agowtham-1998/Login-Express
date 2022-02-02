const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcatgoryRoutes");
const products = require("./controllers/products");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const res = require("express/lib/response");
const multer = require("multer");
const variants = require("./controllers/variants");
const modifier = require("./controllers/modifier");
const cart = require("./controllers/cart");
const cartproducts = require("./controllers/cartproducts");
const orders = require("./controllers/orders");
const orderedproducts = require("./controllers/orderedproducts");
const payments = require("./controllers/payments");


dotenv.config();

// mongoose.connect(process.env.DB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true}).then(() => 
//         console.log("Database connected!")).catch(err => console.log(err));

    mongoose.connect('mongodb://127.0.0.1:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
     }).then(()=>
    console.log("Database connected!")).catch(err=>console.log(err));
    

app.use(express.json());

app.use(cookieParser());

app.use("/api/user", authRoutes);

app.use("/api/user", categoryRoutes);

app.use("/api/user", subcategoryRoutes);

app.use("/api/user", products);

app.use('/uploads', express.static('uploads'));

app.use("/api/user", variants);

app.use("/api/user", modifier);

app.use("/api/user", cart);

app.use("/api/user", cartproducts);

app.use("/api/user", orders);

app.use("/api/user", orderedproducts);

app.use("/api/user", payments);

app.listen(3100,()=>{
    console.log("Server Running Successfull")
})