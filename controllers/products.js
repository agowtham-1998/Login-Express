const Product = require("../models/Products");

exports.createByProducts = async (req,res)=>{
    try {
        console.log(req.file);
        console.log("List Products");
        const products = new Product({
            productName:req.body.productName,
            price:req.body.price,
            description:req.body.description,
            active:req.body.active,
            productImage:req.file.path
        });
        const savedProduct = await products.save();
        res.status(201).json({
            status: "success",
            data: {
                savedProduct,
            },
          });      
    } catch (error) {
        res.send(error);
    }
};

exports.getByAllProducts = (req,res)=>{
    console.log("Getting All products");
    Product.find({}).exec(function(err, products){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(products);
            res.status(201).json({
                status: "success",
                data: {
                    products,
                },
              }); 
        }
    });
}


exports.getByOneProduct = async (req,res)=>{
    console.log("Getting One product");
    Product.findOne({
        _id: req.params.id
    }).exec(function(err, Product){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Product);
            res.status(201).json({
                status: "success",
                data: {
                    Product,
                },
              }); 
        }
    });
};

exports.updateByProducts = (req,res)=>{
    Product.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            productName:req.body.productName,
            price:req.body.price,
            description:req.body.description,
            active:req.body.active,
            productImage:req.file.path
        }
    },{
        upsert: true
    },function(err, newProduct){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(newProduct);
            res.status(201).json({
                status: "success",
                data: {
                    newProduct,
                },
              }); 
        }
    });
};

exports.deleteByProducts = (req,res)=>{
    Product.findByIdAndRemove({
        _id: req.params.id
    },function(err, products){
        if(err) {
            res.send('error deleting book');
        } else {
            console.log(products);
            res.status(201).json({
                status: "success",
                data: {
                    products,
                },
              }); 
        }
    });
};
