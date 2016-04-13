/****************************************************************
    PostgreSQL :)
****************************************************************/
var pg = require('pg');
var constring =  require(__dirname + "./../lib/postgre");
/****************************************************************
    Functions
****************************************************************/
/*
response = {status: 'success', data:''} 	(success)
	     {status:'error'} 			(error)
*/

exports.getAllAvailableBooks = function (req, res) {
	var toDatabase = 'SELECT * FROM book where booktype=\'available\'';
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					res.status(200);
					res.json({status:'success', data:reply.rows});
				}
			});
		}
	});

}
exports.getAllBorrowedBooks = function (req, res) {
	var toDatabase = 'select * from book natural join borrows where booktype = \'borrowed\' and borrows.dborrow is not null and borrows.dreturn is null and borrower_id=\''+req.session.user.id+'\'';
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						if (reply.rows[i].bdue == null) {
							continue;
						}
						var date = [];
						date.push(reply.rows[i].bdue.getFullYear());
						date.push(reply.rows[i].bdue.getMonth()+1);
						date.push(reply.rows[i].bdue.getDate());
						reply.rows[i].bdue = date.join('-');
					}
					res.status(200);
					res.json({status:'success', data:reply.rows});
				}
			});
		}
	});

}

exports.getBookRequests = function (req, res) {
	var toDatabase = 'SELECT * '+
        		     'FROM book join borrows on book.book_id = borrows.book_id '+
        		     'WHERE borrower_id = \''+req.session.user.id+'\' and approved = false;';

	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						var date = [];
						date.push(reply.rows[i].dreq.getFullYear());
						date.push(reply.rows[i].dreq.getMonth()+1);
						date.push(reply.rows[i].dreq.getDate());
						reply.rows[i].dreq = date.join('-');
					}
					res.status(200);
					res.json({status:'success', data:reply.rows});
				}
			});
		}
	});
}
exports.getApprovedRequests = function (req, res) {
	var toDatabase = 'SELECT * '+
        		     'FROM book natural join borrows natural join admin '+
        		     'WHERE borrower_id = \''+req.session.user.id+'\' and approved = true and dborrow is null and dreturn is null;';

	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						var date = [];
						date.push(reply.rows[i].dreq.getFullYear());
						date.push(reply.rows[i].dreq.getMonth()+1);
						date.push(reply.rows[i].dreq.getDate());
						reply.rows[i].dreq = date.join('-');
					}
					res.status(200);
					res.json({status:'success', data:reply.rows});
				}
			});
		}
	});
}
exports.getRecords = function (req, res) {
	var toDatabase = 'SELECT * '+
        		     'FROM book natural join borrows natural join admin '+
        		     'WHERE borrower_id = \''+req.session.user.id+'\' and approved = true and dborrow is not null and dreturn is not null;';

	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						var date = [];
						date.push(reply.rows[i].dborrow.getFullYear());
						date.push(reply.rows[i].dborrow.getMonth()+1);
						date.push(reply.rows[i].dborrow.getDate());
						reply.rows[i].dborrow = date.join('-');
						date = [];
						date.push(reply.rows[i].dreturn.getFullYear());
						date.push(reply.rows[i].dreturn.getMonth()+1);
						date.push(reply.rows[i].dreturn.getDate());
						reply.rows[i].dreturn = date.join('-');
						var dreq = [];
						dreq.push(reply.rows[i].dreq.getFullYear());
						dreq.push(reply.rows[i].dreq.getMonth()+1);
						dreq.push(reply.rows[i].dreq.getDate());
						reply.rows[i].dreq = dreq.join('-');
					}
					res.status(200);
					res.json({status:'success', data:reply.rows});
				}
			});
		}
	});
}

exports.searchBookByTitle = function (req, res) {
	var query = 'SELECT * FROM book WHERE LOWER(btitle) ~* $1';
	var toDatabase = {
		name:'Search book by title',
		text: query,
		values: [("\\s*"+req.params.searchString.toLowerCase()+"\\s*")]
	};
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						if (reply.rows[i].bdue == null) {
							continue;
						}
						var date = [];
						date.push(reply.rows[i].bdue.getFullYear());
						date.push(reply.rows[i].bdue.getMonth()+1);
						date.push(reply.rows[i].bdue.getDate());
						reply.rows[i].bdue = date.join('-');
					}
					res.status(200);
					res.send({status:'success', data:reply.rows});
				}
			});
		}
	});

}

exports.searchBookByAuthor = function (req, res) {
	var query = 'SELECT * FROM book_author join book on book_id = b_id WHERE '+
			'LOWER(book_author.authfname) ~* $1 or LOWER(book_author.authlname) ~* $2 or ((concat(concat(LOWER(book_author.authfname),\' \'),LOWER(book_author.authlname))) ~* $3)';
	var regex = ("\\s*"+req.params.searchString.toLowerCase()+"\\s*");
	var toDatabase = {
		name:'Search book by author',
		text: query,
		values: [regex, regex, regex]
	};
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					console.log(err);
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						if (reply.rows[i].bdue == null) {
							continue;
						}
						var date = [];
						date.push(reply.rows[i].bdue.getFullYear());
						date.push(reply.rows[i].bdue.getMonth()+1);
						date.push(reply.rows[i].bdue.getDate());
						reply.rows[i].bdue = date.join('-');
					}
					res.status(200);
					res.send({status:'success', data:reply.rows});
				}
			});
		}
	});

}

exports.requestBook = function (req, res) {
	var query = 'INSERT INTO borrows(borrower_id, book_id, dreq, dborrow, dreturn, approved, admin_id) ' +
			'values ($1, $2, current_date, null, null, false, null)';
	var toDatabase = {
		name: 'Request a book',
		text: query,
		values: [req.session.user.id, req.params.book_id]
	}

	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if (err) {
					console.log(err);
					res.send({status:'error', error:err});
				}else {
					res.status(200);
					res.send({status:'success'});
				}
			});
		}
	});
}
exports.getAuthors = function (req, res){
	var query = 'SELECT * FROM book_author where b_id = $1';
	var toDatabase = {
		name: 'Find one borrower by id',
		text: query,
		values: [req.params.book_id]
	};


	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function (err, reply) {
				db.end();
				if(err){
					console.log("ERROR find authors book: " + err);
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					res.status(200);
					res.send({status:'success', data: reply.rows});
				}
			});
		}
	});
}
