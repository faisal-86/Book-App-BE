const mongoose = require('mongoose');

// Category Schema
const requestSchema = mongoose.Schema({
    "book":{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    "description" : String,
    "approval" : Boolean
},
{
  timestamps: true
})
// User Model
const Request = mongoose.model("Request", requestSchema);

// Export
module.exports = User;