var port = process.env.PORT || 5000;
var express = require('express');
var app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

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

app.listen(port, function() {
	console.log("Server is running on port 5000");
});

