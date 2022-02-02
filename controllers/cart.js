const express = require("express");
const cart = express.Router();
const Cart = require("../models/Cart");

cart.post("/cart",async (req,res)=>{
    try {
        console.log("List Cart");
    const cart = new Cart({
        cartNo:req.body.cartNo
    });
    const cartSaved = await cart.save();
    res.send(cartSaved); 
    } catch (error) {
        res.send(error);
    }
});

cart.get("/cart",(req,res)=>{
    console.log("Getting cart");
    Cart.find({}).exec(function(err,cart){
        if(err){
            res.send("error has occured");
        }else{
            console.log(cart);
            res.json(cart);
        }
    });
});

cart.get("/cart/:id",(req,res)=>{
    console.log("Getting One cart");
    Cart.findOne({
        _id: req.params.id
    }).exec(function(err, Cart){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Cart);
            res.json(Cart);
        }
    });
});

cart.put("/cart/:id", (req,res)=>{
    Cart.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
          cartNo:req.body.cartNo
        }
    },{
        upsert: true
    },function(err, newCart){
        if(err) {
            res.send('error updating cart');
        } else {
            console.log(newCart);
            res.send(newCart);
        }
    });
});


cart.delete("/cart/:id", (req,res)=>{
    Cart.findByIdAndRemove({
        _id: req.params.id
    },function(err, cart){
        if(err) {
            res.send('error deleting');
        } else {
            console.log(cart);
            res.send(cart);
        }
    });
});



module.exports = cart;