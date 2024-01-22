const mongoose = require('mongoose');

// Category Schema
const categorySchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "image": String
}, {
    timestamps: true
});

// Category Model
const Category = mongoose.model("Category", categorySchema);

// Export
module.exports = Category;
