const Category = require("../models/Categories");


exports.createByCategories =  async (req,res)=>{
    try {
        console.log("List Category");
        const categories = new Category({
            _id: req.body.categoryId,
            categoryName:req.body.categoryName,
            active:req.body.active,
        });
        const savedCategory = await categories.save();
        //res.send(savedCategory); 
        res.status(201).json({
            status: "success",
            data: {
                savedCategory,
            },
          });   
    } catch (error) {
        res.send(error);
    }
};

exports.getByAllCategories = (req,res)=>{
    console.log("Getting All categories");
    Category.find({}).exec(function(err, categories){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(categories);
            res.status(201).json({
                status: "success",
                data: {
                    categories,
                },
              });   
        }
    });
};

exports.getByOneCategory = (req,res)=>{
    console.log("Getting One categories");
    Category.findOne({
        _id: req.params.id
    }).exec(function(err, Category){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Category);
            res.status(201).json({
                status: "success",
                data: {
                    Category,
                },
              });  
        }
    });
};

exports.updateByCategories = (req,res)=>{
    Category.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            categoryName:req.body.categoryName,
            active:req.body.active,
        }
    },{
        upsert: true
    },function(err, newCategory){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(newCategory);
            res.status(201).json({
                status: "success",
                data: {
                    newCategory,
                },
              });  
        }
    });
};

exports.deleteByCategories = (req,res)=>{
    Category.findByIdAndRemove({
        _id: req.params.id
    },function(err, categories){
        if(err) {
            res.send('error deleting book');
        } else {
            console.log(categories);
            res.status(201).json({
                status: "success",
                data: {
                    categories,
                },
              });  
        }
    });
};
