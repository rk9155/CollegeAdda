const express = require('express');
const router = express.Router();
const products = require('../Models/product');


router.get('/category/:limit', (req, res) => {
    let limit = parseInt(req.params.limit);
    wishlist = []
    if (req.user)
        wishlist = req.user.my_wishlist

    async function getProducts() {
        const product = await products.find({})
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
router.get('/search/:search/:limit', (req, res) => {
    let limit = parseInt(req.params.limit);
    wishlist = []
    if (req.user)
        wishlist = req.user.my_wishlist
    async function getProducts() {
        const product = await products.find({ college_name: req.params.search })
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
router.get('/category/:category/:limit', (req, res) => {
    let limit = parseInt(req.params.limit);
    wishlist = []
    if (req.user)
        wishlist = req.user.my_wishlist
    async function getProducts() {
        const product = await products.find({ sub_type: req.params.category })
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

module.exports = router;