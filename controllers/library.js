const User = require('../models/User');
const Library = require('../models/Library');
const Book = require('../models/Book');

// Helper function to handle errors
const handleErrorResponse = (res, err, statusCode = 400) => {
    console.log(`Error: ${err.message}`);
    res.json({ message: err.message }).status(statusCode);
};

// Controller to get the user's library
// exports.user_library_get = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).populate('library');
//         console.log('Fetching user library...');
//         res.json({ library: user.library });
//     } catch (err) {
//         handleErrorResponse(res, err, 404);
//     }
// };

// Controller to add a book to the user's library
exports.add_to_library_post = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the entire request body
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { library: req.body.book } },
            { new: true }
        );

        console.log(`Book ${req.body.book} added to user ${req.user.id}'s library`);
        res.json({ library: user.library });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};


// Controller to remove a book from the user's library
exports.remove_from_library_post = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $pull: { library: req.body.bookId } },
            { new: true }
        );

        console.log(`Book ${req.body.bookId} removed from user ${req.user.id}'s library`);
        res.json({ library: user.library });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};
