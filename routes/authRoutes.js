const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.get('./protected',auth.protected)

// Protect all routes after this middleware
// router.use(auth.protect);

// Only admin have permission to access for the below APIs 
// router.use(auth.restrictTo('admin'));


module.exports = router;
