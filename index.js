const express = require("express");
const app = express();
const routes = require("./routes/routes");
const products = require("./routes/products");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const res = require("express/lib/response");


dotenv.config();

mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true}).then(() => 
        console.log("Database connected!")).catch(err => console.log(err));

app.use(express.json());

app.use(cookieParser());

app.use("/api/user",routes);

app.use("/api/user", products);

// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename:(req,res,cb)=>{
//       cb(null,file.originalname)
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImage');


var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

app.get("/",(req,res)=>{
    res.send("upload file")
});

app.listen(3100,()=>{
    console.log("Server Running Successfull")
})