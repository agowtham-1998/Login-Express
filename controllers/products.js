const express = require("express");
const res = require("express/lib/response");
const products = express.Router();
const Product = require("../models/Products");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null,'./uploads/');
    },
    filename: function(req, file, cb){
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({
    storage : storage, 
    limits:
    {
        fileSize : 1024 * 1024 * 5
    },
        fileFilter: fileFilter
    });

products.post("/products",upload.single('productImage'), async (req,res)=>{
    try {
        console.log(req.file);
        console.log("List Products");
        const products = new Product({
            productName:req.body.productName,
            price:req.body.price,
            description:req.body.description,
            active:req.body.active,
            productImage:req.file.path
        });
        const savedProduct = await products.save();
        res.send(savedProduct);    
    } catch (error) {
        res.send(error);
    }
});

products.get("/products",(req,res)=>{
    console.log("Getting All products");
    Product.find({}).exec(function(err, products){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(products);
            res.json(products);
        }
    });
})


products.get("/products/:id",(req,res)=>{
    console.log("Getting One product");
    Product.findOne({
        _id: req.params.id
    }).exec(function(err, Product){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Product);
            res.json(Product);
        }
    });
});

products.put("/products/:id", upload.single('productImage'), (req,res)=>{
    Product.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            productName:req.body.productName,
            price:req.body.price,
            description:req.body.description,
            active:req.body.active,
            productImage:req.file.path
        }
    },{
        upsert: true
    },function(err, newProduct){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(newProduct);
            res.send(newProduct);
        }
    });
});

products.delete("/products/:id", (req,res)=>{
    Product.findByIdAndRemove({
        _id: req.params.id
    },function(err, products){
        if(err) {
            res.send('error deleting book');
        } else {
            console.log(products);
            res.send(products);
        }
    });
});


module.exports = products;