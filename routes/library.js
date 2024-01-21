const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/library');

router.use(express.json());

// Route to get the user's library
router.get('/library',  libraryController.user_library_get);

// Route to add a book to the user's library
router.post('/user/library/add',  libraryController.add_to_library_post);

// Route to remove a book from the user's library
router.post('/user/library/remove',  libraryController.remove_from_library_post);

module.exports = router;
