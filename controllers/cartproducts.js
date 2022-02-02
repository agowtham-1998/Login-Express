const express = require("express");
const cartproducts = express.Router();
const CartProducts = require("../models/CartProducts");


cartproducts.post("/cartproducts",async (req,res)=>{
    try {
        console.log("List CartProducts");
    const cartproducts = new CartProducts({
        cartId:req.body.cartId,
        productId:req.body.productId,
        cartVariants:req.body.cartVariants,
        cartModifiers:req.body.cartModifiers
    });
    const cartproductSaved = await cartproducts.save();
    res.send(cartproductSaved); 
    } catch (error) {
        res.send(error);
    }
});

cartproducts.get("/cartproducts",(req,res)=>{
    console.log("Getting cartproducts");
    CartProducts.find({}).exec(function(err,cartproducts){
        if(err){
            res.send("error has occured");
        }else{
            console.log(cartproducts);
            res.json(cartproducts);
        }
    });
});

cartproducts.get("/cartproducts/:id",(req,res)=>{
    console.log("Getting One cartproducts");
    CartProducts.findOne({
        _id: req.params.id
    }).exec(function(err, CartProducts){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(CartProducts);
            res.json(CartProducts);
        }
    });
});

cartproducts.put("/cartproducts/:id", (req,res)=>{
    CartProducts.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
        cartId:req.body.cartId,
        productId:req.body.productId,
        cartVariants:req.body.cartVariants,
        cartModifiers:req.body.cartModifiers
        }
    },{
        upsert: true
    },function(err, newCartProducts){
        if(err) {
            res.send('error updating cartproducts');
        } else {
            console.log(newCartProducts);
            res.send(newCartProducts);
        }
    });
});

cartproducts.delete("/cartproducts/:id", (req,res)=>{
    CartProducts.findByIdAndRemove({
        _id: req.params.id
    },function(err, cartproducts){
        if(err) {
            res.send('error deleting');
        } else {
            console.log(cartproducts);
            res.send(cartproducts);
        }
    });
});


module.exports = cartproducts;