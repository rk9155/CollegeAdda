const express = require('express');
const router = express.Router();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb+srv://Yash2412:yash2412@cluster0-6rqau.mongodb.net/college-adda');
let gfs;
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
  })

router.get('/:filename' ,(req,res) =>{
        async function getImg(){
        const image = await gfs.files.findOne({filename: req.params.filename})
        if(image){
            if(image.contentType == 'image/jpeg' || image.contentType == 'image/jpg' || image.contentType == 'image/png'){
                var readstream = gfs.createReadStream(image.filename);
                readstream.pipe(res);
            } 
            else{
                res.send({err : "wrong image formate"});
            }
        }
        else{
            res.send({err: 'no image available'});
        }        
    }

    getImg();
});


module.exports = router;