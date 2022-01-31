const express = require("express");
const app = express();
const routes = require("./routes/routes");
const categories = require("./routes/categories");
const subcategories = require("./routes/subcategories");
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
const orders = require("./routes/orders");
const orderedproducts = require("./routes/orderedproducts");
const payments = require("./routes/payments");


dotenv.config();

mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(() => 
        console.log("Database connected!")).catch(err => console.log(err));

app.use(express.json());

app.use(cookieParser());

app.use("/api/user", routes);

app.use("/api/user", categories);

app.use("/api/user", subcategories);

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