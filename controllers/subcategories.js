const SubCategory = require("../models/SubCategories");

exports.creteBySubCategories = async (req,res)=>{
    try {
        console.log("List Category");
        const subcategories = new SubCategory({
            categoryId:req.body.categoryId,
            subcategoryName:req.body.subcategoryName,
            active:req.body.active,
        });
        const savedSubCategory = await subcategories.save();
        res.status(201).json({
            status: "success",
            data: {
                savedSubCategory,
            },
          });   
    } catch (error) {
        res.send(error);
    }
};

exports.getByAllSubCategories = (req,res)=>{
    console.log("Getting All subcategories");
    SubCategory.find({}).exec(function(err, subcategories){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(subcategories);
            res.status(201).json({
                status: "success",
                data: {
                    subcategories,
                },
              });   
        }
    });
};

// exports.getSubCatgoryByCategoryId = (req,res)=>{
//     console.log("Getting Category");
//     SubCategory.findById(id).populate('categories').exec(function(err, subcategories){
//         if(err) {
//             res.send('error has occured');
//         } else {
//             console.log(subcategories);
//             res.status(201).json({
//                 status: "success",
//                 data: {
//                     subcategories,
//                 },
//               });   
//         }
//     });
// };


exports.getByOneSubCategories = (req,res)=>{
    console.log("Getting One subcategories");
    SubCategory.findOne({
        _id: req.params.id
    }).exec(function(err, SubCategory){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(SubCategory);
            res.status(201).json({
                status: "success",
                data: {
                    SubCategory,
                },
              });   
        }
    });
};

exports.updateSubCategories = (req,res)=>{
    SubCategory.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            categoryId:req.body.categoryId,
            subcategoryName:req.body.subcategoryName,
            active:req.body.active,
        }
    },{
        upsert: true
    },function(err, newSubCategory){
        if(err) {
            res.send('error updating subcategories');
        } else {
            console.log(newSubCategory);
            res.status(201).json({
                status: "success",
                data: {
                    newSubCategory,
                },
              });   
        }
    });
};

exports.deleteSubCategories = (req,res)=>{
    SubCategory.findByIdAndRemove({
        _id: req.params.id
    },function(err, subcategories){
        if(err) {
            res.send('error deleting subcategories');
        } else {
            console.log(subcategories);
            res.status(201).json({
                status: "success",
                data: {
                    subcategories,
                },
              });   
        }
    });
};

