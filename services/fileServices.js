const fs = require('fs')

exports.removeFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err)
            return
        }
        });
}