require('dotenv').config();
const cloudinary = require('cloudinary');
const fileServices = require('../services/fileServices');


cloudinary.config({ 
    cloudinary_url: process.env.CLOUDINARY_URL 
 });

exports.uploadSingle = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath);
    fileServices.removeFile(filePath);
    console.log(result.url)
    return result;
}

exports.upload_multiple = async (arrayPath) => {
    let paths = [];
    for(let i=0; i<arrayPath.length; i++){
        let imgPath = await cloudinary.uploader.upload(arrayPath[i])
            paths.push(imgPath);
    }
    return paths;
}