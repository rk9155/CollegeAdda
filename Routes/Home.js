const express = require('express');
const router = express.Router();
const products = require('../Models/product');


router.get('/category/:limit', (req, res) => {
    let limit = parseInt(req.params.limit);
    wishlist = []
    if (req.user)
        wishlist = req.user.my_wishlist

    async function getProducts() {
        const product = await products.find({college_name: req.query.college})
            .sort({ date: -1 })
            .limit(limit)

        product.forEach(p => {
            if (wishlist.indexOf(p.id) != -1) {
                p.isWish = true
            }
            else {
                p.isWish = false
            }
        })
        if (product != null) {
            res.json(product);
        }
        else {
            res.send({ error: 'Not found' });
        }

    }

    getProducts();
});

router.get('/category/:category/:limit', (req, res) => {
    let limit = parseInt(req.params.limit);
    st = req.params.category
    cn = req.query.college
    wishlist = []
    if (req.user)
        wishlist = req.user.my_wishlist
    async function getProducts() {
        const product = await products.find({ 
            sub_type: req.params.category,
            college_name: req.query.college 
        })
            .sort({ date: 1 })
            .limit(limit)

        product.forEach(p => {
            if (wishlist.indexOf(p.id) != -1) {
                p.isWish = true
            }
            else {
                p.isWish = false
            }
        })
        if (product != null) {
            res.json(product);
        }
        else {
            res.send({ error: 'Not found' });
        }

    }

    getProducts();
});



router.get('/store/:category/:limit', (req, res) => {
    console.log(req.params.category)

    var ds = -1
    var ps = -1
    if(req.query.sort == 0){
        ds = 1
    }
    else if(req.query.sort == 2){
        ps = 1
    }

    let limit = parseInt(req.params.limit);
    wishlist = []
    if (req.user)
        wishlist = req.user.my_wishlist
        
        if(req.query.sub_type){
            async function getProducts(){
                    const product = await products.find({ type: req.params.category,college_name: req.query.college })
                        .sort({ date: ds,price: ps })
                        .limit(limit)
                    console.log(product)
                
                    product.forEach(p => {
                        if (wishlist.indexOf(p.id) != -1) {
                            p.isWish = true
                        }
                        else {
                            p.isWish = false
                        }
                    })
                    if (product != null) {
                        res.json(product);
                    }
                    else {
                        res.send({ error: 'Not found' });
                    }
            }
            getProducts()
        }
    else{
        async function getProducts() {
            const product = await products.find({ type: req.params.category,college_name: req.query.college })
                .sort({ date: ds,price: ps })
                .limit(limit)
    
            product.forEach(p => {
                if (wishlist.indexOf(p.id) != -1) {
                    p.isWish = true
                }
                else {
                    p.isWish = false
                }
            })
            if (product != null) {
                res.json(product);
            }
            else {
                res.send({ error: 'Not found' });
            }
    
        }
    
        getProducts();
    }
    
});


router.get('/count', (req, res) => {

    async function getProducts() {
        const product = await products.find({college_name: req.query.college})
        res.json(product.length);
    }

    getProducts();
});
router.get('/count/:category', (req, res) => {

    async function getProducts() {
        const product = await products.find({ type: req.params.category,college_name: req.query.college })
        res.json(product.length);
    }

    getProducts();
});
router.get('/count/sub/:category', (req, res) => {

    async function getProducts() {
        const product = await products.find({ sub_type: req.params.category,college_name: req.query.college })
        res.json(product.length);
    }

    getProducts();
});

module.exports = router;