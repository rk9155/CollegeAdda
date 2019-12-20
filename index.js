const passport = require("passport");
const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const getProducts = require('./Routes/getProducts');
const upload = require('./Routes/upload');
const home = require('./Routes/Home');
const post = require('./Routes/post');
const items = require('./Routes/items');
const auth = require('./Routes/passport');
const loggedInUser = require('./Routes/loggedInUser');
const keys = require('./config/keys');


app.use(express.static('./views'));

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.cookieKey1, keys.cookieKey2, keys.cookieKey3]
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.use(express.static('./Template'));
app.use(express.static('./Template/uploads'));
app.use('/', home);
app.use('/post', post);
app.use('/getProducts', getProducts);
app.use('/upload', upload);
app.use('/items' , items);
app.use('/auth' , auth);
app.use('/api/', loggedInUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT);