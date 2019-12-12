const express = require('express');
const app = express();
const getProducts = require('./Routes/getProducts');
const upload = require('./Routes/upload');
const home = require('./Routes/Home');
const post = require('./Routes/post');
const items = require('./Routes/items');

app.set('view engine','ejs');
app.use(express.static('./Template'));
app.use(express.static('./Template/uploads'));
app.use('/', home);
app.use('/post', post);
app.use('/getProducts', getProducts);
app.use('/upload', upload);
app.use('/items' ,items);

const PORT = process.env.PORT;
app.listen(PORT);