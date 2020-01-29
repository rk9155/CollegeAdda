const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Yash2412:yash2412@cluster0-6rqau.mongodb.net/college-adda').then(()=> console.log("Connected to database"))



const schema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    sub_type: String,
    owner_name: String,
    owner_mob: String,
    owner_email: String,
    owner_image: String,
    date_of_post: {type: Date , default: Date.now()},
    price: Number,
    state: String,
    city: String,
    college_name: String,
    image: [String]
});

const productUpload = mongoose.model('products' , schema);
module.exports = productUpload;