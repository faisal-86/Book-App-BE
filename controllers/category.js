const Category = require('../models/Category');
const Book = require('../models/Book');
const fs = require("fs");
const uploadCloudinary = require('../helper/cloudUploader');


exports.category_create_post = async (req, res) => {
    let category = new Category(req.body);

    if (req.file) {
        let image = `public/images/${req.file.filename}`;
        try {
            let imagePath = await uploadCloudinary.upload_single(image);
            category.image = imagePath.url;

            fs.unlink(image, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Local file deleted after Cloudinary upload.');
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Error uploading image. Please try again later.");
        }
    }

    try {
        let savedCategory = await category.save();
        res.json({ category: savedCategory });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving category. Please try again later.");
    }
};


exports.category_index_get = (req, res) => {
    Category.find().populate("book")
    .then((categories) => {
        res.json(categories)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error fetching categories.");
    });
};


exports.category_edit_post = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) {
        const image = `public/images/${req.file.filename}`;
        try {
            const imagePath = await uploadCloudinary.upload_single(image);
            updatedData.image = imagePath.url;

            fs.unlink(image, err => {
                if (err) console.error(err);
                else console.log('Local file deleted after Cloudinary upload.');
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send("Error uploading image. Please try again later.");
        }
    }

    Category.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedCategory => {
            res.json({ category: updatedCategory });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error updating category.");
        });
};



exports.category_delete_get = (req, res) => {
    Category.findByIdAndDelete(req.query.id)
    .then((category) => {
        res.json({ category });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error deleting category.");
    });
};


exports.category_detail_get = (req, res) => {
    Category.findById(req.query.id)
    .then((category) => {
        res.json({ category })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving category details.");
    });
};


exports.category_books_get = (req, res) => {
    const categoryId = req.query.id;
    Book.find({ category: categoryId }).populate('category')
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error fetching books for the category.");
        });
};