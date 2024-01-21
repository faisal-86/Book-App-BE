const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isLoggedIn = require('../helper/isLoggedIn');


router.use(express.json());


// Route to get user details
router.get('/index/:id', userController.user_detail_get);

// Route to update user details
router.post('/update',  userController.user_update_post);

// Route to get user's library
router.get('/library', isLoggedIn,  userController.user_library_get);

module.exports = router;
