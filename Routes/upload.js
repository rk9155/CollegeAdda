const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const productUpload = require('../Models/product');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');


// var Storage = multer.diskStorage({
//     destination: path.resolve(__dirname + "/../Template/uploads"),
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
//     }
// });

const storage = new GridFsStorage({
    url: 'mongodb+srv://Yash2412:yash2412@cluster0-6rqau.mongodb.net/college-adda',
    file: (req, file) => {
        return {
            filename: 'file_' + Date.now()
        };
    }
});


var upload = multer({storage}).any();

router.post('/', upload, function (req, res, next) {
    const image = req.files;
    var imgArray = [];
    image.forEach(img => {
        imgArray.push(img.filename);
    });

    const title = req.body.title.trim();
    const type = req.body.type;
    const sub_type = req.body.sub_type;
    const owner_name = req.user.name;
    const owner_mob = req.body.owner_mob;
    const owner_email = req.user.email;
    const owner_image = req.user.picture;
    const price = req.body.price;
    const state = req.body.state;
    const city = req.body.city;
    const description = req.body.description;
    const college_name = req.body.college_name;
    const uploasProduct = new productUpload({
        title: title,
        type: type,
        sub_type: sub_type.toUpperCase(),
        owner_name: owner_name,
        owner_mob: owner_mob,
        owner_email: owner_email,
        owner_image: owner_image,
        price: price.substring(2),
        state: state,
        city: city,
        description: description,
        college_name: college_name,
        image: imgArray
    });
    uploasProduct.save(function (err, doc) {
        if (err) throw err;
    });


    res.redirect('/');
});

module.exports = router;

