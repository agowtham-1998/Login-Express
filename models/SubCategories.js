const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    categoryId: [{ type: mongoose.Types.ObjectId, ref: 'Category' }] ,
    subcategoryName:{
        type:String,
        required:true
    },
    active:{
        type:Boolean
    },
});


module.exports = mongoose.model("SubCategory",subcategorySchema);