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


// start listening to requests coming from the PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
