const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');

router.use(express.json());

// Route to submit a book review
router.post('/reviews/submit', reviewController.submit_review_post);

// Route to get book reviews
router.get('/reviews/book/:bookId', reviewController.book_reviews_get);

// Route to update a book review
router.post('/reviews/update/:reviewId', reviewController.update_review_post);

// Route to delete a book review
router.post('/reviews/delete/:reviewId',  reviewController.delete_review_post);

module.exports = router;
