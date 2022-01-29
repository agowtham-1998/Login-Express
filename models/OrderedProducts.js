const mongoose = require("mongoose");

const orderedProductSchema = new mongoose.Schema({
    orderedId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    variants:{
        type:String,
        required:false
    },
    modifiers:{
        type:String,
        required:false
    },
});

module.exports = mongoose.model("OrderedProducts",orderedProductSchema);