const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
    productId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
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