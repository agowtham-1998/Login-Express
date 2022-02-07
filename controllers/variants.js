const Variant = require("../models/Variants");

exports.createByVariants = async (req,res)=>{
    try {
        console.log("List Variants");
        const variants = new Variant({
            productId:req.body.productId,
            variantName:req.body.variantName,
            price:req.body.price,
            isDefault:req.body.isDefault,
            isActive:req.body.isActive
        });
        const savedVariant = await variants.save();
        res.status(201).json({
            status: "success",
            data: {
                savedVariant,
            },
          });      
    } catch (error) {
        res.send(error);
    }
};

exports.getByAllVariants = (req,res)=>{
    console.log("Getting All variants");
    Variant.find({}).exec(function(err, variants){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(variants);
            res.status(201).json({
                status: "success",
                data: {
                    variants,
                },
              });   
        }
    });
};

exports.getByOneVariants = (req,res)=>{
    console.log("Getting One variants");
    Variant.findOne({
        _id: req.params.id
    }).exec(function(err, Variant){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Variant);
            res.status(201).json({
                status: "success",
                data: {
                    Variant,
                },
              });   
        }
    });
};

exports.updateVariants = (req,res)=>{
    Variant.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            productId:req.body.productId,
            variantName:req.body.variantName,
            price:req.body.price,
            isDefault:req.body.isDefault,
            isActive:req.body.isActive
        }
    },{
        upsert: true
    },function(err, newVariant){
        if(err) {
            res.send('error updating variants');
        } else {
            console.log(newVariant);
            res.status(201).json({
                status: "success",
                data: {
                    newVariant,
                },
              });   
        }
    });
};

exports.deleteByVariants = (req,res)=>{
    Variant.findByIdAndRemove({
        _id: req.params.id
    },function(err, variants){
        if(err) {
            res.send('error deleting variants');
        } else {
            console.log(variants);
            res.status(201).json({
                status: "success",
                data: {
                    variants,
                },
              });   
        }
    });
};
