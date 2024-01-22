const User = require('../models/User');
const Library = require('../models/Library');



exports.user_detail_get = (req, res) => {
    // get the user id
    console.log(`user details request`);
    console.log(req.query.id);
    User.findById(req.query.id)
    .then((user) => {
        console.log('Fetching user data..');
        // remove user password from the data do i need to remove the ID as well?
        user.password = '';
        res.json({user});
    })
    .catch((err) => {
        console.log('Error getting user data');
        console.log(err);
        res.json({'message': err.message}).status(404);
    })
}


exports.user_update_post = (req, res) => {
    console.log('updating user...' + req.user.id)
    console.log(req.body)
    User.findByIdAndUpdate(req.user.id, req.body, {new: true})
    .then(user => {
        console.log(`updating user ${req.user.id} details`);
        res.json({user});
    })
    .catch(err => {
        console.log(`Error updating user profile ${req.user.id}`);
        console.log(err);
        res.json({err}).status(400);
    })
}

// Get books in users library
exports.user_library_get = (req, res) => {
    // Check if req.user exists and has an 'id' property
    if (req.user && req.user.id) {
        User.findById(req.user.id)
            .populate('library')  
            .then((user) => {
                // Check if the user is found
                if (!user) {
                    console.log('User not found');
                    return res.status(404).json({ message: 'User not found' });
                }

                console.log('Fetching user library...');
                console.log('User:', user); // Log the user object
                console.log('User Library:', user.library); // Log the user's library

                res.json({ library: user.library });
            })
            .catch((err) => {
                console.log('Error getting user library');
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    } else {
        // Handle case when req.user is not available
        console.log('User not authenticated');
        res.status(401).json({ message: 'User not authenticated' });
    }
};




