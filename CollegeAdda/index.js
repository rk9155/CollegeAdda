const express = require('express');


const app = express();

const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const app = express();
const userSchema = {
    email: String,
    Password: String
};

const User = new mongoose.model("User", userSchema);



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        Password: req.body.password
    });

    newUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.render('/');
        }
    });
});

app.post("/login", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render('Home');
                }
            }
        }
    });
});

const getProducts = require('./Routes/getProducts');
const upload = require('./Routes/upload');
const home = require('./Routes/Home');
const post = require('./Routes/post');

app.use(express.static('./Template'));
app.use('/', home);
app.use('/post', post);
app.use('/getProducts', getProducts);
app.use('/upload', upload);

app.listen("3000");
