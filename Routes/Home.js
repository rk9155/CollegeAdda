const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.render('home2',{
        user: req.user ? req.user : ""
    });
});

module.exports = router;