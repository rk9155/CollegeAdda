const express = require('express');
const router = express.Router();
const products = require('../Models/product');



router.get('/logged-in-user' , (req,res) =>{
    res.send(req.user);
});

router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/')
})
router.get('/profile/details', (req, res) => {
    res.render('./profile/profile1', {
        user: req.user ? req.user : ""
    });
})


router.get('/profile/details', (req, res) => {
    res.render('./profile/profile1', {
        user: req.user ? req.user : ""
    });
})



router.get('/profile/my_ads', async (req, res) => {
    const user_email = req.user.email;

    async function getProducts() {

        const my_ad = await products.find({ owner_email: user_email }).sort({ date: -1});
        res.render('./profile/profile2', {
            my_ad: my_ad,
            user: req.user ? req.user : ""
        });
    }

    getProducts();
})
module.exports = router;

