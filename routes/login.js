const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var con = require('../db_config');
var name,myname;

router.get('/', (req,res) => res.render('home_dashboard'));
router.get('/home', (req,res) => res.render('home_page'));
router.get('/search', (req,res) => res.render('search_page'));

router.get('/myprofile', (req,res) => {
	res.render('myprofile', {personname: myname});
});

router.get('/profile', (req,res) => {
	res.render('profile', {firstname: name});
});

router.post('/signin', function(req,res) {
	var username = req.body.username;
	var password = req.body.password;
	if(username && password)
	{
		con.query("select * from login where username = ? and password = ?", [username,password], function(err,results,fields) {
			if(results.length > 0){
				req.session.loggedin = true;
				myname = username;
				res.redirect('/home');
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

router.post('/searching', function(req,res){
    var name1 = req.body.username;
    con.query("select username from login where username = ?", [name1], function(err,results,fields){
      if(results.length > 0){
        name = name1;
        res.redirect('/profile');
      }
    });
});


module.exports = router;

