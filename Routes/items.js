const express = require('express');
const router = express.Router();
const path= require('path');
const products = require('../Models/product');
const ejs = require('ejs');



router.get('/:_id' , async (req,res) =>{
    const id = req.params._id;
    async function getProducts(){
        const product = await products.find({_id: id}).limit(1);
        if(product[0] != null){
            res.render('product', {
                product: product[0],
                user: req.user ? req.user : ""
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