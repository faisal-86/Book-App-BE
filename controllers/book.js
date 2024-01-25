const Book = require('../models/Book');
const Category = require('../models/Category');
const Library = require('../models/Library');
const fs = require("fs");
const uploadCloudinary = require('../helper/cloudUploader');
const { uploadMultiple } = require('../helper/cloudUploader');

exports.book_create_post = async (req, res) => {
    try {
        let book = new Book(req.body);

        if (req.files) {
            let images = req.files['image'] ? req.files['image'].map(file => `./public/uploads/${file.filename}`) : [];
            let epubFile = req.files['epubFile'] ? req.files['epubFile'][0] : null;
            let pathDb = [];

            if (images.length > 0) {
                const imagesPath = await uploadMultiple(images);
                imagesPath.forEach(pathImg => pathDb.push(pathImg));
                book.image = pathDb;

                // Delete local image files after uploading to Cloudinary
                images.forEach(imgPath => {
                    try {
                        if (fs.existsSync(imgPath)) {
                            fs.unlinkSync(imgPath);
                        } else {
                            //console.error(`File not found: ${imgPath}`);
                        }
                    } catch (err) {
                        console.error(`Error deleting file: ${imgPath}`, err);
                    }
                });
            }

            if (epubFile) {
                // book.epubFilePath = `./public/uploads/epubs/${epubFile.filename}`;
                book.epubFilePath = `/epubs/${epubFile.filename}`;

            }
        }

        const newBook = await book.save();

        if (req.body.category) {
            const category = await Category.findById(req.body.category);
            if (category) {
                category.book = category.book || [];
                category.book.push(newBook._id);
                await category.save();
            } else {
                console.log('Category not found for ID:', req.body.category);
            }
        }

        res.json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


exports.book_index_get = (req, res) => {
    Book.find().populate('category')
        .then(books => {
            res.json({ books });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving books');
        });
};

exports.get_mybook_get = (req, res) => {
    Book.find({ user: req.query.user })
        .then(myBooks => {
            res.json(myBooks);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error retrieving user books');
        });
};

exports.book_edit_post = async (req, res) => {
    const bookId = req.params.book;
    try {
        const currentBook = await Book.findById(bookId);
        if (!currentBook) {
            return res.status(404).send('Book not found');
        }

        let updateData = {};
        Object.keys(req.body).forEach(key => {
            if (req.body[key] !== currentBook[key]) {
                updateData[key] = req.body[key];
            }
        });

        let images = req.files.filter(file => file.mimetype.startsWith('image')).map(file => `./public/uploads/${file.filename}`);
        let epubFile = req.files.find(file => file.mimetype === 'application/epub+zip');

        if (images.length > 0) {
            try {
                const imagesPath = await uploadMultiple(images);
                updateData.image = imagesPath;
            } catch (err) {
                console.error(err);
                return res.status(500).send('Error uploading images');
            }
        }

        if (epubFile) {
            updateData.epubFilePath = `./public/uploads/epubs/${epubFile.filename}`;
        }

        if (Object.keys(updateData).length > 0) {
            const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
            res.json(updatedBook);
        } else {
            res.json({ message: 'No fields were updated', book: currentBook });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.book_delete_get = async (req, res) => {
    try {
        const bookId = req.params.id;
        await Library.updateMany({ book: bookId }, { $pull: { book: bookId } });
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }
        res.json({ message: 'Book successfully deleted', deletedBook });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting book');
    }
};

exports.book_detail_get = (req, res) => {
    const bookId = req.query.id;
    Book.findById(bookId).populate('category')
        .then((book) => {
            if (book) {
                console.log(book);
                res.json({ book });
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        })
        .catch((err) => {
            console.log(`Error reading specific book data ${bookId}`);
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        });
};

exports.book_getByCategory_get = (req, res) => {
    const categoryId = req.body.id;
    console.log('Received Category ID:', categoryId);
    Book.find({ category: categoryId })
        .then((books) => {
            res.json({ books });
        })
        .catch((err) => {
            console.log('Error getting books by category');
            console.log(err);
            res.json({ err });
        });
};
