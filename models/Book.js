const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "author": {
        type: String,
        required: true
    },
    "description": String,
    "isbn": String,
    "publish_date": Date,
    "image": [String], // Array of strings for images

    "category": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false // Make it optional
    },
    "library": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library',
        required: false // Make it optional
    },
    "review": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: false // Make it optional
    },
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

// Export
module.exports = Book;
