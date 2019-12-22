const express = require('express');
const router = express.Router();
const products = require('../Models/product');



router.get('/', (req, res) => {
    async function getProducts(){
        const product = await products.find({})
        .limit(12)
        .sort({date: 1})

        res.render('home2',{
            user: req.user ? req.user : "",
            product: product
        });
    }

    getProducts();
});

module.exports = router;