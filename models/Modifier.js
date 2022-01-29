const mongoose = require("mongoose");

const modifierSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    modifierName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    }
});
module.exports = mongoose.model("Modifier",modifierSchema);