const mongoose = require('mongoose');

// Category Schema
const requestSchema = mongoose.Schema({
    "book":{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required: true
    },
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
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
module.exports = Request;