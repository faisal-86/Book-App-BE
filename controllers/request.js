const Request = require('../models/Request');
const User = require('../models/User');
const Book = require('../models/Book');

// Controller to submit a book request
exports.submit_request_post = (req, res) => {
    const userId = req.user.id;
    const { bookId, description } = req.body; 

    

    const newRequest = new Request({
        user: userId,
        book: bookId,
        description,
        approval: false 
    });

    newRequest.save()
        .then((request) => {
            console.log(`Book request submitted by user ${userId}: ${request._id}`);
            res.json({ request });
        })
        .catch((err) => {
            console.log(`Error submitting book request by user ${userId}`);
            console.log(err);
            res.json({ message: err.message }).status(400);
        });
};

// Controller to get user's book requests
exports.user_requests_get = (req, res) => {
    const userId = req.user.id;

    Request.find({ user: userId })
        .populate('book', 'title author') 
        .then((requests) => {
            console.log(`Fetching book requests for user ${userId}`);
            res.json({ requests });
        })
        .catch((err) => {
            console.log(`Error fetching book requests for user ${userId}`);
            console.log(err);
            res.json({ message: err.message }).status(404);
        });
};

// Controller to get all book requests (admin view)
exports.all_requests_get = (req, res) => {
    Request.find()
        .populate('user', 'username') 
        .populate('book', 'title author') 
        .then((requests) => {
            console.log('Fetching all book requests');
            res.json({ requests });
        })
        .catch((err) => {
            console.log('Error fetching all book requests');
            console.log(err);
            res.json({ message: err.message }).status(404);
        });
};

// Controller to update the approval status of a book request (admin action)
exports.update_request_status_post = (req, res) => {
    const requestId = req.params.requestId;
    const { approval } = req.body; 


    Request.findByIdAndUpdate(requestId, { approval }, { new: true })
        .then((request) => {
            console.log(`Book request ${requestId} approval status updated to ${approval}`);
            res.json({ request });
        })
        .catch((err) => {
            console.log(`Error updating book request ${requestId} approval status`);
            console.log(err);
            res.json({ message: err.message }).status(400);
        });
};
