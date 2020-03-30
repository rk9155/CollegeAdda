const express = require('express');
const router = express.Router();

router.get('/logged-in-user' , (req,res) =>{
    res.send(req.user);
});

router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('/')
})
router.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.user ? req.user : ""
    });
})
module.exports = router;

