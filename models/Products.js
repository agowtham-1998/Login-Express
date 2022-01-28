const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    active:{
        type:Boolean
    },
    image:{
        data:Buffer,
        contentType:String
    }
})
module.exports = mongoose.model("Product",productSchema);