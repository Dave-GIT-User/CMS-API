/*
// This is modified hello world from Express
// It is not the execution start point.
// One is supposed to go to /bin/www.js 
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var cors = require('cors');

const indexRouter = require('./routes/index');
// maybe later when login is implemented...
// const usersRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const contactRoutes = require('./routes/contacts');
const documentRoutes = require('./routes/documents');

var app = express();

// This is an API - who cares very much about views?
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

//app.use(cors);

app.use('/', indexRouter);
// we may eventually care about users, but not yet
// app.use('/users', usersRouter);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

