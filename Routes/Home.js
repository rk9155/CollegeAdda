const express = require('express');
const router = express.Router();
const products = require('../Models/product');



router.get('/', (req, res) => {
    async function getProducts(){
        const product = await products.find({})
        .sort({date: 1})

        res.render('home2',{
            user: req.user ? req.user : "",
            product: product,

        });
    }

    getProducts();
});
router.get('/:search', (req, res) => {
    async function getProducts(){
        const product = await products.find({college_name: req.params.search})
        .sort({date: 1})
        if(product != null){
            res.render('home2',{
                user: req.user ? req.user : "",
                product: product,
            }); 
        }
        else{
            res.send({error: 'Not found'});
        }
        
    }

    getProducts();
});

module.exports = router;