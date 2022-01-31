const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
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
    productImage:{
        type:String,
        required:false
    }
})
module.exports = mongoose.model("Product",productSchema);