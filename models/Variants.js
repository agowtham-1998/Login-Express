const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    productId : {
        type:String,
        required:true
    },
    variantName : {
        type:String,
        required:true
    },
    price : {
        type: String,
        required:true
    },
    isDefault : {
        type: Boolean,
        required:false
    },
    isActive : {
        type: Boolean,
        required:false
    }
});

module.exports = mongoose.model("Variant", variantSchema);