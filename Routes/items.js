const express = require('express');
const router = express.Router();
const path= require('path');
const products = require('../Models/product');
const ejs = require('ejs');



router.get('/:title' , async (req,res) =>{
    const title = req.params.title;
    async function getProducts(){
        const product = await products.find({title: title}).limit(1);
        if(product[0] != null){
            res.render('sell_item', {
                product: product[0],
                user: req.user
            });
        }
        else{
            res.send({
                error: "Wrong image formate"
            });
        }
        
    }

    getProducts();
});

module.exports = router;