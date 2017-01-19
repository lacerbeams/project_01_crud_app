var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var hbs = require('express-handlebars');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://localhost:27017/project2';

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static Routes
// GET '/' => '/public/index.html'
app.use(express.static(__dirname + '/public'));

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


var port = 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});
