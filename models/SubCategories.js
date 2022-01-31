const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    categoryId:{
       type:String,
       required:true
    },
    subcategoryName:{
        type:String,
        required:true
    },
    active:{
        type:Boolean
    },
});

module.exports = mongoose.model("SubCategory",subcategorySchema);