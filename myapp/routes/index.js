var express = require('express');
var router = express.Router();
var fs = require('fs');
//var settings = require('../data/settings.json');
function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  readJSONFile('../data/settings.json',function(err,data){
    res.render('index', data);
  })
});
router.get('/canvas', function(req, res, next) {
  readJSONFile('../data/settings.json',function(err,data){
    res.render('canvas', data);
  })
});

module.exports = router;
