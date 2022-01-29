const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model("Payments",paymentsSchema);