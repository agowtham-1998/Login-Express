const express = require("express");
const router = express.Router();
const products = require('../controllers/products');

//Image upload 
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null,'./uploads/');
    },
    filename: function(req, file, cb){
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

//Image file format
const fileFilter = (req, file, cb)=>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null,true);
    }else{
        cb(null,false);
    }
}

//Image File Size
const upload = multer({
    storage : storage, 
    limits:
    {
        fileSize : 1024 * 1024 * 5
    },
        fileFilter: fileFilter
    });


router.post("/products",upload.single('productImage'), products.createByProducts);
router.get("/products", products.getByAllProducts);
router.get("/products/:id",products.getByOneProduct);
router.put("/products/:id",upload.single('productImage'), products.updateByProducts);
router.delete("/products/:id", products.deleteByProducts);


module.exports = router;
