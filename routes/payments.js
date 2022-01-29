const express = require("express");
const payments = express.Router();
const Payments = require("../models/Payments");

payments.post("/payments",async (req,res)=>{
    try {
        console.log("List payments");
    const payments = new Payments({
        userId:req.body.userId,
        orderId:req.body.orderId,
        amount:req.body.amount
    });
    const paymentsSaved = await payments.save();
    res.send(paymentsSaved); 
    } catch (error) {
        res.send(error);
    }
});

payments.get("/payments",(req,res)=>{
    console.log("Getting payments");
    Payments.find({}).exec(function(err,payments){
        if(err){
            res.send("error has occured");
        }else{
            console.log(payments);
            res.json(payments);
        }
    });
});

payments.get("/payments/:id",(req,res)=>{
    console.log("Getting One payments");
    Payments.findOne({
        _id: req.params.id
    }).exec(function(err, Payments){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Payments);
            res.json(Payments);
        }
    });
});

payments.put("/payments/:id", (req,res)=>{
    Payments.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            userId:req.body.userId,
            orderId:req.body.orderId,
            amount:req.body.amount
        }
    },{
        upsert: true
    },function(err, newPayments){
        if(err) {
            res.send('error updating Payments');
        } else {
            console.log(newPayments);
            res.send(newPayments);
        }
    });
});

payments.delete("/payments/:id", (req,res)=>{
    Payments.findByIdAndRemove({
        _id: req.params.id
    },function(err, payments){
        if(err) {
            res.send('error deleting');
        } else {
            console.log(payments);
            res.send(payments);
        }
    });
});

module.exports = payments;