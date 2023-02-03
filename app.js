var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mealsRouter = require('./routes/meals');
var imagesRouter = require('./routes/images');

var app = express();
app.use(cors())

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect('mongodb+srv://alsterlind:Vzj1OiXnYjQbnlSr@cluster0.88zfbon.mongodb.net/?retryWrites=true&w=majority', {
  useUnifiedTopology:true
})
.then(client => {
  console.log('Connected to database');
  const db = client.db('whats4dinner');
  app.locals.db = db;
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/meals', mealsRouter);
app.use('/images', imagesRouter);

module.exports = app;
