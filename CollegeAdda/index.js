require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const findOrCreate = require('mongoose-findorcreate');
mongoose.connect("mongodb+srv://admin-RK:raka9155@cluster0-anzbv.mongodb.net/test?retryWrites=true&w=majority/userDB", { useNewUrlParser: true });

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(session({
//     secret: "Our little secret.",
//     resave: false,
//     saveUninitialized: false
// }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String
});
//UserSchema

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

//passport

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//google signIn
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/collegeadda",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
app.get("/auth/google",
    passport.authenticate('google', { scope: ["profile"] })
);
app.get("/auth/google/collegeadda",
    passport.authenticate('google', { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect to home.
        res.redirect('/');
    });

//login
app.get("/login", function (req, res) {
    res.render("login");
});
//register
app.get("/register", function (req, res) {
    res.render("register");
});


app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");

    // User.findById(req.user.id, function (err, foundUser) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if (foundUser) {
    //             foundUser.secret = submittedSecret;
    //             foundUser.save(function () {
    //                 res.redirect("/");
    //             });
    //         }
    //     }
    // });

app.post("/register", function (req, res) {
    User.register({ 
        username: req.body.username 
        }, 
        req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.reder("home2");
            });
        }
    });
});
app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.render("home2");
            });
        }
    });
});


const getProducts = require('./Routes/getProducts');
const upload = require('./Routes/upload');
const home = require('./Routes/Home');
const post = require('./Routes/post');
const items = require('./Routes/items');

app.use(express.static('./Template'));
app.use(express.static('./Template/uploads'));

app.use('/', home);
app.use('/post', post);
app.use('/getProducts', getProducts);
app.use('/upload', upload);
app.use('/items' ,items);

app.listen("3000");
