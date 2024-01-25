const mongoose = require('mongoose');

// Category Schema
const categorySchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "book":[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',

    }],
    "image": String
}, {
    timestamps: true
});

// Category Model
const Category = mongoose.model("Category", categorySchema);

// Export
module.exports = Category;
