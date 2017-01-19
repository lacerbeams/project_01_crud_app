var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var hbs = require('express-handlebars');
var assert = require('assert');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static Routes
// GET '/' => '/public/index.html'
app.use(express.static(__dirname + '/public'));

app.post('/add', function(req, res) {
  var data = {
    project: req.body.project,
    deadline: req.body.deadline,
    materials: req.body.materials,
    notes: req.body.notes
  }
  console.log(data);
  res.json(data);
})


var port = 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});
