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

        // Check if the user with the specified id exists
        const existingUser = await User.findById(req.user.id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the book with the specified id exists
        const existingBook = await Book.findById(req.body.book);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Update the user's library
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { library: req.body.book } },
            { new: true }
        );

        console.log(`Book ${req.body.book} added to user ${req.user.id}'s library`);

        // Update the Library model as well
        await Library.findOneAndUpdate(
            { user: req.user.id },
            { $addToSet: { book: req.body.book } },
            { upsert: true }
        );

        res.json({ library: updatedUser.library });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};


// Controller to remove a book from the user's library
// exports.remove_from_library_post = async (req, res) => {
//     try {
//       // Use req.body.user if you're passing the user ID in the request body
//       const user = await User.findByIdAndUpdate(
//         req.body.user,
//         { $pull: { library: req.body.book } },
//         { new: true }
//       );
  
//       console.log(`Book ${req.body.book} removed from user ${user._id}'s library`);
//       res.json({ library: user.library });
//     } catch (err) {
//       handleErrorResponse(res, err);
//     }
//   };
  

exports.remove_book_from_library = async (req, res) => {
    const { book } = req.body;

    try {
        // Find the user's library
        const library = await Library.findOne({ user: req.user.id });

        if (!library) {
            return res.status(404).json({ message: 'User library not found' });
        }

        // Remove the book from the library
        library.book.pull(book);

        // Save the updated library
        await library.save();

        res.json({ library: library.book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};
