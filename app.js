var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
const passport = require('passport');
var keys=require('./config/keys');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user-profile');
var registerRouter = require('./routes/register');

//mongoose setup
//mongodb setup
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
//connect to mongodb
mongoose.connect(keys.mongodb.dbURI).then(function(){
console.log('Database Connencted');
});




var app = express();

//inont passport
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//session middleware
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

///express-validator

app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      let namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
///express messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  
  next();
});

// var flash = require('express-flash-messages');
// app.use(flash());

////defining routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/register', registerRouter);

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
