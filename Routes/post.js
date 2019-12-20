const express = require('express');
const router = express.Router();
const path= require('path');


router.get('/', (req , res) =>{
    res.render("post");
});

router.get('/attributes', (req , res) =>{
    res.render('post_attributes');
});

module.exports = router;