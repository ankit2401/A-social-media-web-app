const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var con = require('../db_config');

router.get('/', (req,res) => res.render('home_dashboard'));

router.post('/signin', function(req,res) {
	var username = req.body.username;
	var password = req.body.password;
	if(username && password)
	{
		con.query("select * from login where username = ? and password = ?", [username,password], function(err,results,fields) {
			if(results.length > 0){
				res.send("login");
			}else
				res.send("error");
		});
	}
});

router.post('/signup', function(req,res) {
	var users = {
		"username" : req.body.username,
		"email" : req.body.email,
		"password" : req.body.password
	}

  con.query("insert into login SET ?", users, function (err, result,fields) {
    if (err) throw err;
	  else
    res.send("inserted");
  });
});

module.exports = router;


