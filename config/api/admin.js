var admin = require(__dirname + './../../controllers/admin');

/******************************************************************
    This function is a middleware that checks if there is an
    existing session of an admin.
******************************************************************/
function authorizeAdmin(req, res, next){
	if(req.session.user && req.session.user.class == 'admin'){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = function (router) {

	/* operations on borrower */
	router.get('/admin/borrower/approved', authorizeAdmin, admin.getApprovedBorrowers);
	router.get('/admin/borrower/requests', authorizeAdmin, admin.getAccountRequests);
	router.put('/admin/borrower/approve-borrower/:borrower_id', authorizeAdmin, admin.approveBorrower);
	router.delete('/admin/borrower/delete/:borrower_id', authorizeAdmin, admin.removeBorrower);

	/* operations on book */
	router.get('/admin/book', authorizeAdmin, admin.getAllBooks);
	router.get('/admin/book/one/:book_id', authorizeAdmin, admin.getOneBook);
	router.put('/admin/edit/book/:book_id', authorizeAdmin, admin.editBook);
	router.delete('/admin/delete/book/:book_id', authorizeAdmin, admin.deleteBook);
	router.get('/admin/book/available', authorizeAdmin, admin.getAllAvailableBooks);
	router.get('/admin/book/borrowed', authorizeAdmin, admin.getAllBorrowedBooks);
	router.get('/admin/book/authors/:book_id', authorizeAdmin, admin.getAuthors);
	router.delete('/admin/book/authors/:book_id', authorizeAdmin, admin.deleteAuthors);
	router.get('/admin/book/searchTitle/:searchString', authorizeAdmin, admin.searchBookByTitle);
	router.get('/admin/book/searchAuthor/:searchString', authorizeAdmin, admin.searchBookByAuthor);
	router.post('/admin/book/add', authorizeAdmin, admin.addBook);
	router.post('/admin/book/add/author/', authorizeAdmin, admin.addAuthor);

	/* operations on borrows */
	router.get('/admin/borrows/requests', authorizeAdmin, admin.getBorrowRequests);
	router.get('/admin/borrows/approved', authorizeAdmin, admin.getApprovedRequests);
	router.get('/admin/borrows/records', authorizeAdmin, admin.getRecords);
	router.get('/admin/borrows/record/:book_id', authorizeAdmin, admin.getRecord);
	router.put('/admin/borrows/approve/:dreq/:borrower_id/:book_id/', authorizeAdmin, admin.approveRequest);
	router.put('/admin/borrows/lend/:dreq/:borrower_id/:book_id/', authorizeAdmin, admin.lendBook);
	router.put('/admin/borrows/accept/:dreq/:borrower_id/:book_id/', authorizeAdmin, admin.acceptReturnedBook);
	router.delete('/admin/borrows/delete/:dreq/:borrower_id/:book_id/', authorizeAdmin, admin.deleteRequest);
};
