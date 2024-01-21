const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.use(express.json());


// Route to create a new category
router.post('/create', categoryController.category_create_post);

// Route to get all categories
router.get('/index', categoryController.category_index_get);

// Route to edit/update a category
router.post('/edit/:id', categoryController.category_edit_post);

// Route to delete a category
router.get('/delete', categoryController.category_delete_get);

// Route to get details of a specific category
router.get('/detail', categoryController.category_detail_get);

// Route to get books for a specific category
router.get('/books', categoryController.category_books_get);

module.exports = router;
