var anon = require(__dirname + './../../controllers/anonymous');
function isLoggedIn(req, res, next){
	if (req.session.user) {
		res.redirect('/');
	}else{
		next();
	}
}
module.exports = function (router) {
	
	router.get('/anonymous/admin/:admin_id/:apass', isLoggedIn, anon.validateAdmin);
	router.get('/anonymous/borrower/:borrower_id/:bpass', isLoggedIn, anon.validateBorrower);
	router.post('/anonymous/borrower/teacher', isLoggedIn,anon.insertTeacher);
	router.post('/anonymous/borrower/student', isLoggedIn, anon.insertStudent);
};
