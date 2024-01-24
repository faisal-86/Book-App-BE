// In your Multer configuration file
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, './public/uploads'); // For images
        } else if (file.mimetype === 'application/epub+zip') {
            cb(null, './public/uploads/epubs'); // For EPUB files
        } else {
            cb(new Error('Invalid file type'), false); // Reject other file types
        }
    },
    filename: function (req, file, cb) {
        let filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});

let upload = multer({ storage: storage });
module.exports = upload;
