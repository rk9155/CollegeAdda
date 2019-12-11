const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-RK:raka9155@cluster0-anzbv.mongodb.net/test?retryWrites=true&w=majority/userDB').then(()=> console.log("Connected to database"))



const schema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    sub_type: String,
    owner_name: String,
    owner_mob: String,
    owner_email: String,
    date_of_post: {type: Date , default: Date.now()},
    price: Number,
    state: String,
    city: String,
    college_name: String,
    image: [String]
});

const productUpload = mongoose.model('products' , schema);
module.exports = productUpload;
