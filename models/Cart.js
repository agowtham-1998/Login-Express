const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    cartNo:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Cart",cartSchema);