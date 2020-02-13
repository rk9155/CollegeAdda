const express = require('express');
const router = express.Router();


router.get('/add', (req , res) =>{
    res.render("post" , {
        user: req.user ? req.user : ""
    });
});

router.get('/attributes', (req , res) =>{

    res.render('post_attributes' , {
        user: req.user ? req.user : ""
    });
});

module.exports = router;