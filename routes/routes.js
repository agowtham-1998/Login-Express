const express = require("express");
const routes = express.Router();
const User = require("../models/User");
const {hashGenerate} = require("../helpers/hashing");
const {hashValidator} = require("../helpers/hashing");
const {tokenGenerator} = require("../helpers/token");
const authVerify = require("../helpers/authVerify");

routes.post("/signup",async (req,res)=>{
    try {
        const hashPassword = await hashGenerate(req.body.password);
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            role: req.body.role
        });
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (error) {
        res.send(error);
    }
   
})

routes.post("/signin",async (req,res)=>{
    try {
      const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser){
            res.send("Email Invalid");
            //console.log("eeeeeeeeeee",existingUser);
        }else{
            //console.log("eeeeeeeeeee",existingUser);
           const checkUser = await hashValidator(req.body.password,existingUser.password);
           if(!checkUser){
              res.send("Password is Invaild");
              console.log("ggggggg",checkUser);
           } else {
            //console.log("ggggggg",checkUser);
            const token = await tokenGenerator(existingUser.email);
            res.cookie("jwt",token);
            res.send(token);
           }
        }  
    } catch (error) {
        res.send(error);
    }
})

routes.get("/protected",authVerify,(req,res)=>{
    res.send("protected route");
})

module.exports = routes;