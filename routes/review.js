const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');

// Route to submit a book review
router.post('/submit', reviewController.submit_review_post);

// Route to get book reviews
router.get('/book/:bookId', reviewController.book_reviews_get);

// Route to update a book review
router.post('/update/:reviewId', reviewController.update_review_post);

// Route to delete a book review
router.post('/delete/:reviewId',  reviewController.delete_review_post);

module.exports = router;
