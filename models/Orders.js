const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    cartId:{
        type:String,
        required:true
    },
    deliveryType:{
        type:String,
        required:false
    },
    paymentMethod:{
        type:String,
        required:false
    },
    isPaid:{
        type:String,
        required:true
    },
    deliveryDateTime:{
        type:Date
    },
    orderStatus:{
        type:String
    },
    customerNotes:{
        type:String
    },
    customerName:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    }
});

module.exports = mongoose.model("Orders",orderSchema);