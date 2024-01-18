const mongoose = require('mongoose');

// Category Schema
const reviewSchema = mongoose.Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment : String,
    rating : Number
})

// Review Model
const Review = mongoose.model("Review", reviewSchema);

// Export
module.exports = Review;