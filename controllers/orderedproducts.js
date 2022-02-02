const express = require("express");
const orderedproducts = express.Router();
const OrderedProducts = require("../models/OrderedProducts");

orderedproducts.post("/orderedproducts",async (req,res)=>{
    try {
        console.log("List orderedproducts");
    const orderedproducts = new OrderedProducts({
        orderedId:req.body.orderedId,
        productId:req.body.productId,
        variants:req.body.variants,
        modifiers:req.body.modifiers,
    });
    const orderedproductsSaved = await orderedproducts.save();
    res.send(orderedproductsSaved); 
    } catch (error) {
        res.send(error);
    }
});

orderedproducts.get("/orderedproducts",(req,res)=>{
    console.log("Getting orderedproducts");
    OrderedProducts.find({}).exec(function(err,orderedproducts){
        if(err){
            res.send("error has occured");
        }else{
            console.log(orderedproducts);
            res.json(orderedproducts);
        }
    });
});

orderedproducts.get("/orderedproducts/:id",(req,res)=>{
    console.log("Getting One orderedproducts");
    OrderedProducts.findOne({
        _id: req.params.id
    }).exec(function(err, OrderedProducts){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(OrderedProducts);
            res.json(OrderedProducts);
        }
    });
});

orderedproducts.put("/orderedproducts/:id", (req,res)=>{
    OrderedProducts.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
        orderedId:req.body.orderedId,
        productId:req.body.productId,
        variants:req.body.variants,
        modifiers:req.body.modifiers
        }
    },{
        upsert: true
    },function(err, newOrderedProducts){
        if(err) {
            res.send('error updating newOrderedProducts');
        } else {
            console.log(newOrderedProducts);
            res.send(newOrderedProducts);
        }
    });
});

orderedproducts.delete("/orderedproducts/:id", (req,res)=>{
    OrderedProducts.findByIdAndRemove({
        _id: req.params.id
    },function(err, orderedproducts){
        if(err) {
            res.send('error deleting');
        } else {
            console.log(orderedproducts);
            res.send(orderedproducts);
        }
    });
});


module.exports = orderedproducts