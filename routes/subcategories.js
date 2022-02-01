const express = require("express");
const subcategories = express.Router();
const SubCategory = require("../models/SubCategories");

subcategories.post("/subcategories", async (req,res)=>{
    try {
        console.log("List Category");
        const subcategories = new SubCategory({
            categoryId:req.body.categoryId,
            subcategoryName:req.body.subcategoryName,
            active:req.body.active,
        });
        const savedSubCategory = await subcategories.save();
        res.send(savedSubCategory);    
    } catch (error) {
        res.send(error);
    }
});

subcategories.get("/subcategories",(req,res)=>{
    console.log("Getting All subcategories");
    SubCategory.find({}).exec(function(err, subcategories){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(subcategories);
            res.json(subcategories);
        }
    });
});

subcategories.get("/subcategories/:categoryId",(req,res)=>{
    console.log("Getting Category");
    SubCategory.find({categoryId:req.body.categoryId}).exec(function(err, subcategories){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(subcategories);
            res.json(subcategories);
        }
    });
});


subcategories.get("/subcategories/:id",(req,res)=>{
    console.log("Getting One subcategories");
    SubCategory.findOne({
        _id: req.params.id
    }).exec(function(err, SubCategory){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(SubCategory);
            res.json(SubCategory);
        }
    });
});

subcategories.put("/subcategories/:id", (req,res)=>{
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
            res.send(newSubCategory);
        }
    });
});

subcategories.delete("/subcategories/:id", (req,res)=>{
    SubCategory.findByIdAndRemove({
        _id: req.params.id
    },function(err, subcategories){
        if(err) {
            res.send('error deleting subcategories');
        } else {
            console.log(subcategories);
            res.send(subcategories);
        }
    });
});


module.exports = subcategories;
