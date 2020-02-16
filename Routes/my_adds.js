const express = require('express');
const router = express.Router();
const products = require('../Models/product');

router.get('/', async (req, res) => {
    const user_email = req.user.email;

    async function getProducts() {

        const my_add = await products.find({ owner_email: user_email }).sort({ date: -1});

        res.send(my_add)
    }

    getProducts();
})

module.exports = router;