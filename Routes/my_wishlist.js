const express = require('express');
const router = express.Router();
const Users = require('../Models/users');
const products = require('../Models/product');

router.get('/add/:id', async (req, res) => {
    const prod_id = req.params.id;
    if (req.user) {
        let AlredyThere = false
        wishlist = req.user.my_wishlist
        wishlist.forEach(pid => {
            if (pid == prod_id) {
                AlredyThere = true
            }
        });
        if (!AlredyThere) {
            wishlist.push(prod_id)

            Users.findById(req.user.id, function (err, doc) {
                if (err) {
                    throw err
                }
                doc.my_wishlist = wishlist;
                doc.save();
            });
        }

    }

    res.send(prod_id)
})

router.get('/remove/:id', async (req, res) => {

    const prod_id = req.params.id;
    if (req.user) {
        wishlist = req.user.my_wishlist
        let index = wishlist.indexOf(prod_id)
        if (index != -1) {
            wishlist.splice(index, 1)

            Users.findById(req.user.id, function (err, doc) {
                if (err) {
                    throw err
                }
                doc.my_wishlist = wishlist;
                doc.save();
            });
        }
    }

    res.send(prod_id)
})


router.get('/get', (req, res) => {

    if (req.user) {
        var wishlist = req.user.my_wishlist

        var allWish = []
        wishlist.forEach(async prod => {
            let getWish = await products.findById(prod).select({ image: 1, title: 1, price: 1 })
            allWish.push(getWish)

            if (allWish.length === wishlist.length) {
                res.send(allWish)
            }
        });
        if (wishlist.length == 0)
            res.send([])
    }
    
})




module.exports = router;