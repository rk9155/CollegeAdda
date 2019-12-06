const express = require('express');
const router = express.Router();
const products = require('../Models/product');
router.get('/' , async (req,res) =>{
        async function getProducts(){
        const product = await products.find({})
        .limit(10)
        .sort({date: 1})
        res.send(product);
    }

    getProducts();
});


module.exports = router;