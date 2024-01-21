const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');
const isLoggedIn = require('../helper/isLoggedIn');


router.use(express.json());

// Route to get the user's library
// router.get('/index', isLoggedIn, libraryController.user_library_get);

// Route to add a book to the user's library
router.post('/add', isLoggedIn,  libraryController.add_to_library_post);

// Route to remove a book from the user's library
router.post('/remove', isLoggedIn, libraryController.remove_book_from_library);


module.exports = router;
