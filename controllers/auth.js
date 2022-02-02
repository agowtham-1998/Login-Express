const User = require("../models/User");
const {hashGenerate} = require("../helpers/hashing");
const {hashValidator} = require("../helpers/hashing");
const {tokenGenerator} = require("../helpers/token");
const authVerify = require("../helpers/authVerify");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) =>{
    try {
        const hashPassword = await hashGenerate(req.body.password);
        const user = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            role: req.body.role
        });
        res.status(201).json({
            status: "success",
            data: {
              user,
            },
          });

    } catch (error) {
        res.send(error);
    }  
}

exports.signin = async (req,res)=>{
    try {
      const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser){
            res.send("Email Invalid");
        }else{
           const checkUser = await hashValidator(req.body.password,existingUser.password);
           if(!checkUser){
              res.send("Password is Invaild");
              console.log("ggggggg",checkUser);
           } else {
            const token = await tokenGenerator(existingUser.email);
            res.cookie("jwt",token);
            //res.send(token);
            res.status(200).json({
                status: "success",
                token,
                data: {
                    existingUser,
                },
              });
           }
        }  
    } catch (error) {
        res.send(error);
    }
}

exports.protected = authVerify , (req,res)=>{
    res.send("protected route");
};


// exports.restrictTo = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return next(
//           new AppError(403, "fail", "You are not allowed to do this action"),
//           req,
//           res,
//           next,
//         );
//       }
//       next();
//     };
//   };