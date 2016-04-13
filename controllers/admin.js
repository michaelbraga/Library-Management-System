/****************************************************************
    PostgreSQL :)
****************************************************************/
var constring = require(__dirname + "./../lib/postgre");
var pg = require('pg');


/****************************************************************
    Functions
****************************************************************/
/*
response = {status: 'success', data:''} 	(success)
	     {status:'error'} 			(error)
*/
exports.getApprovedBorrowers = function(req, res){
	var toDatabase = 'SELECT * FROM borrower WHERE approved = true';

	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function(err, reply){
				db.end();
				if(err){
					console.log("ERROR getApprovedBorrows: " + err);
					res.status(500);
					res.send({status:'error', error:err});
				} else {
					res.status(200);
					res.send({status:'success', data:reply.rows});
				}
			});
		}
	});
}

exports.editBook = function(req, res){
	var toDatabase = {
		name:'Edit book by book_id',
		text: 'update book set (book_id, btitle, bpub, btype) = ($1, $2, $3, $4) where book_id = $5',
		values:[req.body.book_id, req.body.btitle, req.body.bpub, req.body.btype, req.params.book_id ]
	};
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function(err, reply){
				db.end();
				if(err){
					console.log(err);
					res.send({status:'error', error:err});
				} else {
					res.status(200);
					res.send({status:'success', data:reply.rows});
				}
			});
		}
	});

}
exports.getRecord = function(req, res){
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query("select * from borrows where book_id ='"+req.params.book_id+"'", function(err, reply){
				db.end();
				if(err){
					console.log(err);
					res.send({status:'error', error:err});
				} else {
					console.log(reply);
					if (reply.rowCount == 0) {
						res.status(200);
						res.send({status:'not_found', error:err});
					}else{
						res.status(200);
						res.send({status:'success', data:reply.rows});
					}
				}
			});
		}
	});

}

exports.deleteBook = function (req, res) {
	var query = 'Delete from book ' +
		      'WHERE book_id = $1';

	var toDatabase = {
		name: 'remove a book by book_id',
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
			db.query('Delete from book_author where b_id = \''+req.params.book_id+'\'', function (err, reply) {
				if (err) {
					console.log(err);
					res.send({status:'error', error:err});
				}else {
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
	});



}

exports.getAccountRequests = function(req, res){
	var toDatabase = 'SELECT * FROM borrower WHERE approved = false';
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase, function(err, reply){
				db.end();
				if(err){
					console.log("ERROR getAccountRequests: " + err);
					res.status(500);
					res.send({status:'error', error:err});
				} else {
					res.status(200);
					res.send({status:'success', data:reply.rows});
				}
			});
		}
	});

}

exports.approveBorrower = function(req, res){
	var query = 'UPDATE borrower '+
	'SET a_id = $1, approved = true '+
	'WHERE approved = false AND borrower_id = $2';
	var toDatabase = {
		name: 'Approved a borrower by update',
		text: query,
		values: [req.session.user.id, req.params.borrower_id]
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
					console.log("ERROR approveBorrower: " + err);
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					res.status(200);
					res.send({status:'success'});
				}
			});
		}
	});

}

exports.removeBorrower = function (req, res) {
	var toDatabase = 'DELETE FROM borrower WHERE borrower_id = \''+ req.params.borrower_id+'\'';
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
					console.log("ERROR removeBorrower: " + err);
					res.status(500);
					res.send({status:'error', error:err});
				}else{
					res.status(200);
					res.send({status:'success'});
				}
			});
		}
	});

}

exports.getAllBooks = function (req, res){
	var toDatabase = 'SELECT * FROM book';
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
					res.send({status:'success', data:reply.rows});
				}
			});
		}
	});

}
exports.getOneBook = function (req, res){
	var toDatabase = 'SELECT * FROM book where book_id=\''+req.params.book_id+'\'';
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
					res.send({status:'error', error:err});
				}else {
					res.status(200);
					res.send({status:'success', data:reply.rows[0]});
				}
			});
		}
	});

}

exports.getAllAvailableBooks = function (req, res){
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

exports.getAllBorrowedBooks = function (req, res){
	var toDatabase = 'select * from borrower, borrows, book  where borrows.approved = true and borrows.dborrow is not null and borrows.dreturn is null and borrower.borrower_id = borrows.borrower_id and  book.book_id = borrows.book_id and booktype = \'borrowed\'';
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
						var dreq = [];
						dreq.push(reply.rows[i].dreq.getFullYear());
						dreq.push(reply.rows[i].dreq.getMonth()+1);
						dreq.push(reply.rows[i].dreq.getDate());
						reply.rows[i].dreq = dreq.join('-');
					}
					res.status(200);
					res.send({status:'success', data:reply.rows});
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

exports.addBook = function (req, res) {
	var query = 'INSERT INTO book (book_id, btitle, bpub, btype, a_id, booktype, bloc, bdue) ' +
			'VALUES ( $1, $2, $3, $4, $5, \'available\', $6, null)';

	var toDatabase = {
		name: 'add a book',
		text: query,
		values: [req.body.book_id, req.body.btitle, req.body.bpub, req.body.btype, req.session.user.id, req.body.bloc]
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
				if (err) {
					res.send({status:'error', error:err});
				}else {
					res.status(200);
					res.send({status:'success'});
				}
			});
		}
	});

}
exports.deleteAuthors = function (req, res) {
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query("delete from book_author where b_id='"+req.params.book_id+"'", function (err, reply) {
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

exports.addAuthor = function (req, res) {
	var query =  'INSERT INTO book_author (b_id, authfname, authlname) ' +
	 		 'VALUES ($1, $2, $3)';

	var toDatabase = {
		name: 'add an author',
		text: query,
		values: [req.body.book_id, req.body.authfname, req.body.authlname]
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
				if (err) {
					res.status(500);
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

exports.getBorrowRequests = function (req, res) {
	var toDatabase = 	'select borrows.borrower_id, bfname, bmname, blname, borrows.book_id, btitle, dreq ' +
				'from borrower, book, borrows ' +
				'where borrower.borrower_id = borrows.borrower_id and book.book_id = borrows.book_id ' +
	    		     'and dborrow is null and dreturn is null and borrows.approved = false';

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
					console.log(err);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						    	var dreq = [];
							dreq.push(reply.rows[i].dreq.getFullYear());
						    	dreq.push(reply.rows[i].dreq.getMonth()+1);
						    	dreq.push(reply.rows[i].dreq.getDate());
						    	reply.rows[i].dreq = dreq.join('-');
			   		}
			    		res.status(200);
				    	res.send({status:'success', data:reply.rows});
				}
			});
		}
	});
}

exports.getApprovedRequests = function (req, res) {
	var toDatabase = 	'select borrower.borrower_id, book.book_id, bfname, bmname, blname, btitle, dreq, admin.aname ' +
				'from borrower, book, borrows, admin ' +
				'where borrower.borrower_id = borrows.borrower_id and book.book_id = borrows.book_id and borrows.admin_id = admin.admin_id ' +
	    		     'and dborrow is null and dreturn is null and borrows.approved = true';



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
					console.log(err);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
						    	var dreq = [];
						dreq.push(reply.rows[i].dreq.getFullYear());
						    	dreq.push(reply.rows[i].dreq.getMonth()+1);
						    	dreq.push(reply.rows[i].dreq.getDate());
						    	reply.rows[i].dreq = dreq.join('-');
			   		}
			    		res.status(200);
				    	res.send({status:'success', data:reply.rows});
				}
			});
		}
	});
}

exports.getRecords = function (req, res) {
	var toDatabase = 	'select bfname, bmname, blname, btitle, dborrow, dreturn, aname ' +
				'from borrower, book, borrows, admin ' +
				'where borrower.borrower_id = borrows.borrower_id and book.book_id = borrows.book_id and borrows.admin_id = admin.admin_id ' +
	    		     'and dborrow is not null and dreturn is not null';

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
					console.log(err);
					res.send({status:'error', error:err});
				}else {
					for (var i = 0; i < reply.rows.length; i++) {
					     	var dborrow = [], dreturn = [];
						dborrow.push(reply.rows[i].dborrow.getFullYear());
					     	dborrow.push(reply.rows[i].dborrow.getMonth()+1);
					     	dborrow.push(reply.rows[i].dborrow.getDate());
					     	reply.rows[i].dborrow = dborrow.join('-');
						dreturn.push(reply.rows[i].dreturn.getFullYear());
					     	dreturn.push(reply.rows[i].dreturn.getMonth()+1);
					     	dreturn.push(reply.rows[i].dreturn.getDate());
					     	reply.rows[i].dreturn = dreturn.join('-');
			   		}
			    		res.status(200);
				    	res.send({status:'success', data:reply.rows});
				}
			});
		}
	});
}

exports.approveRequest = function (req, res) {
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query('Select * from borrows where book_id=\''+req.params.book_id+'\' and approved = true and dreturn is null', function (err, reply) {
				if(err){
					db.end();
					console.log(err);
					res.status(200);
					res.send({status:'error', error:err});
				}else{
					if(reply.rowCount == 0){
						var query = 'UPDATE borrows SET approved = true, admin_id = $1 ' +
							      'WHERE borrower_id = $2 and book_id = $3 and dreq = $4';

						var toDatabase = {
							name: 'approve a request by update',
							text: query,
							values: [req.session.user.id, req.params.borrower_id, req.params.book_id, req.params.dreq]
						};
						db.query(toDatabase, function (err, reply) {
							db.end();
							if (err) {
								res.status(500);
								res.send({status:'error', error:err});
							}else {
								res.status(200);
								res.send({status:'success'});
							}
						});
					}else{
						db.end();
						console.log(reply);
						res.send({status:'error', error:err});
					}
				}
			});
		}
	});

}
exports.deleteRequest = function (req, res) {
	var query = 'Delete from borrows ' +
		      'WHERE borrower_id = $1 and book_id = $2 and dreq = $3';

	var toDatabase = {
		name: 'remove a request by delete',
		text: query,
		values: [req.params.borrower_id, req.params.book_id, req.params.dreq]
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
				if (err) {
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					res.status(200);
					res.send({status:'success'});
				}
			});
		}
	});

}

exports.lendBook =function (req, res) {
	var query1 = 'UPDATE borrows SET dborrow = current_date ' +
	             'WHERE borrower_id = $1 and book_id = $2 ' +
		       'and dreq = $3 and approved = true';
	var values1 = [req.params.borrower_id, req.params.book_id, req.params.dreq];
	var query2 = 'UPDATE book SET booktype = \'borrowed\', bdue = $1, bloc = null ' +
			 'WHERE book_id = $2 and booktype = \'available\'';
	var values2 = [req.body.bdue, req.params.book_id];

	var toDatabase1 = {
		name: 'update borrow',
		text: query1,
		values: values1
	};
	var toDatabase2 = {
		name: 'update book',
		text: query2,
		values: values2
	};
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase1, function (err, reply) {
				if (err) {
					db.end();
					console.log("Error");
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					db.query(toDatabase2, function (err, reply) {
						db.end();
						if (err) {
							console.log("Error");
							res.status(500);
							res.send({status:'error', error:err});
						}else {
							console.log("Yay");
							res.status(200);
							res.send({status:'success'});
						}
					});
				}
			});
		}
	});

}
exports.acceptReturnedBook =function (req, res) {
	console.log(req);
	var query1 = 'UPDATE borrows SET dreturn = current_date ' +
	             'WHERE borrower_id = $1 and book_id = $2 ' +
		       'and dreq = $3 and approved = true ' +
		       'and dborrow is not null';
	var values1 = [req.params.borrower_id, req.params.book_id, req.params.dreq];
	var query2 = 'UPDATE book SET booktype = \'available\', bdue = null, bloc = $1 ' +
			 'WHERE book_id = $2 and booktype = \'borrowed\' ';
	var values2 = [req.body.bloc, req.params.book_id];

	var toDatabase1 = {
		name: 'update borrow',
		text: query1,
		values: values1
	};
	var toDatabase2 = {
		name: 'update book',
		text: query2,
		values: values2
	};
	var db = new pg.Client(constring);
	db.connect(function (err) {
		if (err) {
			db.end();
			console.error("Postgre Error", err);
			res.status(500);
			res.send({status:'error', error:err});
		} else {
			db.query(toDatabase1, function (err, reply) {
				if (err) {
					db.end();
					console.log(err);
					res.status(500);
					res.send({status:'error', error:err});
				}else {
					db.query(toDatabase2, function (err, reply) {
						db.end();
						if (err) {
							console.log(err);
							res.status(500);
							res.send({status:'error', error:err});
						}else {
							res.status(200);
							res.send({status:'success'});
						}
					});
				}
			});
		}
	});

}
