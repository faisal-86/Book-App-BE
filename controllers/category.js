const Category = require('../models/Category');
const Book = require('../models/Book');

const uploadCloudinary = require('../helper/cloudUploader');
const fs = require('fs');


exports.category_create_post = async (req, res) => {
    console.log(req.body);
    let category = new Category(req.body);

    if (req.file) {
        let image = `./public/uploads/${req.file.filename}`;
        try {
            let imagePath = await uploadCloudinary.uploadSingle(image);
            category.image = imagePath.url;
        } catch (err) {
            console.log('Error uploading image to Cloudinary:', err);
            return res.status(500).send("Error uploading image. Please try again later.");
        }
    }

    try {
        let savedCategory = await category.save();
        res.json({ category: savedCategory });
    } catch (err) {
        console.log('Error saving category:', err);
        res.status(500).send("Error saving category. Please try again later.");
    }
};



exports.category_index_get = (req, res) => {
    console.log('Fetching Cat');
    Category.find()
    .then((categories) => {
        console.log(categories);
        res.json({categories})
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error fetching categories.");
    });
};




exports.category_edit_post = async (req, res) => {
    const categoryId = req.params.id;

    try {
        // Logging to verify that the function is being called
        console.log("Updating category with ID:", categoryId);

        // Find the existing category
        let existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).send('Category not found');
        }

        // Logging the existing category
        console.log("Existing category data:", existingCategory);

        // Update fields if they exist in the request
        let isUpdated = false;
        if (req.body.name && req.body.name !== existingCategory.name) {
            existingCategory.name = req.body.name;
            isUpdated = true;
        }

        if (req.file) {
            const image = `./public/uploads/${req.file.filename}`;
            try {
                const imagePath = await uploadCloudinary.uploadSingle(image);
                existingCategory.image = imagePath.url;
                isUpdated = true;
            } catch (err) {
                console.error('Error uploading image to Cloudinary:', err);
                return res.status(500).send("Error uploading image. Please try again later.");
            }
        }

        // Check if there were any updates
        if (!isUpdated) {
            console.log("No updates to apply.");
            return res.status(400).send('No updates provided');
        }

        // Save the updated category
        const updatedCategory = await existingCategory.save();

        // Logging the updated category
        console.log("Updated category data:", updatedCategory);

        res.json({ category: updatedCategory });
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).send("Error updating category. Please try again later.");
    }
};


exports.category_delete_get = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if any books are associated with this category
        const associatedBooks = await Book.find({ category: categoryId });
        if (associatedBooks.length > 0) {
            return res.status(400).send("Cannot delete category as it has associated books.");
        }

        // Proceed with deletion if no associated books
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.json({ message: 'Category successfully deleted', category });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting category');
    }
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
    console.log('categoryId',categoryId);
    Book.find({ category: categoryId }).populate('category')
        .then(books => {
            res.json({books});
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error fetching books for the category.");
        });
};