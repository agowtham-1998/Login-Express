const express = require("express");
const orders = express.Router();
const Orders = require("../models/Orders");
const date = require('date-and-time')


orders.post("/orders",async (req,res)=>{
    try {
        console.log("List orders");
    const orders = new Orders({
        userId:req.body.userId,
        cartId:req.body.cartId,
        deliveryType:req.body.deliveryType,
        paymentMethod:req.body.paymentMethod,
        isPaid:req.body.isPaid,
        deliveryDateTime:req.body.deliveryDateTime,
        orderStatus:req.body.orderStatus,
        customerNotes:req.body.customerNotes,
        customerName:req.body.customerName,
        contactNumber:req.body.contactNumber,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state
    });
    const ordersSaved = await orders.save();
    res.send(ordersSaved); 
    } catch (error) {
        res.send(error);
    }
});

orders.get("/orders",(req,res)=>{
    console.log("Getting orders");
    Orders.find({}).exec(function(err,orders){
        if(err){
            res.send("error has occured");
        }else{
            console.log(orders);
            res.json(orders);
        }
    });
});

orders.get("/orders/:id",(req,res)=>{
    console.log("Getting One orders");
    Orders.findOne({
        _id: req.params.id
    }).exec(function(err, Orders){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Orders);
            res.json(Orders);
        }
    });
});


orders.put("/orders/:id", (req,res)=>{
    Orders.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            userId:req.body.userId,
            cartId:req.body.cartId,
            deliveryType:req.body.deliveryType,
            paymentMethod:req.body.paymentMethod,
            isPaid:req.body.isPaid,
            deliveryDateTime:req.body.deliveryDateTime,
            orderStatus:req.body.orderStatus,
            customerNotes:req.body.customerNotes,
            customerName:req.body.customerName,
            contactNumber:req.body.contactNumber,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state
        }
    },{
        upsert: true
    },function(err, newOrders){
        if(err) {
            res.send('error updating Orders');
        } else {
            console.log(newOrders);
            res.send(newOrders);
        }
    });
});

orders.delete("/orders/:id", (req,res)=>{
    Orders.findByIdAndRemove({
        _id: req.params.id
    },function(err, orders){
        if(err) {
            res.send('error deleting');
        } else {
            console.log(orders);
            res.send(orders);
        }
    });
});


module.exports = orders;