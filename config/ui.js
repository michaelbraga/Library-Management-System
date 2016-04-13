var express = require('express');
var router = express.Router();

function requireLogin (req, res, next) {
	if(!req.session.user){
		res.redirect('/');
	}else{
		next();
	}
}

router.get('/', function (req, res) {
	if(!req.session.user){
		res.render('index', {title: 'Welcome to Library'});
	}else{
		if(req.session.user.class == 'admin'){
			res.redirect('/admin');
		}else{
			res.redirect('/borrower');
		}
	}
});
router.get('/sign-up', function (req, res) {
	if(!req.session.user){
		res.render('sign-up', {title: 'Create an Account'});
	}else{
		if(req.session.user.class == 'admin'){
			res.redirect('/admin');
		}else{
			res.send('nope');
		}
	}
});

router.get('/logout', function (req, res) {
	req.session.destroy();
	req.session.reset();
	res.redirect('/');
});

router.get('/admin', requireLogin, function (req, res) {
	if(req.session.user.class == 'admin'){
		res.render('admin/admin-dashboard', {title:'Admin | Library'});
	}else{
		res.redirect('/borrower');
	}
});
router.get('/borrower', requireLogin, function (req, res) {
	if(req.session.user.class == 'borrower'){
		res.render('borrower/borrower-dashboard', {title:'Borrower | Library'});
	}else{
		res.redirect('/admin');
	}
});





// test
router.get('/dashboard', requireLogin, function (req, res) {
	res.render('dashboard', {title:'TEST',id:req.session.user.id, password:req.session.user.password});
});


module.exports = router;
