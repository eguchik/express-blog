var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');


var indexRouter = require('./routes/index');
var writeRouter = require('./routes/write');
var deleteRouter = require('./routes/delete');
var editRouter = require('./routes/edit');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var detailRouter = require('./routes/detail');
var searchRouter = require('./routes/search');
var createRouter = require('./routes/create');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded( { extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}));

app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
// add this!
// アドレスの割当
app.use('/write', writeRouter);
app.use('/delete', deleteRouter);
app.use('/edit', editRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/detail', detailRouter);
app.use('/search', searchRouter);
app.use('/create', createRouter);



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