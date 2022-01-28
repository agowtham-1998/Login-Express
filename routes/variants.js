const express = require("express");
const variants = express.Router();
const Variant = require("../models/Variants");

variants.post("/variants", async (req,res)=>{
    try {
        console.log("List Variants");
        const variants = new Variant({
            productId:req.body.productId,
            variantName:req.body.variantName,
            price:req.body.price,
            isDefault:req.body.isDefault,
            isActive:req.body.isActive
        });
        const savedVariant = await variants.save();
        res.send(savedVariant);    
    } catch (error) {
        res.send(error);
    }
});

variants.get("/variants",(req,res)=>{
    console.log("Getting All variants");
    Variant.find({}).exec(function(err, variants){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(variants);
            res.json(variants);
        }
    });
});

variants.get("/variants/:id",(req,res)=>{
    console.log("Getting One variants");
    Variant.findOne({
        _id: req.params.id
    }).exec(function(err, Variant){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Variant);
            res.json(Variant);
        }
    });
});

variants.put("/variants/:id", (req,res)=>{
    Variant.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            productId:req.body.productId,
            variantName:req.body.variantName,
            price:req.body.price,
            isDefault:req.body.isDefault,
            isActive:req.body.isActive
        }
    },{
        upsert: true
    },function(err, newVariant){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(newVariant);
            res.send(newVariant);
        }
    });
});

variants.delete("/variants/:id", (req,res)=>{
    Variant.findByIdAndRemove({
        _id: req.params.id
    },function(err, variants){
        if(err) {
            res.send('error deleting book');
        } else {
            console.log(variants);
            res.send(variants);
        }
    });
});


module.exports = variants;
