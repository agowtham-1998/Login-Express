const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
    cartId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    cartVariants:{
        type:String,
        required:false
    },
    cartModifiers:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model("CartProducts",cartProductSchema);