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

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('src/static/css'));
app.use(express.static('src/static/js'));
app.use(express.static('src/static/lib'));
app.use(express.static('src/views'));
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

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

app.post('/login', (req,res) => {
    console.log(req.body.user,"try to login.");
    res.send(req.body);
});

io.on('connection', function (socket) {
    socket.on('ack', function () {
        socket.emit('master',{ msg : 'Welcome to POKi Chat Application.'});
    });
});

http.listen(app.get('port'));
console.log(`magic happens at port ${app.get('port')}`);
