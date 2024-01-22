const mongoose = require('mongoose');

// Category Schema
const requestSchema = mongoose.Schema({
    
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    
    "bookTitle" : String,
    "bookAuthor" : String,

    "description" : String,
    "approvalStatus" : Boolean
},
{
  timestamps: true
})
// User Model
const Request = mongoose.model("Request", requestSchema);

// Export
module.exports = Request;