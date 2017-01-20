var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var hbs = require('express-handlebars');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var favicon = require('serve-favicon');


var url = 'mongodb://heroku_bjdptgr8:iir60hjra95a21tn8vv9r6s6oj@ds117829.mlab.com:17829/heroku_bjdptgr8';

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static Routes
// GET '/' => '/public/index.html'
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.post('/insert', function(req, res) {
  var data = {
    project: req.body.project,
    deadline: req.body.deadline,
    materials: req.body.materials,
    notes: req.body.notes
  }

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('data').insertOne(data, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });
  res.redirect('/');
})

app.get('/data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var dataFromDB = db.collection('data').find({})
    dataFromDB.forEach(function(doc){
      resultArray.push(doc);
      console.log(resultArray)
    },
    function () {
      db.close();
      res.json(resultArray);
    });
  });
});

app.post('/projects/:id/delete', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection('data').deleteOne({_id: objectId(id)}, function(err, result) {
      db.close();
      res.json(result);
    })
  })
})

app.post('/projects/:id/update', function(req, res) {
  var id = req.params.id;
  mongo.connect(url, function(err, db) {
    db.collection('data').updateOne({_id: objectId(id)}, function(err, result) {
      db.close();
      res.json(result);
    });
  });
});

var port = 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});
