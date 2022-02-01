const express = require("express");
const categories = express.Router();
const Category = require("../models/Categories");

categories.post("/categories", async (req,res)=>{
    try {
        console.log("List Category");
        const categories = new Category({
            _id: req.body.categoryId,
            categoryName:req.body.categoryName,
            active:req.body.active,
        });
        const savedCategory = await categories.save();
        res.send(savedCategory);    
    } catch (error) {
        res.send(error);
    }
});

categories.get("/categories",(req,res)=>{
    console.log("Getting All categories");
    Category.find({}).exec(function(err, categories){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(categories);
            res.json(categories);
        }
    });
});

categories.get("/categories/:id",(req,res)=>{
    console.log("Getting One categories");
    Category.findOne({
        _id: req.params.id
    }).exec(function(err, Category){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(Category);
            res.json(Category);
        }
    });
});

categories.put("/categories/:id", (req,res)=>{
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
            res.send(newCategory);
        }
    });
});

categories.delete("/categories/:id", (req,res)=>{
    Category.findByIdAndRemove({
        _id: req.params.id
    },function(err, categories){
        if(err) {
            res.send('error deleting book');
        } else {
            console.log(categories);
            res.send(categories);
        }
    });
});



module.exports = categories;