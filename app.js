var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const users = {};

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
app.use('/user', require('./routes/index'));


io.on('connection', (socket) => {

	socket.on('new-user', name => {
		users[socket.id] = name;
		socket.broadcast.emit('user-connected', name);
	});

	socket.on('send-chatmsg', message => {
	socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]} );
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]);
		delete users[socket.id];
	});

})

http.listen(PORT, function() {
	console.log("Server is running on port 5000");
})

