const User = require('../models/User');
const Library = require('../models/Library');




exports.user_detail_get = (req, res) => {
    // get the user id
    console.log(`user details request`);
    User.findById(req.user.id)
    .then((user) => {
        console.log('Fetching user data..');
        // remove user password from the data 
        if (user){
            user.password = '';
         return   res.json({user});
        }
        return res.json({'message': 'user not found'}).status(404);
    })
    .catch((err) => {
        console.log('Error getting user data');
        console.log(err);
        res.json({'message': err.message}).status(404);
    })
}





exports.user_update_post = (req, res) => {
    console.log('Updating user...' + req.user.id);
    console.log('Request Body:', req.body);

    User.findByIdAndUpdate(req.user.id, req.body, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                console.log(`User with ID ${req.user.id} not found`);
                return res.status(404).json({ message: 'User not found' });
            }

            console.log(`User ${req.user.id} details updated`);
            console.log('Updated User:', updatedUser);

            res.json({ user: updatedUser });
        })
        .catch(err => {
            console.log(`Error updating user profile ${req.user.id}`);
            console.error(err); // Log the error for debugging
            res.status(500).json({ message: 'Internal Server Error' });
        });
};



// Get books in users library
exports.user_library_get = (req, res) => {
    // Check if req.user exists and has an 'id' property
    if (req.user && req.user.id) {
        Library.findOne({user: req.user.id})
            .populate('book')  
            .then((library) => {
                // Check if the user is found
                if (!library) {
                    console.log('User not found');
                    return res.status(404).json({ message: 'User not found' });
                }

                console.log('Fetching user library...');
                console.log('User:', library); // Log the user object
                console.log('User Library:', library); // Log the user's library

                res.json({ books: library.book });
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




