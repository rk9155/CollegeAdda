const express = require('express');
const router = express.Router();
const path= require('path');


router.get('/', (req , res) =>{
    res.sendFile(path.resolve(__dirname+"/../Template/Post.html"));
});

router.get('/attributes', (req , res) =>{
    res.sendFile(path.resolve(__dirname+"/../Template/PostAttributes.html"));
});

module.exports = router;