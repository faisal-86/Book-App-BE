const mongoose = require('mongoose');

// Category Schema
const categorySchema = mongoose.Schema({
    categoryName : String,
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    image : String

})

// Category Model
const Category = mongoose.model("Category", categorySchema);

// Export
module.exports = Category;

