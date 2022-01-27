const express = require("express");
const routes = express.Router();
const User = require("../models/User");
const {hashGenerate} = require("../helpers/hashing");
const {hashValidator} = require("../helpers/hashing");
const {tokenGenerator} = require("../helpers/token");
const {authVerify} = require("../helpers/authVerify");

routes.post("/signup",async (req,res)=>{
    try {
        const hashPassword = await hashGenerate(req.body.password);
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        });
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (error) {
        // res.send(error);
    }
   
})

routes.post("/signin",async (req,res)=>{
    try {
      const existingUser = User.findOne({email:req.body.email});
        if(!existingUser){
            res.send("Email Invalid");
        }else{
           const checkUser = await hashValidator(req.body.password,existingUser.password);
           if(!checkUser){
              res.send("Password is Invaild");
           }
            const token = await tokenGenerator(existingUser.email);
            res.cookie("jwt",token);
            res.send(token);
        }
        
    } catch (error) {
        // res.send(error);
    }
})

routes.get("/protected",(req,res)=>{
    res.send("protected route");
})

module.exports = routes;