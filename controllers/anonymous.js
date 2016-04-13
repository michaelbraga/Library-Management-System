/********************
    PostgreSQL :)
********************/
var constring = require(__dirname + "./../lib/postgre");
var pg = require('pg');

// Authentication
exports.validateAdmin = function (req, res) {
	var toDatabase = {
		name: 'Find an Admin with a particular AdminID',
		text: 'SELECT * FROM admin WHERE admin_id = $1',
		values: [req.params.admin_id]
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
				if (err) {
					console.log("ERROR findAdmin: " + err);
					res.status(400);
					res.send({status:'error', error:err});
				} else {
					if(reply.rowCount === 0){
						res.status(404);
						res.send({status:'fail', message:'not_found'});
					}else{
						if(req.params.apass == reply.rows[0].apass){
							req.session.user = {id: '', password: ''};
							req.session.user.id = reply.rows[0].admin_id;
							req.session.user.password = reply.rows[0].apass;
							req.session.user.class = 'admin';
							res.status(200);
							res.send({status:'success', data: reply.rows[0]});
						}else{
							res.status(444);
							res.send({status:'fail', message:'wrong_combination'});
						}

					}
				}
			});
		}
	});
}

exports.validateBorrower = function (req, res) {
	var toDatabase = {
		name: 'Find a Borrower with a particular BorrowerID',
		text: 'SELECT * FROM borrower WHERE borrower_id = $1',
		values: [req.params.borrower_id]
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
				if (err) {
					console.log("ERROR findBorrower: " + err);
					res.status(400);
					res.send({status:'error', error:err});
				} else {
					if(reply.rowCount === 0){
						res.status(404);
						res.send({status:'fail', message:'not_found'});
					}else{
						if(req.params.bpass == reply.rows[0].bpass){
							console.log(reply.rows[0].approve);
							if (reply.rows[0].approved == true) {
								req.session.user = {id: '', password: ''};
								req.session.user.id = reply.rows[0].borrower_id;
								req.session.user.password = reply.rows[0].bpass;
								req.session.user.class = 'borrower';
								res.status(200);
								res.json({status:'success', data: reply.rows[0]});
							}else{
								res.status(444);
								res.send({status:'fail', message:'not_approved'});
							}
						}else {
							res.status(444);
							res.send({status:'fail', message:'wrong_combination'});
						}

					}
				}
			});
		}
	});
}

exports.insertTeacher = function (req, res){

	var toDatabase = {
		name: 'INSERT a Borrower as a teacher',
		text: 'INSERT INTO borrower(borrower_id, bfname, bmname, blname, bpass, bcol, approved, a_id, borrowertype, degcor, inst) ' +
			'VALUES($1, $2, $3, $4, $5, $6, false, null, \'teacher\', null, $7)',
			values: [req.body.borrower_id, req.body.bfname, req.body.bmname, req.body.blname, req.body.bpass, req.body.bcol, req.body.inst]
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
					console.log("ERROR insertBorrower: "+err);
					res.status(400);
					res.send({status:'error', error: err});
				} else{
					if(reply.rowCount == 1){
						res.status(200);
						res.send({status:'success'});
					} else{
						res.status(500);
						res.send({status:'fail', message: reply});
					}
				}
			});
		}
	});
}

exports.insertStudent = function (req, res){

	var toDatabase = {
		name: 'INSERT a Borrower as a student',
		text: 'INSERT INTO borrower(borrower_id, bfname, bmname, blname, bpass, bcol, approved, a_id, borrowertype, degcor, inst) ' +
			'VALUES($1, $2, $3, $4, $5, $6, false, null, \'student\', $7, null)',
		values: [req.body.borrower_id, req.body.bfname, req.body.bmname, req.body.blname, req.body.bpass, req.body.bcol, req.body.degcor]
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
					console.log("ERROR insertBorrower: "+err);
					res.status(400);
					res.send({status:'error', error: err});
				} else{
					if(reply.rowCount == 1){
						res.status(200);
						res.send({status:'success'});
					} else{
						res.status(500);
						res.send({status:'fail', message: reply});
					}
				}
			});
		}
	});

}
