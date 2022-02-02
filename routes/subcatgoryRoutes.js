const express = require("express");
const router = express.Router();
const subcategories = require("../controllers/subcategories");

router.post('/subcategories', subcategories.creteBySubCategories);
router.get('/subcategories', subcategories.getByAllSubCategories);
// router.get('/subcategories/:categoryId', subcategories.getSubCatgoryByCategoryId);
router.get('/subcategories/:id', subcategories.getByOneSubCategories);
router.put('/subcategories/:id', subcategories.updateSubCategories);
router.delete('/subcategories/:id', subcategories.deleteSubCategories);


module.exports = router;