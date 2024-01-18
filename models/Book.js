const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
title : String,
author : String,
description : String,
isbn : String,
public_date : Date,
image : String,

categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
},

libraryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Library'
},
reviewId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Review'
},


})

const Book = mongoose.model("Book", bookSchema);

// Export
module.exports = Book;