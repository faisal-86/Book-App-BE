const express = require('express');
require('dotenv').config()

// connect to mongoDB
const db = require('./config/db')

// initialize express app
const app = express();

//  Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// link you static folder i.e. images, css 
app.use(express.static('public'));

// Routes
const userRoute = require('./routes/user');
const reviewRoute = require('./routes/review');
const requestRoute = require('./routes/request');
const libraryRoute = require('./routes/library');
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const bookRoute = require('./routes/book');


app.use('/user', userRoute);
app.use('/review', reviewRoute);
app.use('/request', requestRoute);
app.use('/library', libraryRoute);
app.use('/auth', authRoute);
app.use('/category', categoryRoute);
app.use('/book', bookRoute);


// start listening to requests coming from the PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
