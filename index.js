const express = require("express");
const app = express();
const routes = require("./routes/routes");
const products = require("./routes/products");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const res = require("express/lib/response");
const multer = require("multer");
const variants = require("./routes/variants");
const modifier = require("./routes/modifier");
const cart = require("./routes/cart");
const cartproducts = require("./routes/cartproducts");


dotenv.config();

mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(() => 
        console.log("Database connected!")).catch(err => console.log(err));

app.use(express.json());

app.use(cookieParser());

app.use("/api/user",routes);

app.use("/api/user", products);

app.use('/uploads', express.static('uploads'));

app.use("/api/user", variants);

app.use("/api/user", modifier);

app.use("/api/user", cart);

app.use("/api/user", cartproducts);

app.listen(3100,()=>{
    console.log("Server Running Successfull")
})