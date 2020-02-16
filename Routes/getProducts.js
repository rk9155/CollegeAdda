const express = require('express');
const router = express.Router();
const products = require('../Models/product');
router.get('/' , async (req,res) =>{

    async function getProducts(){
        wishlist = req.user.my_wishlist
        const product = await products.find({})
        .limit(10)
        .sort({date: 1})
        product.forEach(p =>{
            if(wishlist.indexOf(p.id) != -1){
                p.isWish = true
            }
            else{
                p.isWish = false
            }
        })
        console.log(product)
        res.send(product);
    }

    getProducts();
});


module.exports = router;