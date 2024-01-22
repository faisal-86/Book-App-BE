// controllers/request.js
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
        const { bookTitle, bookAuthor, description } = req.body;

        const newRequest = await Request.create({
            user: req.user.id,
            bookTitle,
            bookAuthor,
            description,
            approvalStatus: false
        });

        console.log(`Book request submitted by user ${req.user.id}: ${newRequest._id}`);

        res.json({ request: newRequest });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};

// Controller to get user's book requests
exports.user_requests_get = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find requests where the user ID matches the logged-in user
        const requests = await Request.find({ user: userId })
            .select('-updatedAt') // Exclude updatedAt field from the response if not needed

        console.log(`Fetching book requests for user ${userId}`);
        res.json({ requests });
    } catch (err) {
        handleErrorResponse(res, err, 404);
    }
};

// Controller to get all book requests (admin view)
exports.all_requests_get = async (req, res) => {
    try {
        const requests = await Request.find().populate('user', 'username');

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
        const { approvalStatus } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(requestId, { approvalStatus }, { new: true });

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        console.log(`Book request ${requestId} approval status updated to ${approvalStatus}`);
        res.json({ request: updatedRequest });
    } catch (err) {
        handleErrorResponse(res, err);
    }
};
