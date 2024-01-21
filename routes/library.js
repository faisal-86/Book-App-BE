const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');

// Route to get the user's library
router.get('/index',  libraryController.user_library_get);

// Route to add a book to the user's library
router.post('/add',  libraryController.add_to_library_post);

// Route to remove a book from the user's library
router.post('/remove',  libraryController.remove_from_library_post);

module.exports = router;
