const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
   
    categoryName:{
        type:String,
        required:true
    },
    active:{
        type:Boolean
    },
});

Product = 

module.exports = mongoose.model("Category",categorySchema);