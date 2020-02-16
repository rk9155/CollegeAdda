const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Yash2412:yash2412@cluster0-6rqau.mongodb.net/college-adda').then(()=> console.log("Connected to database"))



const schema = new mongoose.Schema({
    sub: String,
    name: String,
    given_name: String,
    family_name: String,
    picture: String,
    email: String,
    email_verified: Boolean,
    locale: String,
    my_wishlist: [mongoose.Schema.Types.ObjectId]
});

const user = mongoose.model('users_db' , schema);
module.exports = user;