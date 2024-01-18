const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
    firstName: { type: String,
                required: true },
    lastName: { type: String,
                required: true },
    emailAddress: { type: String,
                    required: true,
                    lowercase: true,
                    unique: true },
    phoneNumber: Number ,

    password: { type: String,
                required: true,
                minlength: [6, "Your password needs to be at least 6 characters long."],
                },
    userRole: {
      //this is to set the user account by default to "contributor"
      required: true,
      type: String,
      default: "3",
      enum: ["1", "2", "3"],
      enumNames: ["admin", "user", "guest"],

    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    },
    library:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Library'
    },

    },
    avatar: String,

},
{
  timestamps: true
})

// User Model
const User = mongoose.model("User", userSchema);

// Export
module.exports = User;