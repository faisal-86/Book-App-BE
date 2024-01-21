const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const upload = require('../helper/multerUploader');

router.use(express.json());

// router.post('/create', upload.array('file'), bookController.book_create_post);
router.post('/create', upload.array('file'), bookController.book_create_post);
router.get('/index', bookController.book_index_get);
router.get('/mybooks', bookController.get_mybook_get);
router.post('/edit', upload.array('file'), bookController.book_edit_post);
router.get('/delete', bookController.book_delete_get);
router.get('/detail', bookController.book_detail_get);

module.exports = router;
