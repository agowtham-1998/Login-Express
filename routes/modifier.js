const express = require("express");
const modifier = express.Router();
const Modifier = require("../models/Modifier");

modifier.post("/modifier",async (req,res)=>{
    try {
        console.log("Modifier List");
        const modifier = new Modifier({
            productId:req.body.productId,
            modifierName:req.body.modifierName,
            price:req.body.price,
            isActive:req.body.isActive
        });
        const savedModifier = await modifier.save();
        res.send(savedModifier);
    } catch (error) {
        res.send(error);
    }
});

modifier.get("/modifier",(req,res)=>{
    console.log("Getting Modifier");
    Modifier.find({}).exec(function(err,modifier){
        if(err){
            res.send("error  has occured");
        }else{
            console.log(modifier);
            res.json(modifier);
        }
    });
});

modifier.get("/modifier/:id",(req,res)=>{
    console.log("Getting One modifier");
    Modifier.findOne({
        _id: req.params.id
    }).exec(function(err, Modifier){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Modifier);
            res.json(Modifier);
        }
    });
});

modifier.put("/modifier/:id", (req,res)=>{
    Modifier.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            productId:req.body.productId,
            modifierName:req.body.modifierName,
            price:req.body.price,
            isActive:req.body.isActive
        }
    },{
        upsert: true
    },function(err, newModifier){
        if(err) {
            res.send('error updating modifier');
        } else {
            console.log(newModifier);
            res.send(newModifier);
        }
    });
});

modifier.delete("/modifier/:id", (req,res)=>{
    Modifier.findByIdAndRemove({
        _id: req.params.id
    },function(err, modifier){
        if(err) {
            res.send('error deleting');
        } else {
            console.log(modifier);
            res.send(modifier);
        }
    });
});

module.exports = modifier;