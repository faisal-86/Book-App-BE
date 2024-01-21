const Review = require('../models/Review');
const User = require('../models/User');
const Book = require('../models/Book');

// Helper function to handle errors
const handleErrorResponse = (res, err, statusCode = 400) => {
    console.log(`Error: ${err.message}`);
    res.json({ message: err.message }).status(statusCode);
};

// Controller to submit a book review
exports.submit_review_post = async (req, res) => {
    try {
        const newReview = await Review.create({
            user: req.user.id,
            book: req.body.bookId,
            rating: req.body.rating,
            comment: req.body.comment
        });

        console.log(`Review submitted by user ${req.user.id} for book ${req.body.bookId}`);
        res.json({ review: newReview });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

// Controller to get book reviews
exports.book_reviews_get = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId }).populate('user', 'username');

        console.log(`Fetching reviews for book ${req.params.bookId}`);
        res.json({ reviews });
    } catch (err) {
        handleErrorResponse(res, err, 404);
    }
};

// Controller to update a book review
exports.update_review_post = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.reviewId,
            { rating: req.body.rating, comment: req.body.comment },
            { new: true }
        );

        console.log(`Review ${req.params.reviewId} updated`);
        res.json({ review: updatedReview });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

// Controller to delete a book review
exports.delete_review_post = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);

        console.log(`Review ${req.params.reviewId} deleted`);
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};