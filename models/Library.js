const mongoose = require('mongoose');

// Category Schema
const librarySchema = mongoose.Schema({
    "book":{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',

    },
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true

    },

},
{
  timestamps: true
})
// Library Model
const Library = mongoose.model("Library", librarySchema);

// Export
module.exports = Library;