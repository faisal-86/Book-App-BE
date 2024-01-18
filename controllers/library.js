const Library = require('../models/Library');
const Book = require('../models/Book');

// Controller to get the user's library
exports.user_library_get = (req, res) => {
    User.findById(req.user.id)
        .populate('library')  
        .then((user) => {
            console.log('Fetching user library...');
            res.json({ library: user.library });
        })
        .catch((err) => {
            console.log('Error getting user library');
            console.log(err);
            res.json({ message: err.message }).status(404);
        });
};

// Controller to add a book to the user's library
exports.add_to_library_post = (req, res) => {
    const userId = req.user.id;
    const bookId = req.body.bookId; 

    User.findByIdAndUpdate(userId, { $addToSet: { library: bookId } }, { new: true })
        .then((user) => {
            console.log(`Book ${bookId} added to user ${userId}'s library`);
            res.json({ library: user.library });
        })
        .catch((err) => {
            console.log(`Error adding book ${bookId} to user ${userId}'s library`);
            console.log(err);
            res.json({ message: err.message }).status(400);
        });
};

// Controller to remove a book from the user's library
exports.remove_from_library_post = (req, res) => {
    const userId = req.user.id;
    const bookId = req.body.bookId; 
   

    User.findByIdAndUpdate(userId, { $pull: { library: bookId } }, { new: true })
        .then((user) => {
            console.log(`Book ${bookId} removed from user ${userId}'s library`);
            res.json({ library: user.library });
        })
        .catch((err) => {
            console.log(`Error removing book ${bookId} from user ${userId}'s library`);
            console.log(err);
            res.json({ message: err.message }).status(400);
        });
};