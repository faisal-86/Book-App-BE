const mongoose = require('mongoose');

// Category Schema
const requestSchema = mongoose.Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    desceiption : String,
    approvel : Boolean
})

// User Model
const Request = mongoose.model("Request", requestSchema);

// Export
module.exports = User;