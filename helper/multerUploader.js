const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        let filename = file.fieldname + '-' + Date.now() + '-' + file.originalname;
        cb(null, filename)
    }
    })

let upload = multer({ storage: storage })
module.exports = upload;