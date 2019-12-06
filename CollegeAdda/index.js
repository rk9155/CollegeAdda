const express = require('express');
const app = express();
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