const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcatgoryRoutes");
const productRoutes = require("./routes/productRoutes");
const variants = require("./controllers/variants");
const modifier = require("./controllers/modifier");
const cart = require("./controllers/cart");
const cartproducts = require("./controllers/cartproducts");
const orders = require("./controllers/orders");
const orderedproducts = require("./controllers/orderedproducts");
const payments = require("./controllers/payments");


app.use(express.json());

app.use(cookieParser());

app.use("/api/user", authRoutes);

app.use("/api/user", categoryRoutes);

app.use("/api/user", subcategoryRoutes);

app.use("/api/user", productRoutes);

app.use('/uploads', express.static('uploads'));

app.use("/api/user", variants);

app.use("/api/user", modifier);

app.use("/api/user", cart);

app.use("/api/user", cartproducts);

app.use("/api/user", orders);

app.use("/api/user", orderedproducts);

app.use("/api/user", payments);


module.exports = app;