const helper = require('../helpers/index');
const bookModel = require('../models/book');
const book = require('../models/book');
// const bodyParser = require('body-parser');


module.exports = {
    getAllBooks: async function(req, res){
        try{
            const result = await bookModel.getAllBooksModel();
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    homePagination: async function(req, res){
        const page = parseInt(req.params.page) - 1;
        try{
            const result = await bookModel.homePaginationModel(page);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    sortPagination: async function(req, res){
        const page = parseInt(req.params.page) - 1;
        const keyword = req.params.kw;
        try{
            const result = await bookModel.sortPaginationModel(page, keyword);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    postBook: async function(req, res, next){
        const setData = req.body;
        setData.image = req.file ? req.file.filename : '';
        try{
            const result = await bookModel.postBookModel(setData);
            return helper.response(res, `success`, result, 201);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
        
    },
    postGenre: async function(req, res){
        const setData = req.body;
        try{
            const result = await bookModel.postGenreModel(setData);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error)
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    postAuthor: async function(req, res){
        const setData = req.body;
        try{
            const result = await bookModel.postAuthorModel(setData);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error)
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    updateBook: async function(req, res, next){
        const setData = req.body;
        setData.image = req.file ? req.file.filename : '';
        const id = req.params.id;
        try{
            const result = await bookModel.updateBookModel(setData, id);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    deleteBook: async function(req, res){
        const id = req.params.id;
        try{
            const result = await bookModel.deleteBookModel(id);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    searchBook: async function(req, res){
        const search = req.body;
        try{
            const result = await bookModel.searchBookModel(search);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    sortBook: async function(req, res){
        const sort = req.params.kw;
        try{
            const result = await bookModel.sortBookModel(sort);
            return helper.response(res, `success`, result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    borrowSomeBooks: async function(req, res){
        const id = req.body.BOOKS_ID;
        try{
            const checkBookStatus = await bookModel.checkBookStatus(id);
            const result = await bookModel.borrowSomeBooksModel(id);
            if(checkBookStatus[0].status == 2 ){
                return helper.response(res, `fail`, `Sorry, books is not available.`)
            }
            if(req.body.BOOKS_ID == ''){
                return helper.response(res, `fail`, `Please input the BOOKS_ID field first!`, 500);
            }
            return helper.response(res, `success`, `Congratulation! You can read the book!`, 200);
        } catch(error){
            console.log(error)
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
    returnBooks: async function(req, res){
        const id = req.body.BOOKS_ID;
        try{
            const memberName = null;
            const borrowedBooks = null;
            const isDeadline = null;
            const checkBookStatus = await bookModel.checkBookStatus(id);
            const result = await bookModel.returnBooksModel(id);
            if(checkBookStatus)
            if(req.body.BOOKS_ID == ''){
                return helper.response(res, `fail`, `Please input the BOOKS_ID field first!`, 500);
            }
            return helper.response(res, `success`, `Thank you, come back later!`, 200);
        } catch(error){
            return helper.response(res, `fail`, `Internal Server Error`, 500);
        }
    },
};