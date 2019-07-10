var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('./models/db');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
  clientID: "450294218866907",
  clientSecret: "f3950a4a409067705d249c010de9f7d2",
  callbackURL: 'https://locapic-lacapsule2020.herokuapp.com/auth/facebook/callback',
  profileFields: ['id', 'first_name', 'last_name', 'email'],
  passReqToCallback: true

},
  function (req, accessToken, refreshToken, profile, done) {
    var state = JSON.parse(req.query.state);

    var mergeData = { ...profile._json, redirectUrl: state.redirectUrl };

    return done(null, mergeData);
  }));




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
