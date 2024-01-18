const express = require('express');

// Create our express app
const app = express();
var path = require("path");



const port = process.env.PORT || 4004
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))