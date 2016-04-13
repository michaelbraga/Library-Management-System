var borrower = require(__dirname + './../../controllers/borrower');

/******************************************************************
    This function is a middleware that checks if there is an
    existing session of a borrower.
******************************************************************/
function authorizeBorrower(req, res, next){
	if(req.session.user && req.session.user.class == 'borrower'){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = function (router) {
	router.get('/borrower/book/available', authorizeBorrower, borrower.getAllAvailableBooks);
	router.get('/borrower/book/authors/:book_id', authorizeBorrower, borrower.getAuthors);
	router.get('/borrower/book/borrowed/', authorizeBorrower, borrower.getAllBorrowedBooks);
	router.get('/borrower/book-request/pending', authorizeBorrower, borrower.getBookRequests);
	router.get('/borrower/book-request/approved', authorizeBorrower, borrower.getApprovedRequests);
	router.get('/borrower/records', authorizeBorrower, borrower.getRecords);
	router.get('/borrower/searchTitle/:searchString', authorizeBorrower, borrower.searchBookByTitle);
	router.get('/borrower/searchAuthor/:searchString', authorizeBorrower, borrower.searchBookByAuthor);
	router.post('/borrower/request/book/:book_id', authorizeBorrower, borrower.requestBook);
};
