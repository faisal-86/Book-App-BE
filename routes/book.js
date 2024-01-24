const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const upload = require('../helper/multerUploader');


router.use(express.json());


// router.post('/create', upload.array('file'), bookController.book_create_post);
// router.post('/update/:book', upload.array('file'), bookController.book_edit_post);



router.get('/index', bookController.book_index_get);
// router.get('/mybooks', bookController.get_mybook_get);

router.post('/delete/:id', bookController.book_delete_get);
router.get('/detail', bookController.book_detail_get);

router.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'epubFile', maxCount: 1 }]), bookController.book_create_post);
router.post('/update/:book', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'epubFile', maxCount: 1 }]), bookController.book_edit_post);

// GET /byCategory
router.get('/byCategory', bookController.book_getByCategory_get);
module.exports = router;