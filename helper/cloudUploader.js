require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary configuration is automatically set from CLOUDINARY_URL in .env
cloudinary.config();

exports.uploadSingle = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting local file:', err);
            }
        });
        console.log(result.url);
        return result;
    } catch (error) {
        console.error("Error in uploadSingle:", error);
        throw error;
    }
};

exports.uploadMultiple = async (arrayPath) => {
    let paths = [];
    for (let i = 0; i < arrayPath.length; i++) {
        try {
            let imgPath = await cloudinary.uploader.upload(arrayPath[i]);
            paths.push(imgPath.url);
            fs.unlink(arrayPath[i], (err) => {
                if (err) {
                    console.error('Error deleting local file:', err);
                }
            });
        } catch (error) {
            console.error("Error in uploadMultiple:", error);
        }
    }
    return paths;
};
