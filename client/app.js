var express = require('express');
var path = require('path');
var _ = require('lodash');

var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')();
var mysql = require('mysql');
var pool = require('./src/config/database-promise.js');
var using = require('bluebird').using;
var Promise = require('bluebird');
var hbs = require('hbs');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('src/static/css'));
app.use(express.static('src/static/js'));
app.use(express.static('src/static/lib'));
app.use(express.static('src/views'));

hbs.registerPartials(__dirname + '/src/views/partials');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');
    // clear the block
    blocks[name] = [];
    return val;
});

app.get('/', (req, res) => {
     var data = { title  : 'Joined Rooms'};
     console.log(data);
     res.render('joined-rooms', data);
});

app.get('/allrooms', (req, res) => {
     var data = { title  : 'All Rooms'};
     console.log(data);
     res.render('all-rooms', data);
});

app.get('/setting', (req, res) => {
     var data = { title  : 'Setting'};
     console.log(data);
     res.render('setting', data);
});

app.get('/people', (req, res) => {        
    var data = { title  : 'People' };
    console.log(data);
    res.render('people', data);
});

app.get('/test', (req, res) => {
    res.end(`<h1>hello world</h1>`);
});

http.listen(app.get('port'));
console.log(`magic happens at port ${app.get('port')}`);
