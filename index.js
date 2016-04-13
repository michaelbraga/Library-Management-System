/*
*	@Author : Michael Arvin Jay C. braga
*	@Program description: A web app that acts as a library management system.
*/

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var api = require(__dirname + '/config/api-router');
var ui = require(__dirname + '/config/ui');
var app = express();
/*******************************************************************************
	All about development
*******************************************************************************/
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

/*******************************************************************************
	All about the views (EJS)
*******************************************************************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*******************************************************************************
	All about middlewares
*******************************************************************************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
var randString = 'lDS_#G(SJESG#Jsfvw#EGWEVW$G3wg)';
app.use(session({
  cookieName: 'session',
  secret: randString,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.use(express.static(path.join(__dirname, 'public')));

/*******************************************************************************
	All about the routes
*******************************************************************************/
app.use('/api', api);
app.use('/', ui);
// add middleware for authentication


/*******************************************************************************
	All about the error handling and development
*******************************************************************************/
/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err,
//             title: 'error'
//         });
//     });
// }
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {},
//         title: 'error'
//     });
// });
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Library server listening on port ' + server.address().port);
});

/*******************************************************************************
	All about the things for GRUNT
*******************************************************************************/
module.exports = app;
