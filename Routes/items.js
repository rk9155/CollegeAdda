const express = require('express');
const router = express.Router();
const path= require('path');
const products = require('../Models/product');
const ejs = require('ejs');



router.get('/:title' , async (req,res) =>{
    const title = req.params.title;
    async function getProducts(){
        const product = await products.find({title: title}).limit(1);
        res.render('sell_item', {
            product: product[0],
            user: req.user
        });
    }

    getProducts();
});

module.exports = router;