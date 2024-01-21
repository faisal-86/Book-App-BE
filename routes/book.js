const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const upload = require('../helper/multerUploader');

router.use(express.json());



// Multer configuration for handling file uploads
// const upload = multer({ dest: 'public/images' });

// Route to create a new book
router.post('/book/create', upload.single('file'), bookController.book_create_post);

// Route to get all books
router.get('/book/index', bookController.book_index_get);

// Route to get books belonging to a specific user
router.get('/book/mybooks', bookController.get_mybook_get);

// Route to edit a book
router.post('/book/edit', upload.single('file'), bookController.book_edit_post);

// Route to delete a book
router.get('/book/delete', bookController.book_delete_get);

// Route to get details of a specific book
router.get('/book/detail', bookController.book_detail_get);

module.exports = router;
