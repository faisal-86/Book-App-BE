const Request = require('../models/Request');
const User = require('../models/User');
const Book = require('../models/Book');

// Helper function to handle errors
const handleErrorResponse = (res, err, statusCode = 400) => {
    console.log(`Error: ${err.message}`);
    res.json({ message: err.message }).status(statusCode);
};

// Controller to submit a book request
exports.submit_request_post = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, description } = req.body;

        const newRequest = await Request.create({
            user: userId,
            book: bookId,
            description,
            approval: false
        });

        console.log(`Book request submitted by user ${userId}: ${newRequest._id}`);
        res.json({ request: newRequest });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

// Controller to get user's book requests
exports.user_requests_get = async (req, res) => {
    try {
        const userId = req.user.id;

        const requests = await Request.find({ user: userId }).populate('book', 'title author');

        console.log(`Fetching book requests for user ${userId}`);
        res.json({ requests });
    } catch (err) {
        handleErrorResponse(res, err, 404);
    }
};

// Controller to get all book requests (admin view)
exports.all_requests_get = async (req, res) => {
    try {
        const requests = await Request.find().populate('user', 'username').populate('book', 'title author');

        console.log('Fetching all book requests');
        res.json({ requests });
    } catch (err) {
        handleErrorResponse(res, err, 404);
    }
};

// Controller to update the approval status of a book request (admin action)
exports.update_request_status_post = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const { approval } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(requestId, { approval }, { new: true });

        console.log(`Book request ${requestId} approval status updated to ${approval}`);
        res.json({ request: updatedRequest });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};
