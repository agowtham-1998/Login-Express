const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories");

router.post('/categories', categories.createByCategories);
router.get('/categories', categories.getByAllCategories);
router.get('/categories/:id', categories.getByOneCategory);
router.put('/categories/:id', categories.updateByCategories);
router.delete('/categories:id', categories.deleteByCategories);


module.exports = router;