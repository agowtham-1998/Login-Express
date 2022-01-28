const express = require("express");
const res = require("express/lib/response");
const products = express.Router();
const Product = require("../models/Products");
const multer = require("multer");


products.post("/products/upload", async (req,res)=>{
    try {
        upload(req,res,(err)=>{
            if(err){
                console.log(err);
            }else{
                const products = new Product({
                    productName:req.body.productName,
                    price:req.body.price,
                    description:req.body.description,
                    active:req.body.active,
                    image:{
                        data:req.file.filename,
                        contentType:'image/png'
                    }
                })
                products.save().then(()=>res.send('success fully uploaded'))
                .catch(err=>console.log(err));
            }
        })
    } catch (error) {
        res.send(err);
    }

})


// products.post("/products/upload", async (req,res)=>{
//     try {
//         upload(req,res,(err)=>{
            
//         })
//         console.log("List Products");
//         const products = new Product({
//             productName:req.body.productName,
//             price:req.body.price,
//             description:req.body.description,
//             active:req.body.active,
//             image:{
//                 data:req.file.filename,
//                 contentType:'image/png'
//             }
//         });
//         const savedProduct = await products.save();
//         res.send(savedProduct);    
//     } catch (error) {
//         res.send(error);
//     }
// });

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

products.put("/products/:id",(req,res)=>{
    Product.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            productName:req.body.productName,
            price:req.body.price,
            description:req.body.description,
            active:req.body.active
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