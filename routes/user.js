const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.use(express.json());


// Route to get user details
router.get('/users/:id', userController.user_detail_get);

// Route to update user details
router.post('/users/update',  userController.user_update_post);

// Route to get user's library
router.get('/users/library',  userController.user_library_get);

module.exports = router;
