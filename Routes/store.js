const express = require('express');
const router = express.Router();
const products = require('../Models/product');



router.get('/electronics', (req , res)=>{
    res.render('./store/electronics', {
        user: req.user ? req.user : ""
    });
})
router.get('/books', (req, res) => {
    res.render('./store/books', {
        user: req.user ? req.user : ""
    });
})
router.get('/vehicles', (req, res) => {
    res.render('./store/vehicles', {
        user: req.user ? req.user : ""
    });
})
router.get('/sports', (req, res) => {
    res.render('./store/sports', {
        user: req.user ? req.user : ""
    });
})
router.get('hotdeals', (req, res) => {
    res.render('./store/hotdeals', {
        user: req.user ? req.user : ""
    });
})


module.exports = router;