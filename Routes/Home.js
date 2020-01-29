const express = require('express');
const router = express.Router();
const products = require('../Models/product');


router.get('/all', (req, res) => {
    async function getProducts() {
        const product = await products.find({ })
            .sort({ date: 1 })
        if (product != null) {
            res.json(product);
        }
        else {
            res.send({ error: 'Not found' });
        }

    }

    getProducts();
});
router.get('/search/:search', (req, res) => {
    async function getProducts() {
        const product = await products.find({ college_name: req.params.search })
            .sort({ date: 1 })
        if (product != null) {
            res.json(product);
        }
        else {
            res.send({ error: 'Not found' });
        }

    }

    getProducts();
});
router.get('/category/:category', (req, res) => {
    async function getProducts() {
        const product = await products.find({ sub_type: req.params.category })
            .sort({ date: 1 })
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