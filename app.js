var port = process.env.PORT || 5000;
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
	res.render('home_dashboard');
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/css'));


app.listen(port, function() {
	console.log("Server is running on port 5000");
});
