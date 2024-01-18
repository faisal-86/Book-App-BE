require('dotenv').config();
const cloudinary = require('cloudinary');
const fileServices = require('../services/fileServices');

exports.uploadSingle = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath);
    fileServices.removeFile(filePath);
    console.log(result.url)
    return result;
}