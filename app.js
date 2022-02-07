const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcatgoryRoutes");
const productRoutes = require("./routes/productRoutes");
const variantRoutes = require("./routes/variantRoutes");
const modifier = require("./controllers/modifier");
const cart = require("./controllers/cart");
const cartproducts = require("./controllers/cartproducts");
const orders = require("./controllers/orders");
const orderedproducts = require("./controllers/orderedproducts");
const payments = require("./controllers/payments");

//razorpay payment api test
var Razorpay = require("razorpay");


var instance = new Razorpay({
    key_id: 'rzp_test_urJcWW5CCTcr8V',
    key_secret: 'qmA2cYxlBN5XT4cjiYlbZpOo'
});


app.get("/createOrderBasic", (req, res) => {
    var options = {
           amount: 500,  // amount in the smallest currency unit
           currency: "USD",
       };
       instance.orders.create(options, function (err, order) {
           res.send(order);
       });
   });
   
   app.get("/createOrderPremium", (req, res) => {
    var options = {
           amount: 2000,  // amount in the smallest currency unit
           currency: "USD",
       };
       instance.orders.create(options, function (err, order) {
           res.send(order);
       });
   });
   
   app.get("/createOrderUltimate", (req, res) => {
    var options = {
           amount: 5000,  // amount in the smallest currency unit
           currency: "USD",
       };
       instance.orders.create(options, function (err, order) {
           res.send(order);
       });
   });
   


app.use(express.json());

app.use(cookieParser());

app.use("/api/user", authRoutes);

app.use("/api/user", categoryRoutes);

app.use("/api/user", subcategoryRoutes);

app.use("/api/user", productRoutes);

app.use('/uploads', express.static('uploads'));

app.use("/api/user", variantRoutes);

app.use("/api/user", modifier);

app.use("/api/user", cart);

app.use("/api/user", cartproducts);

app.use("/api/user", orders);

app.use("/api/user", orderedproducts);

app.use("/api/user", payments);


module.exports = app;