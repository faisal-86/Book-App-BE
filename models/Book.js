const mongoose = require('mongoose');

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
    "image": [String],
    "category": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    
    "reviews": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
