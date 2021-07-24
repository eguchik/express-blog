var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;