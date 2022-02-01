const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    _id:{
        type:String,
        ref:"SubCategory"
    },
    categoryName:{
        type:String,
        required:true
    },
    active:{
        type:Boolean
    },
});

module.exports = mongoose.model("Category",categorySchema);