var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
const config = require('./config/main');
var compression = require('compression');
const passport = require('passport');
var cors = require('cors')

var routes = require('./routes/index');
var order = require('./routes/order');
var inventory = require('./routes/inventory');


var crypto = require('crypto');



var dbConfig = require('./db');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)

var app = express();
app.use(cors());
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(compression());
app.use(passport.initialize());






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/inventory', inventory);
app.use('/order', order);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({"status": 0, "message": "An Error Occured"})
});



io.on('connection', function(socket){
  console.log('a user connected');
});



http.listen(3333, function(){
  console.log('listening on *:3333');
});


module.exports = app;
