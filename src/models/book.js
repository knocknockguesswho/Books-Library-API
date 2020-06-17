const connection = require('../helpers/mysql');
const query = require('../helpers/sqlquery');
const split = require('split-object');
const book = require('../controllers/book');

module.exports = {
    getAllBooksModel: function(){
        return new Promise((resolve, reject)=>{
            connection.query(`${query.getBookDetails} ORDER BY id ${query.pageLimit}`, function(error, result){
                if(error){
                    reject(error);
                } 
                resolve(result);
            });
        });
    },
    homePaginationModel: function(page){
        return new Promise((resolve, reject)=>{
            const offsetCount = 2 * page; //data per-page
            connection.query(`${query.getBookDetails} ORDER BY id ${query.pageLimit} OFFSET ${offsetCount}`, function(error, result){
                if(result.length == 0 || offsetCount <= 0){
                    reject(error);
                } else {
                    if(error){
                        reject(error);
                    } 
                    resolve(result);
                }
            });//homePagination is sorted by id as default query.
        });
    },
    sortPaginationModel: function(page, keyword){
        return new Promise((resolve, reject)=>{
            const offsetCount = 2 * page; //data per-page
            connection.query(`${query.getBookDetails} ORDER BY ${keyword} ${query.pageLimit} OFFSET ${offsetCount}`, function(error, result){
                if(result.length == 0 || offsetCount <= 0){
                    reject(error);
                } else {
                    if(error){
                        reject(error);
                    } 
                    resolve(result);
                }
            });//sortPagination
        });
    },
    postBookModel: function(setData){
        return new Promise((resolve, reject)=>{
            connection.query(query.insertBook, setData, function(error, result){
                if(error){
                    reject(error);
                }
                const newData = {
                    ...setData
                }
                resolve(newData);
            });
        });
    },
    postGenreModel: function(setData){
        return new Promise((resolve, reject)=>{
            connection.query(query.insertGenre, setData, function(error, result){
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },
    postAuthorModel: function(setData){
        return new Promise((resolve, reject)=>{
            connection.query(query.insertAuthor, setData, function(error, result){
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },
    updateBookModel: function(setData, id){
        return new Promise((resolve, reject)=>{
            const sql = connection.query(query.updateBookById, [setData, id], function(error, result){
                if(error){
                    reject(error);
                }
                const dataUpdated = {
                    id,
                    ...setData
                }
                console.log(sql)
                resolve(dataUpdated);
            });
        });
    },
    deleteBookModel: function(id){
        return new Promise((resolve, reject)=>{
            connection.query(query.deleteBookById, id, function(error, result){
                if(error){
                    reject(error);
                }
                const dataDeleted = {
                    id
                }
                resolve(dataDeleted);
            });
        });
    },
    searchBookModel: function(search){
        return new Promise((resolve, reject)=>{
            let splitRequest = split(search).map(function(splitBody){
                return splitBody;
            });
            const key = (splitRequest[0].key);
            const val = (splitRequest[0].value)
            connection.query(`${query.getBookDetails} WHERE ${key} LIKE \'%${val}%\'`, function(error, result){
                if(error || result.length == 0){
                    reject(error);
                }
                resolve(result);
            });
        });
    },
    sortBookModel: function(sort){
        return new Promise((resolve, reject)=>{
            const keyword = sort.replace(/'/g,'');
            connection.query(`${query.getBookDetails} ORDER BY ${keyword} ${query.pageLimit}`, function(error, result){
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },
    checkBookStatus: function(id){
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM books WHERE id=?`, id, function(error, result){
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },
    borrowSomeBooksModel: function(id){
        return new Promise((resolve, reject)=>{
            connection.query(query.bookTransaction, [2, id], function(error, result){
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },
    returnBooksModel: function(id){
        return new Promise((resolve, reject)=>{
            connection.query(query.bookTransaction, [1, id], function(error, result){
                if(error){
                    reject(error);
                }
                resolve(result);
            });
        });
    }
};