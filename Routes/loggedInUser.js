const express = require('express');
const router = express.Router();

router.get('/logged-in-user' , (req,res) =>{
    res.send("<a href='"+req.user.picture+"'>Click</a>");
});

router.get('/logout', (req,res)=>{
    req.logOut();
    res.redirect('home2')
})
module.exports = router;

