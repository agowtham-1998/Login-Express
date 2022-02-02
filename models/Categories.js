const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    subcategories: [{ type: mongoose.Types.ObjectId, ref: 'SubCategory' }],
    categoryName:{
        type:String,
        required:true
    },
    active:{
        type:Boolean
    },
});

module.exports = mongoose.model("Category",categorySchema);