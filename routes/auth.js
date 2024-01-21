const express = require('express');
const router = express.Router();

router.use(express.json());

// Import auth controller
const authCtrl = require('../controllers/auth');

// POST /signup
router.post('/signup', authCtrl.auth_signup_post);

// POST /signin
router.post('/signin', authCtrl.auth_signin_post);

module.exports = router;