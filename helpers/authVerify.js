const {tokenValidator} = require("./token");

module.exports = function(req,res,next){
    const {jwt} = req.cookies;
    const valid = await tokenValidator(jwt);
    if(valid){
        next()
    }else{
        res.send("Access Denied");
    }
}