const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        const splitName = file.originalname.split('.');
        const ext = splitName.pop();
        const newName = splitName.join('-');
        cb(null, `${newName}-${Date.now()}.${ext}`);
    }
});
const upload = multer({
    storage: storage
});

//THESE ARE ENDPOINTS FOR ALL REQUEST OPTIONS
router.get('/', authMiddleware.verifyJWT, bookController.getAllBooks);
router.get('/:page', authMiddleware.verifyJWT, bookController.homePagination);
router.get('/sort/:kw', authMiddleware.verifyJWT, bookController.sortBook);
router.get('/sort/:kw/:page', authMiddleware.verifyJWT, bookController.sortPagination)
router.get('/search/from', authMiddleware.verifyJWT, bookController.searchBook);

router.post('/post/book_table', authMiddleware.verifyJWT, authMiddleware.verifyAdmin, upload.single('image'), bookController.postBook);
router.post('/post/genre_table', authMiddleware.verifyJWT, authMiddleware.verifyAdmin, bookController.postGenre);
router.post('/post/author_table', authMiddleware.verifyJWT, authMiddleware.verifyAdmin, bookController.postAuthor);
router.put('/:id', authMiddleware.verifyJWT, authMiddleware.verifyAdmin, upload.single('image'), bookController.updateBook);
router.delete('/:id', bookController.deleteBook);


router.put('/borrow/books', authMiddleware.verifyJWT, authMiddleware.verifyAdmin, bookController.borrowSomeBooks); //max: 2 books a week.
router.put('/return/books', authMiddleware.verifyJWT, authMiddleware.verifyAdmin, bookController.returnBooks); //max: 2 weeks after borrowed.
module.exports = router;