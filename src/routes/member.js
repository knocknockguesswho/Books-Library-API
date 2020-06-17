const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
const authMiddleware = require('../middleware/auth');//create middleware to verifying user's token and role.


router.get('/', authMiddleware.verifyJWT, bookController.getAllBooks);
router.get('/:page', authMiddleware.verifyJWT, bookController.homePagination);
router.get('/sort/:kw', authMiddleware.verifyJWT, bookController.sortBook);
router.get('/sort/:kw/:page', authMiddleware.verifyJWT, bookController.sortPagination)
router.get('/search/from', authMiddleware.verifyJWT, bookController.searchBook);

router.put('/borrow', authMiddleware.verifyJWT, authMiddleware.verifyMember, bookController.borrowSomeBooks); //max: 2 books a week.
router.put('/return', authMiddleware.verifyJWT, authMiddleware.verifyMember, bookController.returnBooks); //max: 2 weeks after borrowed.

module.exports = router;