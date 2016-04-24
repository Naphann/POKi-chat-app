var express = require('express');
var path = require('path');
var _ = require('lodash');

var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var mysql = require('mysql');
var pool = require('./src/config/database-promise.js');
var using = require('bluebird').using;
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('port', process.env.PORT);
app.set('type', process.env.TYPE); // SERVER type master/slave
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 2592000000 }, resave: true, saveUninitialized: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('src/static/css'));
app.use(express.static('src/static/js'));
app.use(express.static('src/static/lib'));
app.use(express.static('src/views'));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Middlewares
var POKiAuth = require('./middlewares/authentication.js')(passport, LocalStrategy, Promise, using, pool, bcrypt);

app.get('/', (req, res) => {
    using(pool.getSqlConnection(), (conn) => {
        conn.queryAsync('SELECT * FROM USER')
            .then(function (results) {
                return Promise.map(results, (user, idx) => {
                    user.index = idx+1;
                    return user;
                });
            })
            .then((users) => {
                var data = { users: users, arr: [{x:1},{x:2},{x:3}] };
                console.log(data);
                res.render('main', data);
            });
    });
});

app.get('/test', (req, res) => {
    res.end(`<h1>hello world</h1>`);
});

// app.post('/login', (req,res) => {
//     console.log(req.body.user,"try to login.");
//     res.send(req.body);
// });

POKiAuth.init(passport,LocalStrategy);
app.get('/login/check', POKiAuth.loggedIn);
app.post('/login', POKiAuth.authenticate);

io.on('connection', function (socket) {
    socket.on('ack', function () {
        socket.emit(app.get('type'));
    });
});

http.listen(app.get('port'));
console.log(`${app.get('type')} happens at port ${app.get('port')}`);
