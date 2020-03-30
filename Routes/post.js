const express = require('express');
const router = express.Router();


router.get('/add', (req , res) =>{
    res.render("post" , {
        user: req.user ? req.user : ""
    });
});

router.get('/add/electronics&appliances', (req , res) =>{
    res.render("sub-ad/s_electronics&appliances" , {
        user: req.user ? req.user : ""
    });
});
router.get('/add/vehicles', (req , res) =>{
    res.render("sub-ad/s_vehicles" , {
        user: req.user ? req.user : ""
    });
});
router.get('/add/sports&entertainment', (req , res) =>{
    res.render("sub-ad/s_sports&entertainment" , {
        user: req.user ? req.user : ""
    });
});
router.get('/add/books&notes', (req , res) =>{
    res.render("sub-ad/s_books&notes" , {
        user: req.user ? req.user : ""
    });
});
router.get('/add/services', (req , res) =>{
    res.render("sub-ad/s_services" , {
        user: req.user ? req.user : ""
    });
});
router.get('/add/other', (req , res) =>{
    res.render("sub-ad/s_other" , {
        user: req.user ? req.user : ""
    });
});



router.get('/add/:category/:item', (req , res) =>{
    res.render('add-form' , {
        user: req.user ? req.user : "",
        category: req.params.category,
        item: req.params.item
    });
});

module.exports = router;