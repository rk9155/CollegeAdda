const passport = require("passport");
const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const image = require('./Routes/image');
const upload = require('./Routes/upload');
const home = require('./Routes/Home');
const post = require('./Routes/post');
const items = require('./Routes/items');
const myadds = require('./Routes/my_adds')
const my_wishlist = require('./Routes/my_wishlist')
const store = require('./Routes/store')
const auth = require('./Routes/passport');
const loggedInUser = require('./Routes/loggedInUser');
const keys = require('./config/keys');


app.use(express.static('./views'));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey1, keys.cookieKey2, keys.cookieKey3]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('home2', {
        user: req.user ? req.user : ""
    });
})

app.get('/checkout',(req,res)=>{
    res.render('checkout', {
        user: req.user ? req.user : ""
    });
})

app.set('view engine', 'ejs');
app.use(express.static('./Template'));
app.use('/store' ,store)
app.use('/products', home);
app.use('/post', post);
app.use('/image', image);
app.use('/upload', upload);
app.use('/items', items);
app.use('/auth', auth);
app.use('/api', loggedInUser);
app.use('/wishlist', my_wishlist);

const PORT = process.env.PORT || 3000;
app.listen(PORT);