const express = require('express');
const router = express.Router();
const path= require('path');


router.get('/', (req , res) =>{
    res.redirect("post.html");
});

router.get('/attributes', (req , res) =>{
    res.redirect("../PostAttributes.html");
});

module.exports = router;