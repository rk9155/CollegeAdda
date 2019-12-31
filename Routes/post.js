const express = require('express');
const router = express.Router();


router.get('/add', (req , res) =>{
    res.render("post");
});

router.get('/attributes', (req , res) =>{
    res.render('post_attributes');
});

module.exports = router;