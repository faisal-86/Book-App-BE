const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request');
const isLoggedIn = require('../helper/isLoggedIn');


router.use(express.json());

// Route to submit a book request
router.post('/submit', requestController.submit_request_post);

// Route to get user's book requests
router.get('/user-requests', requestController.user_requests_get);

// Route to get all book requests (admin view)
router.get('/all-requests', requestController.all_requests_get);

// Route to update the approval status of a book request (admin action)
router.post('/update/:requestId', requestController.update_request_status_post);

module.exports = router;
