const mongoose = require('mongoose');

// Book Schema
const bookSchema = mongoose.Schema({
"title" : {
    type: String,
    required: true
},
"author" : 
{   type: String,
    required: true
},
"description" : String,
"isbn" : String,
"publish_date" : Date,
"image" : String,

"category":{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
},

"library":{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Library'
},
"review":{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Review'
},

},
{
  timestamps: true
})

const Book = mongoose.model("Book", bookSchema);

// Export
module.exports = Book;