module.exports = {
    getBookDetails: 'SELECT books.id, books.title, books.description, books.image, genre.name AS genre, author.name AS author, book_status.name AS status FROM books INNER JOIN genre ON genre.id=books.genre INNER JOIN author ON author.id=books.author INNER JOIN book_status ON book_status.id=books.status',
    getUserDataByUsername:'SELECT * FROM users WHERE username=?',
    pageLimit: 'LIMIT 2',
    insertBook: 'INSERT INTO books SET ?',
    insertGenre: 'INSERT INTO genre SET ?',
    insertAuthor: 'INSERT INTO author SET ?',
    insertUser: 'INSERT INTO users SET ?',
    updateBookById: 'UPDATE books SET ? WHERE id=?',
    deleteBookById:'DELETE FROM books WHERE id=?',
    bookTransaction: 'UPDATE books SET status=? WHERE id=?'
    // checkBookStatus: ;
}