const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "emailAddress": {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    "phoneNumber": Number,

    "password": {
        type: String,
        required: true,
        minlength: [8, "Your password needs to be at least 8 characters long."]
    },
    "role": {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'guest'
    },
    "library": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library'
    }],

 
    "avatar": String
}, {
    timestamps: true
});

// User Model
const User = mongoose.model("User", userSchema);

// Export
module.exports = User;
