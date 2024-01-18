const mongoose = require('mongoose');

// Category Schema
const requestsSchema = mongoose.Schema({
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
const Requests = mongoose.model("Requests", requestsSchema);

// Export
module.exports = User;