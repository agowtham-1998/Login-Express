const express = require("express");
const app = express();
const routes = require("./routes/routes");
const products = require("./routes/products");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(() => 
        console.log("Database connected!")).catch(err => console.log(err));

app.use(express.json());

app.use(cookieParser());

app.use("/api/user",routes);

app.use("/api/user", products);

app.listen(3100,()=>{
    console.log("Server Running Successfull")
})