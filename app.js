var port = process.env.PORT || 5000;
var express = require('express');
var app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ankit",
	database: "mydb"
}); */

app.set('view engine', 'ejs');

//Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

//connect flash
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));

app.use('/', require('./routes/login'));

/*app.get('/', function(req,res) {
	res.render('home_dashboard');
});

app.post('/signup', function(req,res) {
	var users = {
		"username" : req.body.username,
		"email" : req.body.email,
		"password" : req.body.password
	}
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("insert into login SET ?", users, function (err, result,fields) {
    if (err) throw err;
	  else
    res.send("inserted");
  });
});
}); */

app.listen(port, function() {
	console.log("Server is running on port 5000");
});

